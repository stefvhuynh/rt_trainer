class Api::ScoresController < ApplicationController
  def create
    @score = Score.new(score_params)

    if @score.save
      render :show
    else
      render json: { errors: @score.errors.full_messages },
        status: :unprocessable_entity
    end
  end

  private

  def score_params
    params.require(:score).permit(:level, :session, :reaction_time, :accuracy)
  end
end
