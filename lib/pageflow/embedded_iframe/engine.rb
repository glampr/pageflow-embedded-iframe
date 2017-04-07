require 'pageflow-public-i18n'

module Pageflow
  module EmbeddedIframe
    class Engine < Rails::Engine
      isolate_namespace Pageflow::EmbeddedIframe

      config.autoload_paths << File.join(config.root, 'lib')
    end
  end
end
