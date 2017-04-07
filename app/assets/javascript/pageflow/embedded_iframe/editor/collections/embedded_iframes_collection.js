pageflow.embeddedIframe.EmbeddedIframesCollection = Backbone.Collection.extend({
  model: pageflow.embeddedIframe.EmbeddedIframe,

  name: 'embedded_iframes',

  getOrFetch: function(id, options) {
    options = options || {};
    var model = this.get(id);

    if (model) {
      if (options.success) {
        options.success(model);
      }
    }
    else {
      model = new pageflow.embeddedIframe.EmbeddedIframe({id: id});
      this.add(model);
      model.fetch(options);
    }

    return model;
  }
});
