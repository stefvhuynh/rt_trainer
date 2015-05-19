module AuthenticationHelpers
  def mock_log_out
    request.headers['X-Session-Token'] = nil
    allow(User).to receive(:find_by)
      .with(session_token: nil)
      .and_return(nil)
  end

  # The argument `user` becomes the value of `current_user`.
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
