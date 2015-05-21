class Api::UsersController < ApplicationController
  def create
    @user = User.new(user_params)

    if @user.save
      base_progress = { level: 1, session: 1, user_id: @user.id }
      @progress = Progress.create!(base_progress)
      render :show
    else
      render json: { errors: @user.errors.full_messages },
        status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :password, :email)
  end
end
