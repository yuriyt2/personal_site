console.log("it's on")

var newLocation = ""


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
	});
	
}