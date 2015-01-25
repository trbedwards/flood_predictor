(function(){
  var initialize_map = function(user_id) {
    try {
      var latlong = new google.maps.LatLng(51.347592, 0.353578);
      var mapOptions = {
        zoom: 11,
        center: latlong
      }

      var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
      console.log(DATA_URL + "/users/" + user_id + "/places.kml");
      var ctaLayer = new google.maps.KmlLayer({
        url: DATA_URL + "/users/" + user_id + "/places.kml"
      });
      ctaLayer.setMap(map);
    } catch(e) {

    }
  };

  $(document).ready(function(){
    initialize_user(initialize_map);
  });
})();