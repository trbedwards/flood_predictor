(function(){
  // All google maps stuff
  var poly, map;
  var markers = [];
  var path = new google.maps.MVCArray;  

  var update_coordinates_display =  function(){
    var div = $(document.getElementById("places_new_coordinates"));
    div.html(""); // clear the div first
    markers.forEach(function(marker){
      console.log(marker);
      var p = $(document.createElement("p"));
      p.html(["(", marker.position.D, ", ", marker.position.k, ")"].join(""));
      div.append(p);
    });
  };

  var initialize_map = function() {
    var center = new google.maps.LatLng(43.204722, 6.1370835);

    map = new google.maps.Map(document.getElementById("map-canvas"), {
      zoom: 11,
      center: center
    });

    poly = new google.maps.Polygon({
      strokeWeight: 3,
      fillColor: '#5555FF'
    });
    poly.setMap(map);
    poly.setPaths(new google.maps.MVCArray([path]));

    google.maps.event.addListener(map, 'click', addPoint);

    // generate_map_overlay(map);
  };

  var addPoint = function(event) {
    path.insertAt(path.length, event.latLng);

    var marker = new google.maps.Marker({
      position: event.latLng,
      map: map,
      draggable: true
    });
    markers.push(marker);
    marker.setTitle("#" + path.length);
    update_coordinates_display();

    google.maps.event.addListener(marker, 'click', function() {
      marker.setMap(null);
      // this is a one liner for loop!
      for (var i = 0, I = markers.length; i < I && markers[i] != marker; ++i);
      markers.splice(i, 1);
      path.removeAt(i);
      update_coordinates_display();
      }
    );

    google.maps.event.addListener(marker, 'dragend', function() {
      // NB : this is a one liner for loop!
      for (var i = 0, I = markers.length; i < I && markers[i] != marker; ++i);
      path.setAt(i, marker.getPosition());
      update_coordinates_display();
      }
    );
  };

  var stringify_marker_arr = function(){
    return JSON.stringify(markers.map(function(marker){
      return [marker.position.k, marker.position.D]
    }));
  };

  var create_new_place = function(){
    event.preventDefault();
    var place_credentials = {};
    var user_id = params().user_id;
    ["name", "description"].forEach(function(prop){
      place_credentials[prop] = $("#places_new_" + prop).val();
    });
    place_credentials["coordinates"] = stringify_marker_arr();
    place_credentials["user_id"] = user_id;
    $.ajax({
      method: "POST",
      url: DATA_URL + "/places.json",
      data: {
        place: place_credentials
      },
      success: function(data){
        console.log(data);
        window.location.reload();
      },
      error: function(){
        alert("An unkown error occured");
      }
    })
  };

  // END OF google maps stuff
  var fetch_places_list = function(user_id){
      $.ajax({
          method: "GET",
          url: DATA_URL + "/users/" + user_id + "/places.json",
          success: function(data) {
              console.log(data);
              var places = data.places;
              places.forEach(function(place){
                  var tr = $(document.createElement("tr"));
                  ["name", "description"].forEach(function(prop){
                      var td = $(document.createElement("td"));
                      td.append(document.createTextNode(place[prop] || "N/A"));
                      tr.append(td);
                  });
                  // link to the view page for the stuff
                  var a = $(document.createElement("a"));
                  var td = $(document.createElement("td"));
                  a.append(document.createTextNode("View"));
                  a.attr("href", "./view.html?place_id=" + place.id + "&user_id=" + user_id);
                  td.append(a);
                  tr.append(td);

                  // button do destroy a single element
                  var button = $(document.createElement("button"));
                  var td = $(document.createElement("td"));
                  button.append(document.createTextNode("Remove!"));
                  button.addClass("remove-place btn btn-danger");
                  button.attr("id", place.id);
                  td.append(button);
                  tr.append(td);

                  // add the whole row into the thing
                  $("#places_table_body").append(tr);

                  // bind buttons to events
                  $("button.remove-place").click(function(e){
                    e.preventDefault();
                    remove_place(this);
                  });
              });
          }
      })
  };

  var remove_place = function(element){
    var place_id = element.id;
    console.log(element);
    $(element).parent().parent().remove();
    $.ajax({
      type: "DELETE",
      url: DATA_URL + "/places/" + place_id + ".json",
      success: function(data){
        console.log("removed place!");
      },
      error: function(data){
        console.log(data);
      }
    });
  };

  $(document).ready(function(){
      initialize_user(fetch_places_list);
      initialize_map();
      $('form#places_new_form').submit(function(e) {
        e.preventDefault();
        create_new_place();
        //your code
      });
  });
})();

