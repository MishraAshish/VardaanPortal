angular.module('cEOccupation',[]);
angular.module('cEOccupation').controller('cEOccupationController',['$scope','$http',function($scope, $http){

        $scope.tagline = 'Add Or Update Occupation List';

        $scope.addOccupation = function(){
          if ($scope.newOccupation == null || $scope.newOccupation == "") {
            alert("Can't add empty value. Please type!");
            return;
          }

          $http.post('/api/createoccupation',$scope.newOccupation).then(function(data){
            console.log("Data Saved successfully");
            $scope.getOccupation();
            $scope.newOccupation.desc = "";
          });

        };

        $scope.deleteOccupation = function(id){
          if(confirm("Deleting Occupation Name! Are you sure?")){

            $http.post('/api/deloccupation',{"_id" : id}).then(function(data){
              console.log("delete success");
              $scope.getOccupation();
            });

          }
        };

        $scope.editOccupation = function(id,desc){
          if(confirm("Editing Occupation Name! Are you sure?")){

            $http.post('/api/editoccupation',{"_id" : id, "Desc": desc}).then(function(data){
              console.log("updated success");
              $scope.getOccupation();
            });

          }
        };

        $scope.getOccupation = function() {
          $http.get('/api/getoccupation').then(function(data){
              $scope.occupation = data.data;
              $scope.occupation.sort(function(a, b) {
                return a.Desc > b.Desc;
              });
              $scope.occupation.sort();
          });
        };

        $scope.getOccupation();
    }]);
