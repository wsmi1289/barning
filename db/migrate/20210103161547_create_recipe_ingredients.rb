class CreateRecipeIngredients < ActiveRecord::Migration[6.1]
  def change
    create_join_table :recipes, :ingredients, table_name: :recipe_ingredients do |t|
      t.primary_key :id
      t.decimal :amount
      t.integer :scale # enum: grams, cups, tbsp, tsp etc.
      t.timestamps
    end
  end
end
