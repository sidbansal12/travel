var app = angular.module('travel', []);
//var app1 = angular.module('travel',['ngMaterial']);
//Signup & Login Controller
app.filter('like_post', function(){

    return function(){

    }

});

var host = "http://54.205.184.44:3000/"

app.controller('MainCtrl', ['$scope', '$http', '$window', 'sharedModels',function($scope, $http, $window,sharedModels){

  $scope.signup = function(){
    //var signup_username = $scope.contact.username;
    //console.log($scope.contact);
    //var phone = $scope.phone;
    var flag = false;
    $scope.error = "";
    $scope.flag = "false";
    $scope.isMissError = function(){
      if ($scope.error === "Username or EmailId already exists. Try a different one.")
        return true;
      else return false;
    }

    $scope.isPasswordError = function(){
      if ($scope.error === "Passwords don't match")
        return true;
      else return false;
    }

    $scope.makeVisible = function(){
      if($scope.flag === "true"){
        return true;
      }
      else {
        return false;
      }
    }

    var userFlag = "true";
    $.each($scope.users, function(i,item){
        if(item.username === $scope.contact.username||item.email_id === $scope.contact.email_id){
          userFlag="false";
        }
    });

    if(userFlag === "false"){
        alert("Username or EmailId already exists. Try a different one.");
        document.getElementById("emailId").value="";
        document.getElementById("username").value="";
    }
    if($scope.contact.password!==$scope.confirm_password){
      alert("Passwords don't match");
      document.getElementById("Password").value="";
      document.getElementById("ConfirmPassword").value="";
    }
    else{
      var flag = false;
      $.each($scope.users, function(i, item){
        if(item.username === $scope.contact.username||item.email_id===$scope.contact.email_id){
          $scope.contact.online = "true";
          flag = true;
          //try break statement here
        }
      });
      if(flag === false){
        $http.post('/addUser', $scope.contact).success(function(response){
          console.log(response);
        });
        refresh();
        $http.put('/user/'+username, $scope.update).success(function(){
          sharedModels.data.username = username;
          console.log($scope.update);
        });
        alert("Successfully signed up!");
        $scope.flag="true";
      }
    }
  }

  $scope.login = function(){

    /*$http.get('/users').then( function(res){
      $scope.users = res.data;
    });*/

    /*$http.get('/user/'+username).then( function(res){
      $scope.updateContact=res.data;
      console.log(res.data);
      //console.log("contactupgrade" + $scope.contact);
    });*/
    console.log("check");
    //console.log(sharedModels.data);
    var password = $scope.password;
    //$scope.update.online="true";
    //var userOnline = $scope.update.online;
    //sharedProperties.setData(password);
    //sharedProperties.setData(userOnline);

    //console.log("hi");
    //console.log($scope.update.username);

    $.each($scope.users, function(i, item){
      if(item.username===$scope.username && item.password===password){

        //console.log(username);
        //console.log($scope.update.username);

        //$http.get('/user/'+username).then( function(res){
          //console.log("hi "+$rootScope.username);
        //});
        sessionStorage.clear();
        sharedModels.addData($scope.username);
        var data = {
          username: username,
          online: 'true'
        };
        $http.put('/useronline/'+$scope.username, JSON.stringify(data))
        .success(function () {
          console.log(data);
        });
        $window.location.href= "http://54.205.184.44:3000/" + "/profile.html";
        console.log("chexk "+username);
        //console.log(sharedModels.data.username);
      }
      else{
        console.log("user not found");
      }
    });
  }

      $http.get('/users').then( function(res){
        $scope.users = res.data;
      });

    var refresh = function(){
        $http.get('/users').then( function(res){
        $scope.users = res.data;
      });
    }

}]);
var username;
//Profile Controller
app.controller('profileCtrl', ['$scope', '$http', '$window','sharedModels', function($scope, $http, $window,sharedModels){
  $scope.button = 'Like';
  $(function() {

      getUsers();

  });
  $scope.counter = 0;
  $scope.change = function() {
    $scope.counter++;
  };
  /*var vm = this;
  vm.listItems = sharedList.getList();
  console.log("hi");*/
  //console.log(vm.listItems);
  //$scope.currentuser = $rootScope.username;
  //console.log($scope.username);
  //sharedModels.data.username = "sid";s
  //var count = 1;

  $scope.sharedData = sharedModels.getData();
  username = $scope.sharedData[0];
  //console.log($scope.username);
  var user;

  $http.get('/users').then( function(res){
    $scope.users = res.data;
  });

  $http.get('/user/'+username).then(function(res){
    $scope.user = res.data;
    user = $scope.user;
  });

  $http.get('/getPosts').then( function(res){
    $scope.posts = res.data;
  });

  var ifImage = function(){
    $.each($scope.posts, function(i, item){
      if(item.image===undefined)
        return false;
      else
        return true;
      });
  }


//logout function
  $scope.logout = function(){

        var data = {
          username: username,
          online: 'false'
        };
        $http.put('/useronline/'+username, JSON.stringify(data))
        .success(function () {
          //console.log(data);
        });
        $window.location.href= "http://54.205.184.44:3000/" + "/index.html";
      }   //end logout

  $scope.goToProfile = function(){

    //sessionStorage.clear();
    sharedModels.addData($scope.selected);
        //console.log(newuser);

    //sharedProperties.setData(newuser);
    $window.location.href = "http://54.205.184.44:3000/" + "/viewProfile.html";

  }   //end goToProfile

  $http.get('/user/'+$scope.username).then( function(res){
    $scope.update=res.data;
    //console.log("contactupgrade" + $scope.contact);
  });

  $http.get('/onlineusers').then( function(res){
    $scope.onlineusers = res.data;
  });

  function getUsers() {
    $http.get('/onlineusers').then( function(res){
      $scope.onlineusers = res.data;
    });
}

  $scope.post_update = function(){
    //console.log(place);
    console.log(document.getElementById("autoComplete").value);
    console.log(username);
    if(document.getElementById("autoComplete").value===''){
      alert("Please Enter a place");
    }
    else{
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    var hh = today.getHours();
    var min = today.getMinutes();
    var sec = today.getSeconds();

    if(dd<10) {
        dd='0'+dd
    }

    if(mm<10) {
        mm='0'+mm
    }

    today = mm+'/'+dd+'/'+yyyy;
    time = hh+':'+min+':'+sec;

    $http.get('/users').then(function(res){
      var userdata = [];
      $scope.users = res.data;
      $.each($scope.users, function(i, item){
        user_data = {
          username: item.username,
          status: false
        };
        userdata.push(user_data);
      });
    var data = {
      post_by: username,
      place: document.getElementById("autoComplete").value,
      likes: userdata,
      no_likes: 0,
      no_dislikes: 0,
      created_at: today,
      time: time
    };

    //add to posts
    $http.post('/addPost', JSON.stringify(data))
    .success(function () {
      //console.log(data);
    });
  });

    //add to visited_places
    $http.get('/user/'+username).then(function(res){
      $scope.user = res.data;
      user = $scope.user;
    });
    $.each($scope.user, function(i, item){
      var place_list = item.visited_places;
        place_list.push(document.getElementById("autoComplete").value);
      var data1 = {
        username: username,
        visited_places: place_list
      };
      $http.put('/onlineuser/'+username, JSON.stringify(data1))
      .success(function () {
      });
    });
  }
  /*var socket = io.connect();
  socket.emit('post added', function(data){
    console.log(data);
      for(var i = 0; i < data.length; i++){
        if(user_list.indexOf(data[i])===-1){
          user_list.push(data[i]);
          $users.append('<li>'+data[i]+'</li>');
        }
      }
  });*/
  $window.location.reload();
}

$scope.like_update = function(data, post, isLike, index){

      if(isLike===false){

        var data3={
            postid: data
        };

        $http.put('/likepost/'+data, JSON.stringify(data3))
        .success(function () {
        });

        $http.get('/likes/'+data).then(function(res){
          $scope.liked_post = res.data;
          var likes = $scope.liked_post[0].likes;

          for(var i = 0; i < likes.length; i++){
            if(likes[i].username == username)
            {
              if (i > -1) {
                likes.splice(i, 1);
              }
            }
          }

          data4 = {
            username: username,
            status: true
          };

          likes.push(data4);
          data5 = {
            postid: data,
            likes: likes
          };
          $http.put('/updatelikes/'+data, JSON.stringify(data5))
          .success(function(){
          });
        });

        post.no_likes++;
      }
      else if(isLike===true){
        var data3={
            postid: data
        };

        $http.put('/unlikepost/'+data, JSON.stringify(data3))
        .success(function () {
        });

        $http.get('/likes/'+data).then(function(res){
          $scope.liked_post = res.data;
          var likes = $scope.liked_post[0].likes;

          for(var i = 0; i < likes.length; i++){
            if(likes[i].username == username)
            {
              if (i > -1) {
                likes.splice(i, 1);
              }
            }
          }

          data4 = {
            username: username,
            status: false
          };

          likes.push(data4);
          data5 = {
            postid: data,
            likes: likes
          };
          $http.put('/updatelikes/'+data, JSON.stringify(data5))
          .success(function(){
          });
        });
        post.no_likes--;
      }
}

}]);

