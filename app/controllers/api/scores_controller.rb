class Api::ScoresController < ApplicationController
  before_action :require_logged_in

  def create
    @score = current_user.scores.build(score_params)

    if @score.save
      render :show
    else
      render json: { errors: @score.errors.full_messages },
        status: :unprocessable_entity
    end
  end

  private

  def score_params
    params.require(:score)
      .permit(:level, :session, :reaction_time, :accuracy, :user_id)
  end
end
