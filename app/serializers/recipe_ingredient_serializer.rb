class RecipeIngredientSerializer < ActiveModel::Serializer
  attributes :id, :amount, :scale, :recipe_id, :ingredient_id, :name
  belongs_to :recipe
  belongs_to :ingredient

  def name
    object.ingredient.name
  end
end
