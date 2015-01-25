$(document).ready(function(){
    var fetch_places_list = function(user_id){
        $.ajax({
            method: "GET",
            url: DATA_URL + "/users/" + user_id + "/places.json",
            success: function(data) {
                console.log(data);
                var places = data.places;
                places.forEach(function(place){
                    var tr = $(document.createElement("tr"));
                    ["name", "description", "link"].forEach(function(prop){
                        var td = $(document.createElement("td"));
                        if(prop === "link") {
                            var a = document.createElement("a");
                            a.href = "./view.html?place_id=" + place.id + "&user_id=" + user_id;
                            a.appendChild(document.createTextNode("View"));
                            td.append(a);
                        } else {
                            td.append(document.createTextNode(place[prop] || "N/A"));
                        }
                        tr.append(td);
                    });
                    $("#places_table_body").append(tr);
                });
            }
        })
    };

    initialize_user(fetch_places_list);
});