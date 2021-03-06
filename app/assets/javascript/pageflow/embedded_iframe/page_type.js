/*global YT, URI, $f */

pageflow.pageType.register('embedded_iframe', _.extend({
  prepareNextPageTimeout: 0,

  enhance: function(pageElement, configuration) {
    var that = this;

    pageElement.addClass('no_hidden_text_indicator');

    if (pageflow.features.has('mobile platform')) {
      pageElement.find('.close_button, .iframe_container').click(function(event) {
        event.stopPropagation();
        that._pauseVideo();
        pageElement.find('.iframe_container, .close_button').removeClass('show');
        pageflow.hideText.deactivate();
      });

      this._initPlaceholderImage(pageElement, configuration);
    }

    this.fullscreen = false;
    $(document).on('fullscreenchange mozfullscreenchange webkitfullscreenchange msfullscreenchange', function() {
      that.fullscreen = !that.fullscreen;
    });
  },

  resize: function(pageElement, configuration) {
    var iframeWrapper = pageElement.find('.iframe_wrapper'),
        pageHeader = pageElement.find('.page_header'),
        scroller = pageElement.find('.scroller'),
        container = pageElement.find('.iframe_container'),
        iframeOverlay = pageElement.find('.iframe_overlay'),
        videoCaption = pageElement.find('.iframe_caption'),
        widescreened = pageElement.width() > 1430,
        fullWidth = configuration.full_width,
        mobile = pageflow.features.has('mobile platform');

    if (fullWidth && !this.fullscreen) {
      widescreened = false;
    }

    iframeWrapper.add(scroller).toggleClass('widescreened', widescreened);

    if (!this.fullscreen) {
      if (widescreened || mobile) {
        if (!container.find('iframe').length) {
          container.append(iframeWrapper);
        }
      }
      else {
        if (!scroller.find('iframe').length) {
          iframeWrapper.insertAfter(pageHeader);
        }
      }
    }

    if (widescreened) {
      iframeWrapper.append(videoCaption);
    }
    else if (mobile) {
      iframeOverlay.after(videoCaption);
    }
    else {
      iframeWrapper.after(videoCaption);
    }

    scroller.scroller('refresh');
  },

  prepare: function(pageElement, configuration) {},

  preload: function(pageElement, configuration) {
    return pageflow.preload.backgroundImage(pageElement.find('.background_image'));
  },

  activating: function(pageElement, configuration) {
    var that = this;

    this.listenTo(pageflow.settings, "change:volume", function(model, value) {
      that._setPlayerVolume(value);
    });

    this._createIframe(pageElement, configuration);

    this.resize(pageElement, configuration);
    this.active = true;
  },

  activated: function(pageElement, configuration) {},

  deactivating: function(pageElement, configuration) {
    this.active = false;
    this.stopListening(pageflow.settings);
    this._removeIframe(pageElement);
  },

  deactivated: function(pageElement, configuration) {
  },

  update: function(pageElement, configuration) {
    pageElement.find('h2 .tagline').text(configuration.get('tagline') || '');
    pageElement.find('h2 .title').text(configuration.get('title') || '');
    pageElement.find('h2 .subtitle').text(configuration.get('subtitle') || '');
    pageElement.find('p').html(configuration.get('text') || '');

    var that = this,
        iframeWrapper = pageElement.find('.iframe_wrapper'),
        captionElement = pageElement.find('.iframe_caption'),
        caption = configuration.get('iframe_caption');

    if ((caption || '').trim() !== '') {
      if (!captionElement.length) {
        captionElement = $('<div class="iframe_caption"></div>');

        if (pageElement.find('.scroller iframe').length) {
          captionElement.insertAfter(iframeWrapper);
        } else {
          captionElement.appendTo(iframeWrapper);
        }
      }
      captionElement.text(caption || '');
    } else {
      captionElement.remove();
    }

    if (this.active) {
      if (configuration.hasChanged('display_embedded_iframe_url')) {
        this._removeIframe(pageElement, function() {
          that._createIframe(pageElement, configuration.attributes);
        });
      }
    }

    pageElement.find('.shadow').css({
      opacity: configuration.get('gradient_opacity') / 100
    });

    this.updateCommonPageCssClasses(pageElement, configuration);
    this.resize(pageElement, configuration.attributes);
  },

  embeddedEditorViews: function() {
    return {
      '.background_image': {
        view: pageflow.BackgroundImageEmbeddedView,
        options: {propertyName: 'background_image_id'}
      }
    };
  },

  _createIframe: function(pageElement, configuration) {
    var that = this,
        url = configuration.display_embedded_iframe_url,
        iframe = document.createElement('iframe');

    this.iframeId = 'iframe-element-' + this._getRandom(url);

    $(iframe).attr({
      id: this.iframeId,
      width: '100%',
      height: '100%',
      frameborder: '0',
      webkitallowfullscreen: true,
      mozallowfullscreen: true,
      allowfullscreen: true,
      src: (url + '')
    });

    pageElement.find('.iframe_wrapper').prepend(iframe);
  },


  _removeIframe: function (pageElement, callback) {
    $('#' + this.iframeId, pageElement).remove();

    if (typeof callback === 'function') {
      callback();
    }
  },

  _initPlaceholderImage: function(pageElement, configuration) {
    var $div = $(document.createElement('div')),
      pageHeader = pageElement.find('.page_header'),
      containerAndCloseButton = pageElement.find('.iframe_container, .close_button'),
      url = configuration.display_embedded_iframe_url;

    $div.addClass('iframe_overlay ' + this._urlOrigin(url));

    this._setBackgroundImage(url, $div);
    pageHeader.after($div);

    $div.click(function(event) {
      event.preventDefault();
      containerAndCloseButton.addClass('show');
      pageflow.hideText.activate();
    });
  },

  _setBackgroundImage: function(url, element) {
    var origin = this._urlOrigin(url),
        videoId = this._getVideoId(url),
        imageUrl = '';

    if (origin === 'youtube') {
      imageUrl = 'http://img.youtube.com/vi/' + videoId + '/hqdefault.jpg';
      element.css('background-image', 'url("' + imageUrl + '")');
    }
    else if (origin === 'vimeo') {
      var src = "http://vimeo.com/api/v2/video/" + videoId + ".json";

      $.getJSON(src, function(data) {
        element.css('background-image', 'url("' + data[0].thumbnail_large + '")');
      });
    }
  },

  _urlOrigin: function(url) {
    var uri = new URI(url),
      domain = uri.domain(true);

    if (['youtu.be', 'youtube.com'].indexOf(domain) >= 0) {
      return 'youtube';
    }
    else if (domain === 'vimeo.com') {
      return 'vimeo';
    }

    return '';
  },

  _getVideoId: function(url) {
    var uri = new URI(url),
        domain = uri.domain(true);

    if (['youtu.be', 'vimeo.com'].indexOf(domain) >= 0) {
      return uri.filename();
    }
    else if (domain === 'youtube.com') {
      if (uri.directory() === '/embed') {
        return uri.filename();
      }
      else {
        return uri.search(true).v;
      }
    }

    return '';
  },

  _getVideoStartTime: function(url) {
    var query = new URI(url).query();
    var params = query.split('&');
    var that = this;

    return _.reduce(params, function(result, param) {
      var parts = param.split('=');

      if (parts[0] === 't') {
        return that._timestampToSeconds(parts[1] || '');
      }

      return result;
    }, 0);
  },

  _timestampToSeconds: function(timestamp) {
    if (timestamp.match(/\d+m(\d+s)?/)) {
      var parts = timestamp.split('m');
      return parseInt(parts[0], 10) * 60 + parseInt(parts[1] || 0, 10);
    }
    else {
      return 0;
    }
  },

  _getRandom: function(string) {
    string = string + new Date().getTime();
    var hash = 0, i, chr, len;
    if (string === 0) return hash;
    for (i = 0, len = string.length; i < len; i++) {
      chr   = string.charCodeAt(i);
      hash  = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  }
}, pageflow.commonPageCssClasses));
