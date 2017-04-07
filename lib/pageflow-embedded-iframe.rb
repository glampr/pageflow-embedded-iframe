require 'pageflow/embedded_iframe/engine'

module Pageflow
  module EmbeddedIframe
    def self.config
      @config ||= EmbeddedIframe::Configuration.new
    end

    def self.configure(&block)
      block.call(config)
    end

    def self.page_type
      EmbeddedIframe::PageType.new
    end
  end
end
