pageflow.ConfigurationEditorView.register('embedded_iframe', {
  configure: function() {
    var supportedHosts = this.options.pageType.supportedHosts;

    this.tab('general', function() {
      this.group('general');
    });

    this.tab('topic', function() {
      this.input('embedded_iframe_id', pageflow.UrlInputView, {
        supportedHosts: supportedHosts,
        displayPropertyName: 'display_embedded_iframe_url',
        required: true,
        permitHttps: true
      });
      this.input('iframe_caption', pageflow.TextInputView);
      this.input('full_width', pageflow.CheckBoxInputView);
      this.input('background_image_id', pageflow.FileInputView, {collection: pageflow.imageFiles});
      this.input('thumbnail_image_id', pageflow.FileInputView, {
        collection: pageflow.imageFiles,
        imagePositioning: false
      });
    });

    this.tab('options', function() {
      this.group('options');
    });
  }
});
