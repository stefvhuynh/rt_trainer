require 'rails_helper'

RSpec.describe ApplicationController, type: :controller do
  let(:user_instance_double) { instance_double(User) }

  describe '#current_user' do
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

      it 'assigns the user to a @current_user instance variable' do
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

  describe '#logged_in?' do
    context 'when there is a valid session_token' do
      it 'returns true' do
        allow(User).to receive(:find_by)
          .with(session_token: 'somesessiontoken')
          .and_return(user_instance_double)
        subject.request.headers['X-Session-Token'] = 'somesessiontoken'
        expect(subject.logged_in?).to eql(true)
      end
    end

    context 'when there is not a valid session_token' do
      it 'returns false' do
        allow(User).to receive(:find_by)
          .with(session_token: 'invalidsessiontoken')
          .and_return(nil)
        subject.request.headers['X-Session-Token'] = 'invalidsessiontoken'
        expect(subject.logged_in?).to eql(false)
      end
    end
  end
end
