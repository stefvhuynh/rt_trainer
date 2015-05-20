require 'rails_helper'

RSpec.describe Progress, type: :model do
  subject(:progress) { FactoryGirl.build(:progress) }

  describe 'associations' do
    it 'belongs to a user' do
      expect(Progress.reflect_on_association(:user).macro).to eq(:belongs_to)
    end
  end

  describe 'model validations' do
    describe 'level' do
      it 'requires a level' do
        progress.level = nil
        expect(progress).not_to be_valid
      end

      it 'requires the level be between 1 and 4' do
        progress.level = 0
        expect(progress).not_to be_valid
        progress.level = 5
        expect(progress).not_to be_valid
        progress.level = 3
        expect(progress).to be_valid
      end
    end

    describe 'session' do
      it 'requires a session' do
        progress.session = nil
        expect(progress).not_to be_valid
      end
 
      it 'requires the session to be greater than 0' do
        progress.session = -1
        expect(progress).not_to be_valid
        progress.session = 10
        expect(progress).to be_valid
      end
    end

    describe 'user_id' do
      it 'requires a user_id' do
        progress.user_id = nil
        expect(progress).not_to be_valid
      end
    end
  end
end
