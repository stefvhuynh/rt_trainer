require 'rails_helper'

RSpec.describe User, :type => :model do
  subject(:user) { FactoryGirl.build(:user) }

  describe 'model initialization' do
    context 'creating a new user' do
      it 'populates the session_token using SecureRandom' do
      end

      it 'uses BCrypt to set the password_digest' do
      end
    end

    context 'fetching a user from the database' do
      it 'does not replace the existing session_token' do
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
    end

    describe 'session_token' do
      it 'requires a session_token' do
        user.session_token = nil
        expect(user).not_to be_valid
      end

      it 'requires the session_token to be unique' do
        FactoryGirl.create(:user, session_token: '123abc')
        user.session_token = '123abc'
        expect(user).not_to be_valid
      end
    end
  end

  describe '#is_password?' do
    it 'checks if the password is correct using BCrypt' do
    end
  end

  describe '::find_by_credentials' do
    it 'returns the user from the database' do
      user.save!
      found_user = User.find_by_credentials(user.email, user.password)
      expect(found_user).to eq user
    end
  end
end
