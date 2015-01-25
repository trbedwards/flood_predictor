(function(){
  // This example creates a custom overlay called USGSOverlay, containing
  // a U.S. Geological Survey (USGS) image of the relevant area on the map.

  // Set the custom overlay object's prototype to a new instance
  // of OverlayView. In effect, this will subclass the overlay class.
  // Note that we set the prototype to an instance, rather than the
  // parent class itself, because we do not wish to modify the parent class.

  var overlay;
  USGSOverlay.prototype = new google.maps.OverlayView();

  // Initialize the map and the custom overlay.
  /** @constructor */
  function USGSOverlay(bounds, image, map) {

    // Initialize all properties.
    this.bounds_ = bounds;
    this.image_ = image;
    this.map_ = map;

    // Define a property to hold the image's div. We'll
    // actually create this div upon receipt of the onAdd()
    // method so we'll leave it null for now.
    this.div_ = null;

    // Explicitly call setMap on this overlay.
    this.setMap(map);
  }

  /**
   * onAdd is called when the map's panes are ready and the overlay has been
   * added to the map.
   */
  USGSOverlay.prototype.onAdd = function() {

    var div = document.createElement('div');
    div.style.borderStyle = 'none';
    div.style.borderWidth = '0px';
    div.style.position = 'absolute';

    // Create the img element and attach it to the div.
    var img = document.createElement('img');
    img.src = this.image_;
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.position = 'absolute';
    div.appendChild(img);

    this.div_ = div;

    // Add the element to the "overlayLayer" pane.
    var panes = this.getPanes();
    panes.overlayLayer.appendChild(div);
  };

  USGSOverlay.prototype.draw = function() {

    // We use the south-west and north-east
    // coordinates of the overlay to peg it to the correct position and size.
    // To do this, we need to retrieve the projection from the overlay.
    var overlayProjection = this.getProjection();

    // Retrieve the south-west and north-east coordinates of this overlay
    // in LatLngs and convert them to pixel coordinates.
    // We'll use these coordinates to resize the div.
    var sw = overlayProjection.fromLatLngToDivPixel(this.bounds_.getSouthWest());
    var ne = overlayProjection.fromLatLngToDivPixel(this.bounds_.getNorthEast());

    // Resize the image's div to fit the indicated dimensions.
    var div = this.div_;
    div.style.left = sw.x + 'px';
    div.style.top = ne.y + 'px';
    div.style.width = (ne.x - sw.x) + 'px';
    div.style.height = (sw.y - ne.y) + 'px';
  };

  // The onRemove() method will be called automatically from the API if
  // we ever set the overlay's map property to 'null'.
  USGSOverlay.prototype.onRemove = function() {
    this.div_.parentNode.removeChild(this.div_);
    this.div_ = null;
  };

  var initialize_map = function(user_id) {
    try {
      var latlong = new google.maps.LatLng(43.204722, 6.1370835);
      var mapOptions = {
        zoom: 12,
        center: latlong,
        mapTypeId: google.maps.MapTypeId.SATELLITE
      };

      var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    
      // set user KML
      var user_layer = new google.maps.KmlLayer({
        url: DATA_URL + "/users/" + user_id + "/places.kml?dummy=" + (new Date()).getTime()
      });
      user_layer.setMap(map);

      // generate the map overlay
      generate_map_overlay(map);
    } catch(e) {

    }
  };

  $(document).ready(function(){
    initialize_user(initialize_map);
  });
})();