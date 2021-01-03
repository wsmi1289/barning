class CreateRecipeIngredients < ActiveRecord::Migration[6.1]
  def change
    create_join_table :recipes, :ingredients do |t|
      t.references :recipes, foreign_key: true
      t.references :ingredients, foreign_key: true
      t.decimal :amount
      t.integer :scale # enum: grams, cups, tbsp, tsp etc.
      t.timestamps
    end
  end
end
