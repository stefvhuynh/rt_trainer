class Api::SessionsController < ApplicationController
  before_action :require_logged_in, only: :destroy

  def create
    @user = User.find_by_credentials(
      params[:credentials][:username],
      params[:credentials][:password]
    )

    if @user
      render :show
    else
      render json: { errors: ['Incorrect username/password combination'] },
        status: :unprocessable_entity
    end
  end

  def destroy
    current_user.change_session_token!
    render nothing: true
  end
end
