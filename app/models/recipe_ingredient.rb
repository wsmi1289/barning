class RecipeIngredient < ApplicationRecord
  include Params::Recipe
  belongs_to :recipe
  belongs_to :ingredient
end
