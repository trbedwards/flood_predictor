function initialize() {
  var mapOptions = {
    center: { lat: 51.5, lng: -0.11},
    zoom: 13,
  };
  var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
}
google.maps.event.addDomListener(window, 'load', initialize);

