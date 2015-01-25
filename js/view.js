(function(){

  var display_place_details = function(place){
    var div = document.getElementById("place_view_details");
    ["name", "description"].forEach(function(prop){
      var left = document.createElement("strong");
      left.appendChild(document.createTextNode(prop));
      var right = document.createTextNode(": " + (place[prop] || "N/A"))
      var p = document.createElement("p");
      p.appendChild(left);
      p.appendChild(right);
      div.appendChild(p);
    })
  };

  var initialize_view = function() {
    try {
      var latlong = new google.maps.LatLng(51.347592, 0.353578);
      var mapOptions = {
        zoom: 11,
        center: latlong
      }
      var place_id = params().place_id;

      var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
      var ctaLayer = new google.maps.KmlLayer({
        url: DATA_URL + "/places/" + place_id + ".kml?dummy=" + (new Date()).getTime()
      });
      ctaLayer.setMap(map);

      $.ajax({
        method: "GET",
        url: DATA_URL + "/places/" + place_id + ".json",
        success: function(data){
          var place = data.place;
          display_place_details(place);
        },
        error: function(){
          alert("An unkown error occured!");
        }
      })
    } catch(e) {

    }
  };

  $(document).ready(function(){
    console.log(params());
    initialize_user(initialize_view);
  });
})();