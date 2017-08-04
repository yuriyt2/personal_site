
console.log("welcome to the travel inspiration app")

var allLocations = []
var locationCount = 0
var newLocation = ""

      var initMap = function() {
        var uluru = {lat: newLocation.latitude, lng: newLocation.longitude};
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 7,
          center: uluru
        });
        var marker = new google.maps.Marker({
          position: uluru,
          map: map
        });
      }

$(".refresh").click(function(){
	$($(".photo")[0]).attr("src","");
	locationCount +1 >= allLocations.length ? locationCount = 0 : locationCount +=1
	newLocation = allLocations[locationCount]
	replaceContent()
})
$(".previous").click(function(){
	$($(".photo")[0]).attr("src","");
	locationCount == 0 ? locationCount = allLocations.length -1 : locationCount -=1
	newLocation = allLocations[locationCount]
	replaceContent()
})

var replaceContent = function () {
	$($(".photo")[0]).attr("src",newLocation.img_url);
	setTimeout(function(){
		$(".location").text(newLocation.name);
		$(".why-text").text(newLocation.description);
		initMap();
	},100);
	$(".counter").text(locationCount+1 + " of " + allLocations.length)
}
var getLocations = function(){		
	$.ajax({
		  url: "https://travel-api-app.herokuapp.com/random",
		  success: function(data){allLocations = data},
		  crossDomain:true,
		  dataType: "json"
	}).done(function(){
		newLocation = allLocations[0];
		replaceContent();
	});
}

window.onload = function () {
	getLocations();
}
