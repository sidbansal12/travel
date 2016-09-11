

  $('#googleMap').addClass('scrolloff');

  $('.total-container').on('click', function(){
        $('#googleMap').removeClass('scrolloff');
  });
  $('.map-places').on('click', function(){
        $('#googleMap').addClass('scrolloff');
  });
  $('.total-container').on('mouseleave', function(){
        $('#googleMap').addClass('scrolloff');
  });
  $("#googleMap").mouseleave(function(){
        $('#googleMap').addClass('scrolloff');
  });


$("#search").on('click', function(){
  var xmlhttp = new XMLHttpRequest();
  var address = document.getElementById("autoComplete").value;
  var url = "https://maps.googleapis.com/maps/api/geocode/json?address="+address+"&key=AIzaSyD4UZmTLSQ0ayKhWc9f91NSuPe8wFcYR3A";
  $.getJSON( url, function(json) {
    var latitude = json.results[0].geometry.location.lat;
    var longitude = json.results[0].geometry.location.lng;
 });
});

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
