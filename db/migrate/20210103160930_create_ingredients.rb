class CreateIngredients < ActiveRecord::Migration[6.1]
  def change
    create_table :ingredients do |t|
      t.text :name
      t.text :description
      t.integer :status
      t.text :image
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
