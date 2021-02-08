class RecipeSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :description, :directions, :image, :name
  belongs_to :user
  has_many :recipe_ingredients

  # def image
  #   rails_blob_path(object.image, only_path: true)
  # end
end
