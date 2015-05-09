require 'rails_helper'

RSpec.describe Api::UsersController, type: :controller do
  describe 'POST #create' do
    context 'with valid attributes' do
      let(:valid_attributes) { FactoryGirl.attributes_for(:user) }
      let(:user_instance_double) { instance_double(User, save: true) }

      before do
        allow(User).to receive(:new).and_return(user_instance_double)
        post(:create, user: valid_attributes, format: :json)
      end

      it 'responds with a 200 OK' do
        expect(response.status).to eq(200)
      end

      it 'renders the show template' do
        expect(response).to render_template(:show)
      end

      it 'creates a new user' do
        expect(assigns(:user)).to eq(user_instance_double)
      end
    end

    context 'with invalid attributes' do
      let(:invalid_attributes) { FactoryGirl.attributes_for(:invalid_user) }
      let(:errors_double) { double(full_messages: ['error1', 'error2']) }
      let(:user_instance_double) do
        instance_double(User, save: false, errors: errors_double)
      end

      before do
        allow(User).to receive(:new).and_return(user_instance_double)
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
