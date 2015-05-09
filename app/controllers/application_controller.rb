class ApplicationController < ActionController::Base
  protect_from_forgery with: :null_session

  def current_user
    session_token = request.headers['X-Session-Token']
    @current_user ||= User.find_by(session_token: session_token)
  end
end
