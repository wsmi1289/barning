module Params
  module Recipe
    extend ActiveSupport::Concern
    CREATION_ATTRS = %i[id directions description image name user_id] +
      [ recipe_ingredients_attributes: RecipeIngredient::CREATION_ATTRS ]
  end
end