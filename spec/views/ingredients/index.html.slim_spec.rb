require 'rails_helper'

RSpec.describe "ingredients/index", type: :view do
  before(:each) do
    assign(:ingredients, [
      Ingredient.create!(
        name: "MyText",
        description: "MyText",
        status: 2,
        user: nil
      ),
      Ingredient.create!(
        name: "MyText",
        description: "MyText",
        status: 2,
        user: nil
      )
    ])
  end

  it "renders a list of ingredients" do
    render
    assert_select "tr>td", text: "MyText".to_s, count: 2
    assert_select "tr>td", text: "MyText".to_s, count: 2
    assert_select "tr>td", text: 2.to_s, count: 2
    assert_select "tr>td", text: nil.to_s, count: 2
  end
end
