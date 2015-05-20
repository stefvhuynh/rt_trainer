class Progress < ActiveRecord::Base
  belongs_to :user

  validates :level, presence: true,
    numericality: { greater_than_or_equal_to: 1, less_than_or_equal_to: 4 }
  validates :session, presence: true,
    numericality: { greater_than_or_equal_to: 1 }
  validates :user_id, presence: true
end
