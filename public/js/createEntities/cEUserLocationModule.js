angular.module('cELocation',[]);
angular.module('cELocation').controller('cELocationController',['$scope','$http',function($scope, $http){

        $scope.tagline = 'Add Or Update User Locations List';

        $scope.addLocation = function(){
          if ($scope.newLocation == null || $scope.newLocation == "") {
            alert("Can't add empty value. Please type!");
            return;
          }

          $http.post('/api/createlocation',$scope.newLocation).then(function(data){
            console.log("Data Saved successfully");
            $scope.getLocation();
            $scope.newLocation.desc = "";
          });

        };

        $scope.deleteLocation = function(id){
          if(confirm("Deleting Location Name! Are you sure?")){

            $http.post('/api/dellocation',{"_id" : id}).then(function(data){
              console.log("delete success");
              $scope.getLocation();
            });

          }
        };

        $scope.editLocation = function(id,desc){
          if(confirm("Editing Location Name! Are you sure?")){

            $http.post('/api/editlocation',{"_id" : id, "Desc": desc}).then(function(data){
              console.log("updated success");
              $scope.getLocation();
            });

          }
        };

        $scope.getLocation = function() {
          $http.get('/api/getlocation').then(function(data){
              $scope.location = data.data;
              $scope.location.sort(function(a, b) {
                return a.Desc > b.Desc;
              });
              $scope.location.sort();
          });
        };

        $scope.getLocation();
    }]);
