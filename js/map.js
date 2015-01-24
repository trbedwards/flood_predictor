(function(){
  var no_user_fallback = function(){
    window.location.href = "/login.html";
  }

  var initialize_map = function(user_id) {
    try {
      var latlong = new google.maps.LatLng(51.347592, 0.353578);
      var mapOptions = {
        zoom: 11,
        center: latlong
      }

      var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

      var ctaLayer = new google.maps.KmlLayer({
        url: DATA_URL + "/users/" + user_id + "/places.xml"
      });
      ctaLayer.setMap(map);
    } catch(e) {
      
    }
  };

  var initialize_user = function(callback){
    try {
      var obj = {};
      window.location.href.split("?")[1].split("&").forEach(function(x){
        var line = x.split("=");
        obj[line[0]] = line[1] || true;
      });
      console.log(obj);
      alert();
      if(!obj.user_id || !parseInt(obj.user_id)) {
        no_user_fallback();
        return;
      }
      callback(parseInt(obj.user_id));
    } catch(e) {
      no_user_fallback();
    }

  };

  $(document).ready(function(){
    initialize_user(initialize_map);
  });
})();


