console.log("welcome to the travel inspiration app");
$('body').append('<div class="loading">Loading...</div>');

var allLocations = [];
var locationCount = 0;
var newLocation = "";
var images = [];
var countriesView = false;

var initMap = function() {
  let loc = {lat: newLocation.latitude, lng: newLocation.longitude};
  let map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8,
    center: loc
  });
  let marker = new google.maps.Marker({
    position: loc,
    map: map
  });
}

var contentToggle = function () {
  $(".content").toggle()
}
var indexToggle = function () {
  $(".all-locations").toggle()
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
$(".back").click(function(){
  history.replaceState({},'index',location.pathname)
  $(".photo").remove();
  contentToggle();
  indexToggle();
})

var showSetup = function () {
  $(".location").click(function(){
   var count = parseInt($(this).attr('class').split(" ")[1])
   newLocation = allLocations[count]
   locationCount = count
   history.pushState({},'show',location.pathname + '?' + newLocation.name.split(",")[0])
   contentToggle();
   indexToggle();
   replaceContent();
  })
}

var photoTurnstile = function(){
	$(".photo").css({"cursor":"pointer"});
	$(".photo").click(function(){
		if ($(this).next().length>0) {
				window.innerWidth>999?$(this).fadeOut(700):$(this).hide();
				$(this).next().fadeIn(800);
			}else{
				window.innerWidth>999?$(this).fadeOut(700):$(this).hide();
				$($(".photo")[0]).fadeIn(800);
			}
	})
}

var setUpPage = function () {
  $(".loading").remove();
  $(".selectors").show();
  setIndex();
}

var replaceContent = function () {
	images = newLocation.img_url.split(",");
	images.forEach(function(img,ind){
		var newImage = $('<img class="photo" title="click to view more photos">');
		newImage.attr("src",img);
    $("#image").append(newImage);
    if(ind>0) {
      $(newImage).hide();
    }else{
      $(newImage).on('load',function(){
      		$("#location-title").text(newLocation.name);
      		$(".why-text").text(newLocation.description);
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
		setUpPage()
	});
}


var setIndex = function () {
  allLocations.forEach(function(loc,ind){
    if(!countriesView){
      $('.country-tag').remove()
    }
    if((countriesView && ind === 0) || (countriesView && loc.country !== allLocations[ind-1].country)){
      var countryTag = $('<h1 class="country-tag">').html(loc.country)
      $('.locations-list').append(countryTag)
    }
    var location = $('<li class="location '+ ind + '">')
    var img = $('<div class="image" style=background-image:url('+loc.img_url.split(",")[0]+')>')
    var title = $('<div class="img-title">')
    title.html(loc.name)
    $(location).append(img)
    $(location).append(title)
    $('.locations-list').append(location)
  })
    showSetup();
}

function removeInfo(){
  $('.info-box').remove();
}

function addInfo(){
  let infoBox = $('<div class="info-box">');
  infoBox.css({'position':'fixed','top':'5%','left':'5%','z-index':'1000','opacity':'0.95','color':'white','text-align':'center','width':'80%','background-color':'#555a5b','border-radius':'20px','padding':'5%','font-size':'1.3em','font-family':'Verdana, sans-serif','letter-spacing':'1.5px','line-height':'30px'});
  infoBox.html("Brainstorm ideas for travel destinations.  Choose a location to explore, then click through the photos next to the description.  All locations are places I've been and all photos were taken by me.");
  let closeButton = $('<a class="close-button">');
  closeButton.html("close");
  closeButton.css({'display':'block','margin-top':'20px','text-decoration':'underline','cursor':'pointer','color':'lightgray','font-size':'.7em'});
  $(infoBox).append(closeButton);
  $('body').append(infoBox);
  $(infoBox).click(function(){
    removeInfo();
  })
}

function sortByRecent(){
  allLocations = allLocations.sort(function(a,b){
    if (a.created_at < b.created_at) {
    return 1;
    }
    if (a.created_at > b.created_at) {
      return -1;
    }
  })
}

function sortByAlpha(){
  allLocations = allLocations.sort(function(a,b){
    if (a.name < b.name) {
    return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
  })
}

function sortByCountry(){
  sortByAlpha()
  allLocations = allLocations.sort(function(a,b){
    if (a.country < b.country) {
    return -1;
    }
    if (a.country > b.country) {
      return 1;
    }
  })
}

$('.question-mark').click(function(){
  addInfo();
})

$('#sort-options').change(function(){
  countriesView = false;
  switch($('#sort-options').val()){
    case 'random-sort':
      getLocations();
      $('.location').remove();
    break
    case 'recent-sort':
      sortByRecent();
      $('.location').remove();
      setIndex();
    break
    case 'alpha-sort':
      sortByAlpha();
      $('.location').remove();
      setIndex();
    break
    case 'country-sort':
      sortByCountry();
      $('.location').remove();
      countriesView = true;
      setIndex();
    break
  }
})

$('#view-options').change(function(){
  switch($('#view-options').val()){
    case 'tiles-view':
      $('#all-map').hide();
      $('#list-view').remove();
      $('.locations-list').show();
    break
    case 'map-view':
      $('.locations-list').hide();
      $('#list-view').remove();
      if ($('#all-map').length > 0){
        $('#all-map').show();
      }else{
        allLocationsMap();
      }
    break
    case 'list-view':
      $('.locations-list').hide();
      $('#all-map').hide();
      createListView();
    break
  }
})

function allLocationsMap() {
  let allMap = $('<div id="all-map">');
  $(allMap).css({width:"99.5%",height:"inherit"});
  $('.all-locations').append(allMap);

  let map = new google.maps.Map(document.getElementById('all-map'), {
    zoom: 2.5,
    center: {lat:20,lng:-30}
  });

  allLocations.forEach(function(loc){
    let marker = new google.maps.Marker({
      position: {lat: loc.latitude, lng: loc.longitude},
      map: map,
      title: loc.name,
      animation: google.maps.Animation.DROP
    });
    marker.addListener('click', function() {
      newLocation = loc;
      history.pushState({},'show',location.pathname + '?' + newLocation.name.split(",")[0])
      replaceContent();
      indexToggle();
      contentToggle();  
    });
  })
}

function createListView(){
  let listView = $('<div id="list-view">');
  let locationList = $('<ul class="list-view-locations">');
  $(listView).append(locationList);
  allLocations.sort(function(a,b){
    if (a.name < b.name) {
    return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
  }).forEach(function(loc){
    let locationLi = $('<li class="listed-location">');
    locationLi.html(loc.name)
    $(locationList).append(locationLi)
    $(locationLi).click(function(){
      newLocation = loc;
      history.pushState({},'show',location.pathname + '?' + newLocation.name.split(",")[0])
      replaceContent();
      indexToggle();
      contentToggle();  
    })
  })
  $('.all-locations').append(listView);
}

window.addEventListener('popstate', function(){
  if (location.search == "") {
    history.replaceState({},'index',location.pathname);
    $(".photo").remove();
    indexToggle();
    contentToggle();
  }
});


contentToggle();
getLocations();