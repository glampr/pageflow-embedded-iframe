module Pageflow
  module EmbeddedIframe
    class Configuration

      # White list of URL prefixes (including protocol) of embedded videos.
      # @return [Array<String>]
      attr_reader :supported_hosts

      def initialize
        @supported_hosts = ['.*']
      end

    end
  end
end
