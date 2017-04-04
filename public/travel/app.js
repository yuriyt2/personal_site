
console.log("it's on")

var newLocation = ""

      function initMap() {
        var uluru = {lat: newLocation.latitude, lng: newLocation.longitude};
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 6,
          center: uluru
        });
        var marker = new google.maps.Marker({
          position: uluru,
          map: map
        });
      }

window.onload = function () {

		$.ajax({
		  url: "https://travel-api-app.herokuapp.com/random",
		  success: function(data){newLocation = data},
		  crossDomain:true,
		  dataType: "json"
	}).done(function(){
		$(".location").text(newLocation.name);
		$(".why-text").text(newLocation.description);
		$($(".photo")[0]).attr("src",newLocation.img_url);
		initMap();
	});
	



    
}
