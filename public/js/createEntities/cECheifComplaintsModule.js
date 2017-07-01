angular.module('cECheifComplaints',[]);
angular.module('cECheifComplaints').controller('cECheifComplaintsController',['$scope','$http',function($scope, $http){

        $scope.tagline = 'Add Or Update Cheif Complaints';

        $scope.addComplaints = function(){
          if ($scope.newComplaints == null || $scope.newComplaints == "") {
            alert("Can't add empty value. Please type!");
            return;
          }

          $http.post('/api/createcheifcomplaints',$scope.newComplaints).then(function(data){
            console.log("Data Saved successfully");
            $scope.getComplaints();
            $scope.newComplaints.desc = "";
          });

        };

        $scope.deleteComplaints = function(id){
          if(confirm("Deleting Complaint! Are you sure?")){

            $http.post('/api/delcheifcomplaints',{"_id" : id}).then(function(data){
              console.log("delete success");
              $scope.getComplaints();
            });

          }
        };

        $scope.editComplaints = function(id,desc){
          if(confirm("Editing Complaint! Are you sure?")){

            $http.post('/api/editcheifcomplaints',{"_id" : id, "Desc": desc}).then(function(data){
              console.log("updated success");
              $scope.getComplaints();
            });

          }
        };

        $scope.getComplaints = function() {
          $http.get('/api/getcheifcomplaints').then(function(data){
              $scope.cheifComplaints = data.data;
          });
        };

        $scope.getComplaints();
    }]);
