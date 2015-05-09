require 'rails_helper'

RSpec.describe Api::SessionsController, type: :controller do
  describe 'POST #create' do
    context 'with valid user credentials' do
      let(:valid_credentials) do
        { username: 'charliebrown', password: 'somepassword' }
      end

      it 'responds with a 200 OK' do
        post(:create, credentials: valid_credentials, format: :json)
        expect(response.status).to eq(200)
     end

      it 'renders a session token json format' do
      end
    end

    context 'with invalid user credentials' do
    end
  end
end
