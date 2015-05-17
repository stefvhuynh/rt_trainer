require 'rails_helper'

RSpec.describe Score, type: :model do
  subject(:score) { FactoryGirl.build(:score) }

  describe 'associations' do
    it 'belongs to a user' do
      expect(Score.reflect_on_association(:user).macro).to eq(:belongs_to)
    end
  end

  describe 'model validations' do
    describe 'level' do
      it 'requires a level' do
        score.level = nil
        expect(score).not_to be_valid
      end

      it 'requires the level to be between 1 and 4' do
        score.level = 5
        expect(score).not_to be_valid
        score.level = 3
        expect(score).to be_valid
      end

      describe 'session' do
        it 'requires a session' do
          score.session = nil
          expect(score).not_to be_valid
        end

        it 'requires the session be greater than 0' do
          score.session = 0
          expect(score).not_to be_valid
          score.session = 101
          expect(score).to be_valid
        end
      end

      describe 'reaction_time' do
        it 'requires a reaction_time' do
          score.reaction_time = nil
          expect(score).not_to be_valid
        end

        it 'requires the reaction_time to be greater than 0' do
          score.reaction_time = 0
          expect(score).not_to be_valid
          score.reaction_time = 1000
          expect(score).to be_valid
        end
      end

      describe 'accuracy' do
        it 'requires an accuracy' do
          score.accuracy = nil
          expect(score).not_to be_valid
        end

        it 'requires the accuracy to be between 0 and 100' do
          score.accuracy = -1
          expect(score).not_to be_valid
          score.accuracy = 101
          expect(score).not_to be_valid
          score.accuracy = 0
          expect(score).to be_valid
        end
      end
    end
  end
end
