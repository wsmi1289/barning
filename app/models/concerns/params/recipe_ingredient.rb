module Params
  module RecipeIngredient
    extend ActiveSupport::Concern
    CREATION_ATTRS = %i[amount ingredient_id recipe_id scale]
  end
end