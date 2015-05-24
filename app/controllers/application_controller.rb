class ApplicationController < ActionController::Base
  protect_from_forgery with: :null_session

  def logged_in?
    !!current_user
  end

  def current_user
    session_token = request.headers['X-Session-Token']
    puts User.find_by(session_token: session_token)
    @current_user ||= User.find_by(session_token: session_token)
  end

  private

  def require_logged_in
    render nothing: true, status: :unauthorized unless logged_in?
  end
end
