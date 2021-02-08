module Params
  module Recipe
    extend ActiveSupport::Concern
    CREATION_ATTRS = %i[id directions description image name user_id] << {
      recipe_ingredients: %i[amount ingredient_id recipe_id scale]
    }
  end
end