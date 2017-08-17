console.log("welcome to the travel inspiration app");
$('body').append('<div class="loading">Loading...</div>');

var allLocations = [];
var locationCount = 0;
var newLocation = "";
var images = [];

var initMap = function() {
  console.log("init")
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
$(window).on("resize",function(){
  if (window.innerWidth>999){
    $('.map').remove();
    $('.description').append('<div class="map box" id="map">');
    setTimeout(function(){initMap()},0)
  }else{
    resizeMap();
  }
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
        setTimeout(function(){resizeMap()},0)
      }
	})
}
var resizeMap = function(){
  console.log("resize")
  if (window.innerWidth<999) {
      (window.innerHeight - 25 + $('.map').height())-($(".content").height())>150?setTimeout(function(){$('.map').height((window.innerHeight - 25 + $('.map').height())-($(".content").height()));google.maps.event.trigger(map, "resize")},0):$('.map').height(250);google.maps.event.trigger(map, "resize");
  }else{
      google.maps.event.trigger(map, "resize");
  }
}

var setUpPage = function () {
	$(".loading").remove();
	newLocation = allLocations[0];
	replaceContent();
}
var replaceContent = function () {
	images = newLocation.img_url.split(",");
	images.forEach(function(img,ind){
		var newImage = $('<img class="photo">');
		newImage.attr("src",img);
    $(".image").append(newImage);
    if(ind>0) {
      $(newImage).hide();
    }else{
      $(newImage).on('load',function(){
      		$(".location").text(newLocation.name);
      		$(".why-text").text(newLocation.description);
          resizeMap();
          setTimeout(function(){initMap()},100)
      })
    }
	})
	if (images.length>1) {
		photoTurnstile()
	}
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
