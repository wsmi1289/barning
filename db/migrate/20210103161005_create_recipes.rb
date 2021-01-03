class CreateRecipes < ActiveRecord::Migration[6.1]
  def change
    create_table :recipes do |t|
      t.text :name
      t.text :description
      t.text :directions
      t.text :image
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
