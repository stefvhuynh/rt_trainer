class Api::SessionsController < ApplicationController
  def create
    @user = User.find_by_credentials(
      params[:credentials][:username],
      params[:credentials][:password]
    )

    if @user
      render :show
    else
      render(
        json: { errors: ['Incorrect username/password combination'] },
        status: :unprocessable_entity
      )
    end
  end
end
