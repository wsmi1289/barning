module Permitted
  module UserParams
    extend ActiveSupport::Concern
    def user_params
      devise_parameter_sanitizer.permit(:sign_up, keys: User::UPDATE_ATTRS)
    end
  end
end