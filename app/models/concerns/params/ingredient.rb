module Params
  module Ingredient
    extend ActiveSupport::Concern
    CREATION_ATTRS = %i[name description status user_id]
  end
end