console.log("welcome to the travel inspiration app");
$('body').append('<div class="loading">Loading...</div>');

var allLocations = []
var locationCount = 0
var newLocation = ""
var images = []

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
	locationCount +1 >= allLocations.length ? locationCount = 0 : locationCount +=1
	newLocation = allLocations[locationCount];
	replaceContent();
})
$(".previous").click(function(){
	locationCount == 0 ? locationCount = allLocations.length -1 : locationCount -=1
	newLocation = allLocations[locationCount];
	replaceContent();
})
var photoTurnstile = function(){
	$(".photo").css("cursor","pointer")
	$(".photo").click(function(){
		$(this).animate({opacity:0},{duration:1000});
			if ($(this).next().length>0) {
				$(this).next().css("display","block").animate({opacity:1},{duration:1000});
				setTimeout(function(){$(this).css("display","none")},0)
			}else{
				$($(".photo")[0]).css("dislay","block").animate({opacity:1},{duration:1000});
				$(this).css("display","none");
			}
	})
}

var setUpPage = function () {
	$(".loading").remove()
	newLocation = allLocations[0];
	replaceContent();
}
var replaceContent = function () {
	$(".photo").remove();
	images = newLocation.img_url.split(",");
	images.forEach(function(img){
		var newImage = $('<img class="photo">');
		newImage.attr("src",img).css("display","none").css("opacity",0);
		$(".image").append(newImage);
	})
	if (images.length>1) {
		photoTurnstile()
	}
	$($(".photo")[0]).css("display","block").css("opacity",1);
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
		setUpPage();
	});
}

getLocations();

