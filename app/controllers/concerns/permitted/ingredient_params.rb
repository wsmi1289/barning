module Permitted
  module IngredientParams
    extend ActiveSupport::Concern

    def ingredient_params
      params.require(:ingredient).permit(Ingredient::CREATION_ATTRS)
        .merge(user_id: current_user.id)
    end
  end
end