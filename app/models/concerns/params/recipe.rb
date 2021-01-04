module Params
  module Recipe
    extend ActiveSupport::Concern
    CREATION_ATTRS = %i[description image name user_id]
  end
end