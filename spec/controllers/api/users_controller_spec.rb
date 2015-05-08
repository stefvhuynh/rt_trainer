require 'rails_helper'

RSpec.describe Api::UsersController, type: :controller do
  describe 'POST #create' do
    context 'with valid attributes' do
      before do
        post :create, user: FactoryGirl.attributes_for(:user), format: :json
      end

      it 'responds with a 200 OK status' do
        expect(response.status).to eq(200)
      end
    end

    context 'with invalid attributes' do
    end
  end
end
