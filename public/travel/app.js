console.log("welcome to the travel inspiration app");
$('body').append('<div class="loading">Loading...</div>');

var allLocations = [];
var locationCount = 0;
var newLocation = "";
var images = [];

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

$(".next").click(function(){
  $(".photo").remove();
	locationCount >= allLocations.length -1 ? locationCount = 0 : locationCount +=1;
	newLocation = allLocations[locationCount];
	replaceContent();
})
$(".previous").click(function(){
  $(".photo").remove();
	locationCount == 0 ? locationCount = allLocations.length -1 : locationCount -=1;
	newLocation = allLocations[locationCount];
	replaceContent();
})
$(window).resize(function(){
  $('.map').remove();
  $('.description').append('<div class="map box" id="map">');
  resizeMap();
})
var photoTurnstile = function(){
	$(".photo").css({"cursor":"pointer"});
	$(".photo").click(function(){
		if ($(this).next().length>0) {
				window.innerWidth>999?$(this).fadeOut(500):$(this).hide();
				$(this).next().fadeIn(800);
			}else{
				window.innerWidth>999?$(this).fadeOut(500):$(this).hide();
				$($(".photo")[0]).fadeIn(800);
			}
      if (window.innerWidth<999){
        resizeMap();
      }
	})
}
var resizeMap = function(){
  if (window.innerWidth<999) {
      (window.innerHeight - 25 + $('.map').height())-($(".content").height())>150?setTimeout(function(){$('.map').height((window.innerHeight - 25 + $('.map').height())-($(".content").height()));initMap()},100):$('.map').height(150);initMap();
  }else{
      initMap();
  }
}

var setUpPage = function () {
	$(".loading").remove();
	newLocation = allLocations[0];
	replaceContent();
}
var replaceContent = function () {
	images = newLocation.img_url.split(",");
	images.forEach(function(img){
		var newImage = $('<img class="photo">');
		newImage.attr("src",img).hide();
		$(".image").append(newImage);
	})
	if (images.length>1) {
		photoTurnstile()
	}
	$($(".photo")[0]).show();
	setTimeout(function(){
		$(".location").text(newLocation.name);
		$(".why-text").text(newLocation.description);
    resizeMap();
	},100);
	$(".counter").text(locationCount+1 + " of " + allLocations.length);
}

var getLocations = function(){
	$.ajax({
		  url: "https://travel-api-app.herokuapp.com/random",
		  success: function(data){allLocations = data},
		  crossDomain:true,
		  dataType: "json"
	}).done(function(){
		setUpPage();
	});
}

getLocations();
