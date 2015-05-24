# The logic for logging in and out are in ApplicationController. It uses the
# User model and a header called `X-Session-Token`. Here, we mock the log in and
# log out process so that we don't rely on the User model and we don't hit the
# database every time.
module AuthenticationHelpers
  MOCK_SESSION_TOKEN = 'somesessiontoken'

  def mock_session_token
    MOCK_SESSION_TOKEN
  end

  # `@current_user` becomes nil.
  def mock_log_out
    set_session_token_header(nil)
    allow(User).to receive(:find_by)
      .with(session_token: nil)
      .and_return(nil)
  end

  # The argument `user` becomes the value of `@current_user`.
  def mock_log_in(user)
    set_session_token_header(mock_session_token)
    allow(User).to receive(:find_by)
      .with(session_token: mock_session_token)
      .and_return(user)
  end

  def log_out
    set_session_token_header(nil)
  end

  def log_in(user)
    set_session_token_header(user.session_token)
  end

  private

  def set_session_token_header(token_or_nil)
    request.headers['X-Session-Token'] = token_or_nil
  end
end

RSpec.configure do |config|
  config.include(AuthenticationHelpers)
end
