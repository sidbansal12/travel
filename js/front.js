$(document).ready(function(){
  $('#googleMap').addClass('scrolloff');
  $('.map-container').on('click', function(){
        $('#googleMap').removeClass('scrolloff');
  });
  $("#googleMap").mouseleave(function(){
        $('#googleMap').addClass('scrolloff');
  });
  var wScroll = $(this).scrollTop();

  $(".arrows").hover().css("cursor","pointer");
  $(".arrows").on("click",function(){
    $("body,html").animate({
      scrollTop: $("#first").position().top - 530},'slow');
  });

  $(".input .how").on("click",function(){
    $("body,html").animate({
      scrollTop: $(".container-header").position().top - 530},'slow');
  });

  $(".header .how").on("click",function(){
    $("body,html").animate({
      scrollTop: $(".container-header").position().top - 530},'slow');
  });

  var stickynav = function(){

    var wScroll = $(this).scrollTop();

    if(wScroll >= $('.input').position().top){
      $('.input').addClass("stick");
      $('.input').css("background","black");
      $('.input h4').css({
        'display' : 'inline-block',
        'float' : 'left'
      });
      $('.how').css({
        'display' : 'inline',
        'float' : 'right'
      });
      $('.sign').css({
        'display' : 'inline',
        'float' : 'right'
      });
    }

    if(wScroll < 193){
      $('.input').removeClass('stick');
      $('.input').css("background","transparent");
      $('.input h4').css({
        'display' : 'none'
      });
      $('.input .sign').css({
        'display' : 'none'
      });
      $('.input .how').css({
        'display' : 'none'
      });
    }

  };

  var imageTransition = function(){

    var wScroll = $(this).scrollTop();
    if(wScroll >= $(".title").position().top){
      $(".container .figure").each(function(i){
        setTimeout(function(){
        $(".container .figure img").eq(i).addClass("is-showing");
      },150 * (i+1));
    })
      $(".container-header h1").addClass("is-showing");
    }
  }

  stickynav();
  imageTransition();

  $(window).scroll(function(){

    var wScroll = $(this).scrollTop();

    $("html").css("display","fixed");
    $(".image img").css({
      'transform' : 'translate(0px,-' + wScroll/4 + '%)'
    });

    $(".arrows").css({
      'transform' : 'translate(0px,-' + wScroll*6 + '%)'
    });

    $(".container-header").css({
      'transform' : 'translate(0px,-' + wScroll + '%)'
    });

    /*$(".modal").css({
      'transform' : 'translate(0px,-' + wScroll*4 + '%)'
    });*/

    stickynav();
    imageTransition();
  });

  function initialize() {
    var mapProp = {
      center:new google.maps.LatLng(51.508742, -0.120850),
      zoom: 2,
      mapTypeId: google.maps.MapTypeId.TERRAIN
    };
    var map=new google.maps.Map(document.getElementById("googleMap"), mapProp);
  }

  google.maps.event.addDomListener(window, 'load', initialize);

  /*$(".header .signup").on('click',function(){
    $(".modal").css("display","block");
    $(".modal").css("top",$(".image").position().top);
    $("html").css("display","fixed");
  });*/

  var modal = document.getElementById('myModal');
  var span = document.getElementsByClassName("close")[0];

  span.onclick = function() {
    $(".modal").css("display","none");
    $("html").css("position","relative");
  }

  window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
  }
});

var lat;
var lon;

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

var lat=0;
var lon=0;

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
