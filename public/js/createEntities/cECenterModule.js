angular.module('cECenter',[]);
angular.module('cECenter').controller('cECenterController',['$scope','$http',function($scope, $http){

        $scope.tagline = 'Add Or Update Center List';

        $scope.addCenter = function(){
          if ($scope.newCenter == null || $scope.newCenter == "") {
            alert("Can't add empty value. Please type!");
            return;
          }

          $http.post('/api/createcenter',$scope.newCenter).then(function(data){
            console.log("Data Saved successfully");
            $scope.getCenter();
            $scope.newCenter.desc = "";
          });

        };

        $scope.deleteCenter = function(id){
          if(confirm("Deleting Center Name! Are you sure?")){

            $http.post('/api/delcenter',{"_id" : id}).then(function(data){
              console.log("delete success");
              $scope.getCenter();
            });

          }
        };

        $scope.editCenter = function(id,desc){
          if(confirm("Editing Center Name! Are you sure?")){

            $http.post('/api/editcenter',{"_id" : id, "Desc": desc}).then(function(data){
              console.log("updated success");
              $scope.getCenter();
            });

          }
        };

        $scope.getCenter = function() {
          $http.get('/api/getcenter').then(function(data){
              $scope.center = data.data;
          });
        };

        $scope.getCenter();
    }]);
