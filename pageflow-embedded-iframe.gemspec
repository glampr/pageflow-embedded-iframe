# coding: utf-8
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'pageflow/embedded_iframe/version'

Gem::Specification.new do |spec|
  spec.name          = "pageflow-embedded-iframe"
  spec.version       = Pageflow::EmbeddedIframe::VERSION
  spec.authors       = ["Giorgos Lamprianidis"]
  spec.email         = ["giorgos.lamprianidis@gmail.com"]
  spec.summary       = "Pagetype for embedding arbitrary URLs"
  spec.homepage      = "https://github.com/glampr/pageflow-embedded-iframe"
  spec.license       = "MIT"

  spec.files         = `git ls-files`.split($/)
  spec.executables   = spec.files.grep(%r{^bin/}) { |f| File.basename(f) }
  spec.test_files    = spec.files.grep(%r{^(test|spec|features)/})
  spec.require_paths = ["lib"]

  spec.add_runtime_dependency 'pageflow', '~> 0.11'
  spec.add_runtime_dependency 'i18n-js'
  spec.add_runtime_dependency 'pageflow-public-i18n', '~> 1.0'

  spec.add_development_dependency "bundler"
  spec.add_development_dependency "rake"
  spec.add_development_dependency "webmock"

  # Semantic versioning rake tasks
  spec.add_development_dependency 'semmy', '~> 0.3'
end
