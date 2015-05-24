require 'rails_helper'

RSpec.describe Api::UsersController, type: :controller do
  describe 'POST #create' do
    context 'with valid attributes' do
      let(:valid_attributes) { FactoryGirl.attributes_for(:user) }
      let(:random_user_id) { rand(0..1000) }
      let(:user_instance_double) do
        instance_double(User, save: true, id: random_user_id)
      end

      before do
        allow(User).to receive(:new).with(valid_attributes)
          .and_return(user_instance_double)
      end

      it 'responds with a 200 OK' do
        post(:create, user: valid_attributes, format: :json)
        expect(response.status).to eq(200)
      end

      it 'renders the show template' do
        post(:create, user: valid_attributes, format: :json)
        expect(response).to render_template(:show)
      end

      it 'creates a new user' do
        expect(user_instance_double).to receive(:save)
        post(:create, user: valid_attributes, format: :json)
        expect(assigns(:user)).to eq(user_instance_double)
      end

      it 'creates a progress' do
        base_progress = { level: 1, session: 1, user_id: random_user_id }
        expect(Progress).to receive(:create!).with(base_progress)
        post(:create, user: valid_attributes, format: :json)
      end
    end

    context 'with invalid attributes' do
      let(:invalid_attributes) { FactoryGirl.attributes_for(:invalid_user) }
      let(:errors_double) { double(full_messages: ['error1', 'error2']) }
      let(:user_instance_double) do
        instance_double(User, save: false, errors: errors_double)
      end

      before do
        allow(User).to receive(:new).with(invalid_attributes)
          .and_return(user_instance_double)
        post(:create, user: invalid_attributes, format: :json)
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
