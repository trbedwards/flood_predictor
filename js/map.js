function initialize() {
  var chicago = new google.maps.LatLng(41.875696,-87.624207);
  var mapOptions = {
    zoom: 11,
    center: chicago
  }

  var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

  var ctaLayer = new google.maps.KmlLayer({
    url: 'http://gmaps-samples.googlecode.com/svn/trunk/ggeoxml/cta.kml'
  });
  ctaLayer.setMap(map);
}

google.maps.event.addDomListener(window, 'load', initialize);