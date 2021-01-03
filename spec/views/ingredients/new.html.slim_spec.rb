require 'rails_helper'

RSpec.describe "ingredients/new", type: :view do
  before(:each) do
    assign(:ingredient, Ingredient.new(
      name: "MyText",
      description: "MyText",
      status: 1,
      user: nil
    ))
  end

  it "renders new ingredient form" do
    render

    assert_select "form[action=?][method=?]", ingredients_path, "post" do

      assert_select "textarea[name=?]", "ingredient[name]"

      assert_select "textarea[name=?]", "ingredient[description]"

      assert_select "input[name=?]", "ingredient[status]"

      assert_select "input[name=?]", "ingredient[user_id]"
    end
  end
end
