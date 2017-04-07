module Pageflow
  module EmbeddedIframe
    class PageType < Pageflow::PageType
      name 'embedded_iframe'

      def json_seed_template
        'pageflow/embedded_iframe/page_type.json.jbuilder'
      end

    end
  end
end
