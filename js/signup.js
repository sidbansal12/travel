$(".link").on('click',function(){
  $(".sign-up-form-inside").css("display","none");
  $(".login-form").css("display","block");
});

$(".link1").on('click',function(){
  $(".sign-up-form-inside").css("display","block");
  $(".login-form").css("display","none");
});

$(".forgot").on('click',function(){
  $(".forgotten-password").css("display","block");
  $(".login-form").css("display","none");
});

$(".link2").on('click',function(){
  $(".forgotten-password").css("display","none");
  $(".login-form").css("display","block");
});

$(".heading").hover().css("cursor","pointer");
$(".heading").on('click',function(){
  window.location.href = "index.html";
});

//PROFILE

$(".search-link").on('click',function(){
  $(this).css("display","none");
  $(".search").css("display","block");
  $(".search-btn").css("display","block");
  $(".search").animate({
    width: "15em",
    opacity: "1"
  });
  $(".map-link").css("margin-left","300px");
  $(".photo-link").css("margin-left","200px");

});

$(".container").on("click",function(){
  $(".search").animate({
    width: "5em",
    opacity: "0",
    display: "none"
  });
  $(".search-link").css('display',"block");
  $(".search-btn").css("display","none");
});

$(".cover-pic").on("click",function(){
  $(".search").animate({
    width: "5em",
    opacity: "0",
    display: "none"
  });
  $(".search-link").css('display',"block");
  $(".search-btn").css("display","none");
});

$(".profile-pic").on("click",function(){
  $(".search").animate({
    width: "5em",
    opacity: "0",
    display: "none"
  });
  $(".search-link").css('display',"block");
  $(".search-btn").css("display","none");
});

var scroll = function(){
  var position = $(".places").position().top;
  var wScroll = $(window).scrollTop();

  if(wScroll >= position){
    $(".places").css("position","fixed");
  }
  scroll();
}

$(".logout").on('click',function(){
  window.location.href = "index.html";
});

$(document).ready(function(){
				var select_state, $select_state;
				$select_state = $('#select-state').selectize({});
				select_state = $select_state[0].selectize;

        $('#select-state-disabled').selectize({
					maxItems: 15
				});

        $('#select-user').selectize({
          sortField: 'text'
        });
});

/*$(document).ready(function(){
  $('#btnAddUser').on('click', addUser);
});

function addUser(event){

  event.preventDefault();

  var error = 0;

  $('#addUser input').each(function(index, val){
    if($(this).val() === ''){
      error++;
    }
  });

  if(error===0){
    if($('#addUser fieldset #Password').val()===$('#addUser fieldset #ConfirmPassword').val()){

      var newUser = {
        'name':{
          'first': $('#addUser fieldset #first_name').val(),
          'last': 'first': $('#addUser fieldset #last_name').val()
        },
        'phone': $('#addUser fieldset #phone').val(),
        'address': $('#addUser fieldset #address').val(),
        'email': $('#addUser fieldset #emailId').val(),
        'username': $('#addUser fieldset #username').val(),
        'password': $('#addUser fieldset #Password').val()
      }
    }else{

    }
  }
}*/

/*google.maps.event.addDomListener(window, 'load', initilize);
function initilize(){
  var autocomplete = new google.maps.places.Autocomplete(document.getElementById('address'));
  /*google.maps.AddListener(autocomplete, 'plac_changed', function(){
    var places = autocomplete.getPlace();
    var location = "<b>Location:</b>" + places.formatted_address + "<br/>";
    lat =  places.geometry.location.A;
    lon = places.geometry.location.F;
    document.getElementById('result1').innerHTML = lat;
  });*/
//}
