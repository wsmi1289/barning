class Api
  # def initialize(token)
  #   @token = token
  # end

  def get(path, params = {}, headers = {})
    api.get(path, params, headers)
  end

  def post(path, params = {}, headers = {})
    api.post(path, params, headers)
  end

  private

  def api
    Faraday.new(
      url: ENV.fetch('BARNING_API_URL', 'http://localhost:5000'),
      # headers: { 'Authorization': 'Bearer ' + @jwt_token }
    )
  end
end