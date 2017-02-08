angular.module('passportApp').controller("RegisterController", function($http, $location){
  var ctrl = this;

  ctrl.register = function() {
    console.log('creating new user');
    $http.post('/register', {
      username: ctrl.username,
      password: ctrl.password
    }).then(function(response){
      console.log(response);
      $location.path('/home');
    }, function(error) {
      console.log('error creating new user', error);
    });
  };
});
