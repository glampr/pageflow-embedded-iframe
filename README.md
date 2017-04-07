# Pageflow Embedded iFrame

Page type adding an embedded iframe with any arbitrary URL.

## Installation

Add this line to your application's Gemfile:

    # Gemfile
    gem 'pageflow-embedded-iframe'

Run `bundle install`

Register the page type:

    # config/initializers/pageflow.rb
    Pageflow.configure do |config|
      config.page_types.register(Pageflow::EmbeddedIframe.page_type)
    end

Include javascript/stylesheets:

    # app/assets/javascripts/pageflow/application.js
    //= require pageflow/embedded_iframe

    # app/assets/javascripts/pageflow/editor.js
    //= require pageflow/embedded_iframe/editor

    # app/assets/stylesheets/pageflow/application.css.scss;
    @import "pageflow/embedded_iframe";

    # app/assets/stylesheets/pageflow/editor.css.scss;
    @import "pageflow/embedded_iframe/editor";

    # app/assets/stylesheets/pageflow/themes/default.css.scss
    @import "pageflow/embedded_iframe/themes/default";

<!---
## Configuration

Optionally, configure Pageflow Embedded iFrame by creating an initializer in your app
`config/initializers/pageflow_embedded_iframe.rb`.

Example:

    Pageflow::EmbeddedIframe.configure do |config|
      # Remove items to disallow hosts
      # The listed hosts are supported by default:
      # config.supported_hosts = %w(https://www.youtube.com http://www.youtube.com https://vimeo.com http://vimeo.com)
    end
--->

## Troubleshooting

If you run into problems while installing the page type, please also refer to the
[Troubleshooting](https://github.com/codevise/pageflow/wiki/Troubleshooting) wiki
page in the [Pageflow repository](https://github.com/codevise/pageflow). If that
doesn't help, consider
[filing an issue](https://github.com/codevise/pageflow-embedded-iframe/issues).


## Contributing Locales

TBA
