require 'rails_helper'

RSpec.describe Api::ScoresController, type: :controller do
  describe 'POST #create' do
    context 'when logged out' do
      it 'responds with a 401 Unauthorized' do
        mock_log_out
        post(:create, score: {}, format: :json)
        expect(response.status).to eq(401)
      end
    end

    context 'when logged in' do
      let(:scores_double) { double }
      let(:user_instance_double) do
        instance_double(User, scores: scores_double)
      end

      before { mock_log_in(user_instance_double) }

      context 'with valid attributes' do
        let(:valid_attributes) { FactoryGirl.attributes_for(:score) }
        let(:score_instance_double) { instance_double(Score, save: true) }

        before do
          allow(scores_double).to receive(:build).with(valid_attributes)
            .and_return(score_instance_double)
        end

        it 'responds with a 200 OK' do
          post(:create, score: valid_attributes, format: :json)
          expect(response.status).to eq(200)
        end

        it 'renders the show template' do
          post(:create, score: valid_attributes, format: :json)
          expect(response).to render_template(:show)
        end

        it 'creates a new score' do
          expect(score_instance_double).to receive(:save)
          post(:create, score: valid_attributes, format: :json)
          expect(assigns(:score)).to eq(score_instance_double)
        end
      end

      context 'with invalid attributes' do
        let(:invalid_attributes) { FactoryGirl.attributes_for(:invalid_score) }
        let(:errors_double) { double(full_messages: ['error1', 'error2']) }
        let(:score_instance_double) do
          instance_double(Score, save: false, errors: errors_double)
        end

        before do
          allow(scores_double).to receive(:build).with(invalid_attributes)
            .and_return(score_instance_double)
          post(:create, score: invalid_attributes, format: :json)
        end

        it 'responds with a 422 Unprocessable Entity' do
          expect(response.status).to eq(422)
        end

        it 'renders an error' do
          expect(
            JSON.parse(response.body)
          ).to include('errors' => ['error1', 'error2'])
        end
      end
    end
  end
end
