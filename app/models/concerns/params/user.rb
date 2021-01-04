module Params
  module User
    extend ActiveSupport::Concern
    UPDATE_ATTRS = %i[first_name image last_name]
  end
end