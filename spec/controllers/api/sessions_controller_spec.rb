require 'rails_helper'

RSpec.describe Api::SessionsController, type: :controller do
  let(:user_instance_double) do
    instance_double(User, change_session_token!: 'someothersessiontoken')
  end

  describe 'POST #create' do
    context 'with valid user credentials' do
      let(:valid_credentials) do
        { username: 'charliebrown', password: 'somepassword' }
      end

      before do
        allow(User).to receive(:find_by_credentials)
          .with(*valid_credentials.values)
          .and_return(user_instance_double)

        post(:create, credentials: valid_credentials, format: :json)
      end

      it 'responds with a 200 OK' do
        expect(response.status).to eq(200)
     end

      it 'renders the show template' do
        expect(response).to render_template(:show)
      end

      it 'creates a user instance' do
        expect(assigns(:user)).to eq(user_instance_double)
      end
    end

    context 'with invalid user credentials' do
      let(:invalid_credentials) do
        { username: 'invalidusername', password: 'invalidpassword' }
      end

      before do
        allow(User).to receive(:find_by_credentials)
          .with(*invalid_credentials.values)
          .and_return(nil)

        post(:create, credentials: invalid_credentials, format: :json)
      end

      it 'responds with a 422 Unprocessable Entity' do
        expect(response.status).to eq(422)
      end

      it 'renders an error' do
        expect(
          JSON.parse(response.body)
        ).to include('errors' => ['Incorrect username/password combination'])
      end
    end
  end

  describe 'DELETE #destroy' do
    context 'when there is not a valid session_token present' do
      it 'responds with a 401 Unauthorized' do
        allow(User).to receive(:find_by)
          .with(session_token: nil)
          .and_return(nil)

        delete(:destroy, format: :json)
        expect(response.status).to eq(401)
      end
    end

    context 'when there is a valid session_token present' do
      before do
        allow(User).to receive(:find_by)
          .with(session_token: 'somesessiontoken')
          .and_return(user_instance_double)

        request.headers['X-Session-Token'] = 'somesessiontoken'
      end

      it 'responds with a 200 OK' do
        delete(:destroy, format: :json)
        expect(response.status).to eq(200)
      end

      it 'renders nothing' do
        delete(:destroy, format: :json)
        expect(response.body).to be_blank
      end

      it 'changes the session_token for the logged in user' do
        expect(user_instance_double).to receive(:change_session_token!)
        delete(:destroy, format: :json)
      end
    end
  end
end
