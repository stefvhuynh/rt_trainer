class Score < ActiveRecord::Base
  belongs_to :user

  validates :level, presence: true,
    numericality: { greater_than_or_equal_to: 1, less_than: 5 }
  validates :session, presence: true,
    numericality: { greater_than_or_equal_to: 1 }
  validates :reaction_time, presence: true,
    numericality: { greater_than: 0 }
  validates :accuracy, presence: true,
    numericality: { greater_than_or_equal_to: 0, less_than_or_equal_to: 100 }
  validates :user_id, presence: true
end
