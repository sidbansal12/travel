var app = angular.module('travel', []);

app.controller('profileCtrl', function($scope, $http, 'sharedProperties'){
  var user = sharedProperties.getUser();
  console.log(user);
  var username = user.username;

  $http.get('/user/'+username).then( function(res){
    $scope.user = res.data;
    console.log($scope.user);
  });

  $scope.array = user.visited_places;

  $scope.arrayToString = function(string){
    return string.join(", ");
  };
});
