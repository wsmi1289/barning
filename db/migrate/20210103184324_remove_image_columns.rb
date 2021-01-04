class RemoveImageColumns < ActiveRecord::Migration[6.1]
  def change
    remove_column :recipes, :image
    remove_column :ingredients, :image
  end
end
