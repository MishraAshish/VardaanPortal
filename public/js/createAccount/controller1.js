angular.module('module1').controller('module1Controller',['$scope','$http',function($scope,$http){
  debugger;
  $scope.tagline = 'Nothing beats a pocket protector!';
  $http.get('/api/nerds').then(function(data){
       $scope.users = data.data;
  });

  $scope.addUser = function(){
    $http.post('/api/nerds',$scope.newuser).then(function(data){
      console.log("user Saved successfully");
      debugger;
      $scope.users.push($scope.newuser);
    });
    // $http.get('/api/nerds').then(function(data){
    //     $scope.users = data.data;
    // });
  };

  $scope.deleteUser = function(userName){
    $http.post('/api/delnerds',{"username" : userName}).then(function(data){
      console.log("user deleted successfully");
    });

    $http.get('/api/nerds').then(function(data){
        $scope.users = data.data;
    });
  };
}]);
