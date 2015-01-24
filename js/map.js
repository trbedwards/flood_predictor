function initialize() {
  var latlong = new google.maps.LatLng(51.347592, 0.353578);
  var mapOptions = {
    zoom: 11,
    center: latlong
  }

  var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

  // var ctaLayer = new google.maps.KmlLayer({
  //   url: 'http://gmaps-samples.googlecode.com/svn/trunk/ggeoxml/cta.kml'
  // });
  // ctaLayer.setMap(map);
}

google.maps.event.addDomListener(window, 'load', initialize);