class ApplicationController < ActionController::Base
  include Permitted::UserParams
  add_flash_types :info, :error, :success, :warning
  before_action :authenticate_user!
  before_action :configure_permitted_parameters, if: :devise_controller?

  protected

  def configure_permitted_parameters
    user_params
  end
end
