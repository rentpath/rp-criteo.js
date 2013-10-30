// Generated by CoffeeScript 1.6.3
(function() {
  'use strict';
  define(['flight/lib/component', 'map/ui/markers', 'map/ui/info_window'], function(defineComponent, Markers, InfoWindow) {
    var markersInfoWindow;
    markersInfoWindow = function() {
      this.defaultAttrs({
        markerOptions: {
          fitBounds: false
        }
      });
      return this.after('initialize', function() {
        return Markers.attachTo(this.node, {
          markerOptions: this.attr.markerOptions
        });
      });
    };
    return defineComponent(markersInfoWindow, InfoWindow);
  });

}).call(this);
