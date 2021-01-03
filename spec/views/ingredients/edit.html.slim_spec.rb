require 'rails_helper'

RSpec.describe "ingredients/edit", type: :view do
  before(:each) do
    @ingredient = assign(:ingredient, Ingredient.create!(
      name: "MyText",
      description: "MyText",
      status: 1,
      user: nil
    ))
  end

  it "renders the edit ingredient form" do
    render

    assert_select "form[action=?][method=?]", ingredient_path(@ingredient), "post" do

      assert_select "textarea[name=?]", "ingredient[name]"

      assert_select "textarea[name=?]", "ingredient[description]"

      assert_select "input[name=?]", "ingredient[status]"

      assert_select "input[name=?]", "ingredient[user_id]"
    end
  end
end
