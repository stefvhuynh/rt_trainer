FactoryGirl.define do
  factory :progress do
    level { rand(1..4) }
    session { rand(1..100) }
    user
  end

  factory :invalid_progress do
    level nil
    session nil
    user_id nil
  end
end
