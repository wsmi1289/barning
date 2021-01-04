class IngredientSerializer < ActiveModel::Serializer
  attributes :id, :description, :name, :status
  belongs_to :user
end
