var latitude = localStorage.getItem("latitude");
var longitude = localStorage.getItem("longitude");
var address = localStorage.getItem("address");

function doIt() {
 var output = $.ajax({
    url: 'https://trailapi-trailapi.p.mashape.com/?lat='+latitude+'&lon='+longitude+'&radius=25', // The URL to the API. You can get this by clicking on "Show CURL example" from an API profile
    type: 'GET', // The HTTP Method, can be GET POST PUT DELETE etc
    data: {}, // Additional parameters here
    dataType: 'json',
    success: function(data) {
    	//
        //Change data.source to data.something , where something is whichever part of the object you want returned.
        //To see the whole object you can output it to your browser console using:
        //console.log(data);
        console.log(data);
        //console.log(data.places[0].city);
        var i;
        for(i=0; i<data.places.length; i++){
          for(var j=0;j<data.places[i].activities.length; j++){
            if(data.places[i].activities[j].thumbnail!=null){
              //$('<img src="'+data.places[i].activities[0].thumbnail+'">' + "<br>").appendTo("#output");
              $('<li><div class="list-item"><img class="place-photo" src="'+data.places[i].activities[j].thumbnail
              +'" alt="Sorry! No image for this place!"><div class="place-info"><h2>'+ data.places[i].activities[j].name +'</h2><h4>'+ data.places[i].activities[j].activity_type_name.toUpperCase()
              +'</h4><h5>'+ data.places[i].city +', '+ data.places[i].state +'</h5><h6>'+ data.places[i].activities[j].description +'</h6></div></div></li>').appendTo("#results");
            }
          }
        }
    },
    error: function(err) { alert(err); },
    beforeSend: function(xhr) {
    xhr.setRequestHeader("X-Mashape-Key", "BFTWzuhjjUmsh16FSDYTnPQxNsk0p1TZ37jjsnyWCa9H60Cbeq"); // Enter here your Mashape key
    }
});

}

google.maps.event.addDomListener(window, 'load', initilize);
function initilize(){
  var autocomplete = new google.maps.places.Autocomplete(document.getElementById('autoComplete'));
  /*google.maps.AddListener(autocomplete, 'plac_changed', function(){
    var places = autocomplete.getPlace();
    var location = "<b>Location:</b>" + places.formatted_address + "<br/>";
    lat =  places.geometry.location.A;
    lon = places.geometry.location.F;
    document.getElementById('result1').innerHTML = lat;
  });*/
}

$("#search").on('click', function(){
  var xmlhttp = new XMLHttpRequest();
  var address = document.getElementById("autoComplete").value;
  var url = "https://maps.googleapis.com/maps/api/geocode/json?address="+address+"&key=AIzaSyD4UZmTLSQ0ayKhWc9f91NSuPe8wFcYR3A";
  $.getJSON( url, function(json) {
    var latitude = json.results[0].geometry.location.lat;
    var longitude = json.results[0].geometry.location.lng;
    localStorage.setItem("latitude",latitude);
    localStorage.setItem("longitude",longitude);
    localStorage.setItem("address",address);
    window.location.href = "searchResults.html";
 });
});

$(document).ready(function(){
  $("#autoComplete").val(address);
  doIt();
});
