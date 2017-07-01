angular.module('cEDoctor',[]);
angular.module('cEDoctor').controller('cEDoctorController',['$scope','$http',function($scope, $http){

        $scope.tagline = 'Add Or Update Doctors List';

        $scope.addDoctor = function(){
          if ($scope.newDoctor == null || $scope.newDoctor == "") {
            alert("Can't add empty value. Please type!");
            return;
          }

          $http.post('/api/createdoctor',$scope.newDoctor).then(function(data){
            console.log("Data Saved successfully");
            $scope.getDoctor();
            $scope.newDoctor.desc = "";
          });

        };

        $scope.deleteDoctor = function(id){
          if(confirm("Deleting Doctor Name! Are you sure?")){

            $http.post('/api/deldoctor',{"_id" : id}).then(function(data){
              console.log("delete success");
              $scope.getDoctor();
            });

          }
        };

        $scope.editDoctor = function(id,desc){
          if(confirm("Editing Doctor Name! Are you sure?")){

            $http.post('/api/editdoctor',{"_id" : id, "Desc": desc}).then(function(data){
              console.log("updated success");
              $scope.getDoctor();
            });

          }
        };

        $scope.getDoctor = function() {
          $http.get('/api/getdoctor').then(function(data){
              $scope.doctor = data.data;
          });
        };

        $scope.getDoctor();
    }]);
