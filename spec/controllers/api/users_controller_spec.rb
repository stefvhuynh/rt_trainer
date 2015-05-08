require 'rails_helper'

RSpec.describe Api::UsersController, type: :controller do
  describe 'POST #create' do
    context 'with valid attributes' do
      let(:valid_attributes) { FactoryGirl.attributes_for(:user) }

      before { allow_any_instance_of(User).to receive(:save).and_return(true) }

      def post_with_valid_attributes
        post(:create, user: valid_attributes, format: :json)
      end

      it 'responds with a 200 OK status' do
        post_with_valid_attributes
        expect(response.status).to eq(200)
      end

      it 'renders the show template' do
        post_with_valid_attributes
        expect(response).to render_template(:show)
      end

      it 'creates a new user' do
        post_with_valid_attributes
        expect(assigns(:user)).to be_a User
      end
    end

    context 'with invalid attributes' do
      let(:invalid_attributes) { FactoryGirl.attributes_for(:invalid_user) }

      before { allow_any_instance_of(User).to receive(:save).and_return(false) }

      def post_with_invalid_attributes
        post(:create, user: invalid_attributes, format: :json)
      end

      it 'responds with a 422 Unprocessable Entity' do
        post_with_invalid_attributes
        expect(response.status).to eq(422)
      end

      it 'renders an error' do
        post_with_invalid_attributes
        expect(JSON.parse(response.body)).to include('errors')
      end
    end
  end
end
