# The logic for logging in and out are in ApplicationController. It uses the
# User model and a header called `X-Session-Token`. Here, we mock the log in and
# log out process so that we don't rely on the User model and we don't hit the
# database every time.
module AuthenticationHelpers
  # `@current_user` becomes nil.
  def mock_log_out
    request.headers['X-Session-Token'] = nil
    allow(User).to receive(:find_by)
      .with(session_token: nil)
      .and_return(nil)
  end

  # The argument `user` becomes the value of `@current_user`.
  def mock_log_in(user)
    request.headers['X-Session-Token'] = 'somesessiontoken'
    allow(User).to receive(:find_by)
      .with(session_token: 'somesessiontoken')
      .and_return(user)
  end
end

RSpec.configure do |config|
  config.include(AuthenticationHelpers)
end
