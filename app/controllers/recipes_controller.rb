class RecipesController < ApplicationController
  before_action :set_recipe, only: [:show, :edit]

  def index
  end

  def show
  end

  def new
  end

  def edit
  end

  private

  def set_recipe
    @recipe = api_get('v1/recipes')
  end
end
