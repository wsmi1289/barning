class RemoveImageColumns < ActiveRecord::Migration[6.1]
  def change
    remove_column :recipes, :image, :text
    remove_column :ingredients, :image, :text
  end
end
