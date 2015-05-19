FactoryGirl.define do
  factory :score do
    level { rand(1..4) }
    session { rand(1..100) }
    reaction_time { rand(100.0..1000).round(4) }
    accuracy { rand(0.0..100).round(4) }
    user
  end

  factory :invalid_score, class: 'Score' do
    level nil
    session nil
    reaction_time nil
    accuracy nil
    user_id nil
  end
end
