class ApplicationController < ActionController::Base
  include HttpMethods
  add_flash_types :info, :error, :success, :warning
end
