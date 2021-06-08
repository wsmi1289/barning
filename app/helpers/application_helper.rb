module ApplicationHelper

  # def current_user
  #   @_current_user ||= session[:user]
  # end

  def flash_class(type)
    case type
    when 'notice', 'info' then 'notification is-light is-info notice'
    when 'success' then 'notification is-light is-success'
    when 'alert', 'error' then 'notification is-light alert is-danger'
    when 'warning' then 'notification is-light is-warning'
    else 'notification is-light'
    end
  end
end
