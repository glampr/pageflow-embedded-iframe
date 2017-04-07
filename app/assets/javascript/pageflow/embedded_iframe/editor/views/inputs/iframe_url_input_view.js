pageflow.embeddedIframe.VideoUrlInputView = pageflow.UrlInputView.extend({
  template: 'pageflow/embedded_iframe/editor/templates/url_input',

  regions: {
    statusContainer: '.status_container'
  },

  onLoad: function() {
    this.listenTo(this.model, 'change:' + this.options.propertyName, function() {
      this.updateValidationStatus();
    });

    this.updateValidationStatus();
  },

  updateValidationStatus: function() {
    var embeddedIframe = this.getEmbeddedIframe();

    if (embeddedIframe) {
      this.statusContainer.show(new pageflow.embeddedIframe.EmbeddedIframeStatusView({
        model: embeddedIframe
      }));
    }
    else {
      this.statusContainer.close();
    }
  },

  getEmbeddedIframe: function() {
    if (this.model.has(this.options.propertyName)) {
      return pageflow.embeddedIframe.embeddedIframes.getOrFetch(this.model.get(this.options.propertyName));
    }
  }
});
