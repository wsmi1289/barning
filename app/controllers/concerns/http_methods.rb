module HttpMethods
  def api_get(path, options = {}, parse_json = true)
    response = api.get(path, options[:params] || options)
    parse_json ? JSON.parse(response.body) : response
  end

  def api_post(path, options = {})
    api.post(path, options[:params] || options)
  end

  private

  def api
    @_api ||= Api.new()
  end

end