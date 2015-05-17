require 'rails_helper'

RSpec.describe User, type: :model do
  subject(:user) { FactoryGirl.build(:user) }

  let(:secure_random_string) { 'somereallylongstring' }
  let!(:secure_random_class_double) do
    class_double(SecureRandom, urlsafe_base64: secure_random_string)
      .as_stubbed_const
  end

  let(:bcrypt_hashed_password) { 'ahashedpassword' }
  let(:password_instance_double) do
    instance_double(BCrypt::Password, is_password?: true)
  end
  let!(:password_class_double) do
    class_double(
      BCrypt::Password,
      create: bcrypt_hashed_password,
      new: password_instance_double
    ).as_stubbed_const(transfer_nested_constants: true)
  end

  describe 'associations' do
    it 'has many scores' do
      expect(User.reflect_on_association(:scores).macro).to eq(:has_many)
    end
  end

  describe 'model initialization' do
    context 'creating a new user' do
      it 'populates the session_token using SecureRandom' do
        expect(secure_random_class_double).to receive(:urlsafe_base64)
        expect(
          FactoryGirl.build(:user).session_token
        ).to eq(secure_random_string)
      end

      it 'sets the password_digest using BCrypt' do
        expect(password_class_double).to receive(:create).with('somepassword')
        expect(
          FactoryGirl.build(:user, password: 'somepassword').password_digest
        ).to eq(bcrypt_hashed_password)
      end
    end

    context 'fetching a user from the database' do
      it 'does not call SecureRandom to replace an existing session_token' do
        user.save!
        expect(secure_random_class_double).not_to receive(:urlsafe_base64)
        User.find(user.id)
      end
    end
  end

  describe 'model validations' do
    describe 'username' do
      it 'requires a username' do
        user.username = nil
        expect(user).not_to be_valid
      end

      it 'requires the username to be unique' do
        FactoryGirl.create(:user, username: 'charliebrown')
        user.username = 'charliebrown'
        expect(user).not_to be_valid
      end
    end

    describe 'password' do
      it 'requires a password to be at least six characters long' do
        user.password = '12345'
        expect(user).not_to be_valid

        user.password = '123456'
        expect(user).to be_valid
      end

      it 'does not require a password to be passed in' do
        user.password = nil
        expect(user).to be_valid
      end
    end

    describe 'password_digest' do
      it 'requires a password_digest' do
        user.password_digest = nil
        expect(user).not_to be_valid
      end
    end

    describe 'email' do
      it 'requires an email' do
        user.email = nil
        expect(user).not_to be_valid
      end

      it 'requires the email to be unique' do
        FactoryGirl.create(:user, email: 'charlie@peanuts.com')
        user.email = 'charlie@peanuts.com'
        expect(user).not_to be_valid
      end

      it 'requires the email to be in a valid format' do
        user.email = 'charlie@peanuts.com'
        expect(user).to be_valid

        user.email = 'charlie#peanuts.com'
        expect(user).not_to be_valid

        user.email = 'charlie.peanuts.com'
        expect(user).not_to be_valid
      end
    end

    describe 'session_token' do
      it 'requires a session_token' do
        user.session_token = nil
        expect(user).not_to be_valid
      end

      it 'requires the session_token to be unique' do
        FactoryGirl.create(:user, session_token: 'somesessiontoken')
        user.session_token = 'somesessiontoken'
        expect(user).not_to be_valid
      end
    end
  end

  describe '#is_password?' do
    it 'checks if the password is correct using BCrypt' do
      expect(
        password_class_double
      ).to receive(:new).with(user.password_digest)

      expect(
        password_instance_double
      ).to receive(:is_password?).with('somepassword')

      user.is_password?('somepassword')
    end
  end

  describe '#change_session_token!' do
    it 'assigns a new session_token and saves it in the database' do
      allow(
        secure_random_class_double
      ).to receive(:urlsafe_base64).and_return('anewsessiontoken')

      expect(secure_random_class_double).to receive(:urlsafe_base64)
      expect(user.change_session_token!).to eq('anewsessiontoken')
      expect(User.find(user.id).session_token).to eq('anewsessiontoken')
    end
  end

  describe '::find_by_credentials' do
    before { user.save! }

    it 'returns the user from the database' do
      found_user = User.find_by_credentials(user.email, user.password)
      expect(found_user).to eq(user)
    end

    it 'does not return the user if the password is wrong' do
      allow(
        password_instance_double
      ).to receive(:is_password?).and_return(false)

      expect(password_instance_double).to receive(:is_password?)
      found_user = User.find_by_credentials(user.email, user.password + 'wrong')
      expect(found_user).to be_nil
    end

    it 'returns nil if the user does not exist' do
      found_user = User.find_by_credentials(user.email + 'wrong', user.password)
      expect(found_user).to be_nil
    end
  end
end
