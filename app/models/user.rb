class User < ActiveRecord::Base
  has_one :progress
  has_many :scores

  def self.find_by_credentials(username, password)
    user = self.find_by(username: username)
    (user && user.is_password?(password)) ? user : nil
  end

  after_initialize :ensure_session_token

  validates :username, presence: true, uniqueness: true
  validates :password_digest, presence: true
  validates :email, presence: true, uniqueness: true
  validates :session_token, presence: true, uniqueness: true
  validate :email_is_in_a_valid_format

  # If a password is passed in, it needs to be at least six characters long. The
  # only time we need a password to be passed in is when we create a new user.
  # Otherwise, we can allow the password to be nil.
  validates :password, length: { minimum: 6, allow_nil: true }

  # The password is not a column in the database, so we need a getter for the
  # validations and a setter to assign the variable on model initialization.
  attr_reader :password

  # We use a custom password setter to create the password_digest.
  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def change_session_token!
    self.session_token = SecureRandom.urlsafe_base64
    self.save!
    self.session_token
  end

  private

  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64
  end

  def email_is_in_a_valid_format
    unless self.email =~ /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i
      errors.add(:email, 'is not in a valid format')
    end
  end
end
