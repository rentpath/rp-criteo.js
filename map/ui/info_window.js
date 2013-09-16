// Generated by CoffeeScript 1.6.3
(function() {
  'use strict';
  define(['flight/lib/component', 'utils'], function(defineComponent, utils) {
    var infoWindow;
    infoWindow = function() {
      this.defaultAttrs({
        gMap: {},
        gMarker: {},
        gmapInfoWindows: {},
        currentOpenWindow: {}
      });
      this.showInfoWindowOnMarkerClick = function(ev, data) {
        this.attr.gMarker = data.gMarker;
        this.attr.gMap = data.gMap;
        return this.trigger(document, 'uiInfoWindowDataRequest', {
          listingId: this.attr.gMarker.datumId
        });
      };
      this.render = function(ev, data) {
        var gInfoWindow;
        this.closeOpenInfoWindows();
        gInfoWindow = this.openInfoWindow(data);
        return this.wireUpEvents(gInfoWindow);
      };
      this.closeOpenInfoWindows = function() {
        if (!$.isEmptyObject(this.attr.currentOpenWindow)) {
          return this.attr.currentOpenWindow.close();
        }
      };
      this.openInfoWindow = function(data) {
        var gInfoWindow;
        gInfoWindow = new google.maps.InfoWindow();
        gInfoWindow.setContent(data);
        gInfoWindow.open(this.attr.gMap, this.attr.gMarker);
        return this.attr.currentOpenWindow = gInfoWindow;
      };
      this.wireUpEvents = function(gInfoWindow) {
        var _this = this;
        google.maps.event.addListener(gInfoWindow, 'closeclick', function() {
          return $(document).trigger('uiInfoWindowClosed');
        });
        return google.maps.event.addListener(gInfoWindow, 'domready', function() {
          return $(document).trigger('uiInfoWindowRendered', {
            marker: _this.attr.gMarker,
            infoWindow: gInfoWindow
          });
        });
      };
      return this.after('initialize', function() {
        this.on(document, 'markerClicked', this.showInfoWindowOnMarkerClick);
        this.on(document, 'infoWindowDataAvailable', this.render);
        return this.on(document, 'uiCloseOpenInfoWindows', this.closeOpenInfoWindows);
      });
    };
    return infoWindow;
  });

}).call(this);
