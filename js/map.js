function initialize() {
  var myLatlng = new google.maps.LatLng(51.5, -0.11);
  var mapOptions = {
    zoom: 13,
    center: myLatlng
  }

  var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

  var transitLayer = new google.maps.TransitLayer();
  transitLayer.setMap(map);  
}

google.maps.event.addDomListener(window, 'load', initialize);