app.controller('viewProfileCtrl', ['$scope', '$http', '$window', 'sharedModels', function($scope, $http, $window, sharedModels){

  $scope.sharedData = sharedModels.getData();
  var goToUser = $scope.sharedData[$scope.sharedData.length-1];

  $http.get('/user/'+goToUser).then(function(res){
    $scope.newuser = res.data;
  });

  $http.get('/getPosts').then( function(res){
    $scope.posts = res.data;
  });

  $http.get('/users').then( function(res){
    $scope.users = res.data;
  });

  $scope.goToProfile = function(){

    //sessionStorage.clear();
    sharedModels.addData($scope.selected);
        //console.log(newuser);

    //sharedProperties.setData(newuser);
    $window.location.href = "http://54.205.184.44:3000/" + "/viewProfile.html";

  }   //end goToProfile
}]);

app.controller('mapCtrl', ['$scope', '$http', '$window', 'sharedModels', function($scope, $http, $window, sharedModels){

  $scope.sharedData = sharedModels.getData();
  var goToUser = $scope.sharedData[0];

  $http.get('/user/'+goToUser).then(function(res){
    $scope.user = res.data;
  });

  $http.get('/users').then( function(res){
    $scope.users = res.data;
  });

  console.log("before");

  $scope.getPlaces = function(){
    console.log(document.getElementById("autoComplete").value);
    if(document.getElementById("autoComplete").value===undefined||document.getElementById("autoComplete").value===''){
      alert("Please Enter a place");
    }
    else{
      $.each($scope.user, function(i, item){
        var place_list = item.visited_places;
        if(place_list.length===0){
          place_list.add(document.getElementById("autoComplete").value);
        }
        else
          place_list.push(document.getElementById("autoComplete").value);
        var data = {
          username: goToUser,
          visited_places: place_list
        };
        $http.put('/onlineuser/'+goToUser, JSON.stringify(data))
        .success(function () {
          console.log(data);
        });
      });
    }
    $window.location.reload();
}

  function initialize() {

    var mapProp = {
      center:new google.maps.LatLng(51.508742, -0.120850),
      zoom: 2,
      mapTypeId: google.maps.MapTypeId.TERRAIN
    };
    var map=new google.maps.Map(document.getElementById("googleMap"), mapProp);

    $.each($scope.user, function(i, item){
      //googleMap = new google.maps.Map( document.getElementById( 'googleMap' ))
      console.log("entered");
      for(var i = 0;i<item.visited_places.length;i++){
        console.log("inside for");
        var url = "https://maps.googleapis.com/maps/api/geocode/json?address="+item.visited_places[i]+"&key=AIzaSyD4UZmTLSQ0ayKhWc9f91NSuPe8wFcYR3A";
        $.getJSON( url, function(json) {
          var latitude = json.results[0].geometry.location.lat;
          var longitude = json.results[0].geometry.location.lng;
          var marker = new google.maps.Marker({
            position: new google.maps.LatLng(latitude, longitude),
            map: map
          });
       });
      }
    });

  }

  google.maps.event.addDomListener(window, 'load', initialize); //window.onload = initialize

  $scope.goToProfile = function(){

    //sessionStorage.clear();
    sharedModels.addData($scope.selected);
        //console.log(newuser);

    //sharedProperties.setData(newuser);
    $window.location.href = "http://54.205.184.44:3000/viewProfile.html";

  }   //end goToProfile
}]);

app.service('sharedModels', function($window) {
        var KEY = 'App.SelectedValue';

        var addData = function(newObj) {
            var mydata = $window.sessionStorage.getItem(KEY);
            if (mydata) {
                mydata = JSON.parse(mydata);
            } else {
                mydata = [];
            }
            mydata.push(newObj);
            $window.sessionStorage.setItem(KEY, JSON.stringify(mydata));
        };

        var getData = function(){
            var mydata = $window.sessionStorage.getItem(KEY);
            if (mydata) {
                mydata = JSON.parse(mydata);
            }
            return mydata || [];
        };

        return {
            addData: addData,
            getData: getData
        };
    });
