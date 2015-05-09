require 'rails_helper'

RSpec.describe Api::ApplicationController, type: :controller do
  describe '#current_user' do
    let(:user_instance_double) { instance_double(User) }

    context 'with a valid X-Session-Token header' do
      before do
        subject.request.headers['X-Session-Token'] = 'somesessiontoken'
        allow(User).to receive(:find_by)
          .with(session_token: 'somesessiontoken')
          .and_return(user_instance_double)
      end

      it 'returns the user with the associated session_token' do
        expect(subject.current_user).to eq(user_instance_double)
      end

      it 'assigns the user to an instance variable' do
        expect(assigns(:current_user)).to be_nil
        subject.current_user
        expect(assigns(:current_user)).to eq(user_instance_double)
      end
    end

    context 'without an X-Session-Token header' do
      before do
        allow(User).to receive(:find_by)
          .with(session_token: nil)
          .and_return(nil)
      end

      it 'returns nil' do
        expect(subject.current_user).to be_nil
      end

      it 'assigns the @current_user instance variable to nil' do
        subject.current_user
        expect(assigns(:current_user)).to be_nil
      end
    end
  end
end
