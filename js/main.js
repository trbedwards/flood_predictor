var DATA_URL = "https://stark-coast-9032.herokuapp.com";

var initialize_user = function(callback){
  try {
    var obj = params();
    if(!obj.user_id || !parseInt(obj.user_id)) {
      no_user_fallback();
      return;
    }

    // configure the hyper link is appropriate
    $("#nav_home_page").attr("href", "./index.html?user_id=" + obj.user_id);
    $("#nav_places").attr("href", "./places.html?user_id=" + obj.user_id);

    // call back if there is such callback 
    if (typeof callback === "function") {
      callback(parseInt(obj.user_id));
    }
  } catch(e) {
    no_user_fallback();
  }
};

var no_user_fallback = function(){
  window.location.href = "/login.html";
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
}