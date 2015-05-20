require 'rails_helper'

RSpec.describe PagesController, type: :controller do
  describe 'GET #main' do
    before { get(:main) }

    it 'responds with a 200 OK' do
      expect(response.status).to eq(200)
    end

    it 'renders the main template' do
      expect(response).to render_template(:main)
    end
  end
end
