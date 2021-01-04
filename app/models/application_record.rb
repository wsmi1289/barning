class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true
  after_initialize :set_params

  private

  def set_params
    if Params.const_defined?(self.class.name, false)
      self.class.send(:include, "Params::#{self.class.name}".constantize)
    end
  end
end
