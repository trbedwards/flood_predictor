var user = {
    redirect: function(id){
        window.location.href = "/index.html?user_id=" + id
    },
    login: function(){
        event.preventDefault();
        var user_credentials = {};
        ["email", "password"].forEach(function(prop){
            user_credentials[prop] = $("#user_" + prop).val();
        });
        $.ajax({
            url: DATA_URL + "/users/find",
            method: "GET",
            data: {
                user: user_credentials
            },
            success: function(data){
                var u = data.user;
                console.log(u);
                user.redirect(u.id);
            },
            error: function(){
                alert("Are you sure your password and email combination is correct?");
            }
        });
    },
    register: function(){
        event.preventDefault();
        var user_credentials = {};
        ["email", "password", "password_confirmation", "name"].forEach(function(prop){
            user_credentials[prop] = $("#user_" + prop).val();
        });
        if (user_credentials.password !== user_credentials.password_confirmation) {
            alert("Password and password confirmation does not match!");
            return;
        }
        $.ajax({
            url: DATA_URL + "/users.json",
            method: "POST",
            data: {
                user: user_credentials
            },
            success: function(data){
                var u = data.user;
                user.redirect(u.id);
            },
            error: function(data){
                alert("An unknown error occured!");
            }
        });
    }
}