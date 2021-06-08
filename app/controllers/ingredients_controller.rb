class IngredientsController < ApplicationController
  before_action :set_ingredient, only: [:show, :edit, :update, :destroy]

  def index
  end

  def show
  end

  def new
  end

  def edit
  end

  private
    def set_ingredient
      @ingredient = api_get('v1/ingredients')
    end
end
