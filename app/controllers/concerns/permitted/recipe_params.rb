module Permitted
  module RecipeParams
    extend ActiveSupport::Concern

    def recipe_params
      params.require(:recipe).permit(Recipe::CREATION_ATTRS).merge(user_id: current_user.id)
    end
  end
end