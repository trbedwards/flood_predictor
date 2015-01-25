var DATA_URL = "https://stark-coast-9032.herokuapp.com";

var initialize_user = function(callback){
  try {
    var obj = params();
    if(!obj.user_id || !parseInt(obj.user_id)) {
      no_user_fallback();
      return;
    }

    // configure the hyper link is appropriate
    $("#nav_home_page").attr("href", "index.html?user_id=" + obj.user_id);
    $("#nav_places").attr("href", "places.html?user_id=" + obj.user_id);

    // call back if there is such callback 
    if (typeof callback === "function") {
      callback(parseInt(obj.user_id));
    }
  } catch(e) {
    no_user_fallback();
  }
};

var no_user_fallback = function(){
  window.location.href = "./login.html";
};

var params = function(){
  var obj = {};
  try {
    window.location.href.split("?")[1].split("&").forEach(function(x){
      var line = x.split("=");
      obj[line[0]] = line[1] || true;
    });
    return obj;
  } catch(e) {
    return obj;
  }
};

var generate_map_overlay = function(map){
  // set the overlay for flood indications
  var swBound = new google.maps.LatLng(42.944444, 5.764167);
  var neBound = new google.maps.LatLng(43.465, 6.51);
  var bounds = new google.maps.LatLngBounds(swBound, neBound);
  var srcImage = "https://s3-eu-west-1.amazonaws.com/appathon-poseidon/subset_0_of_S1A_IW_GRDH_20141203vv_Calib_TC_Spk_Sigma0_VV_db.jpg";
  // overlay = new USGSOverlay(bounds, srcImage, map);
  // console.log(overlay);
  // overlay.setOpacity(0.2);

  var image_bounds = new google.maps.LatLngBounds(swBound, neBound);
  var historicalOverlay = new google.maps.GroundOverlay(srcImage, image_bounds);
  historicalOverlay.setMap(map);
  console.log(historicalOverlay);
  historicalOverlay.setOpacity(0.7);

  $('#toggle-map-opacity').slider().on("slide", function(ev){
    // console.log(ev);
    console.log(ev.value);
    console.log(ev);
    console.log(this);
    var val  = Number(ev.value) / 100.0;
    console.log(val);
    historicalOverlay.setOpacity(Number(val))
  });
};