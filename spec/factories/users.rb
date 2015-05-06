FactoryGirl.define do
  factory :user do
    username { Faker::Internet.user_name }
    password { Faker::Internet.password(7) }
    email { Faker::Internet.email }
  end

  factory :invalid_user, class: 'User' do
    username nil
    password nil
    email nil
  end
end
