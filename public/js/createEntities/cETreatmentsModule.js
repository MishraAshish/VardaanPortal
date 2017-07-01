angular.module('cETreatments',[]);
angular.module('cETreatments').controller('cETreatmentsController',['$scope','$http',function($scope, $http){

        $scope.tagline = 'Add Or Update Treatments List';

        $scope.addTreatments = function(){
          if ($scope.newTreatments == null || $scope.newTreatments == "") {
            alert("Can't add empty value. Please type!");
            return;
          }

          $http.post('/api/createtreatments',$scope.newTreatments).then(function(data){
            console.log("Data Saved successfully");
            $scope.getTreatments();
            $scope.newTreatments.desc = "";
          });

        };

        $scope.deleteTreatments = function(id){
          if(confirm("Deleting Treatment Name! Are you sure?")){

            $http.post('/api/deltreatments',{"_id" : id}).then(function(data){
              console.log("delete success");
              $scope.getTreatments();
            });

          }
        };

        $scope.editTreatments = function(id,desc){
          if(confirm("Editing Treatment Name! Are you sure?")){

            $http.post('/api/edittreatments',{"_id" : id, "Desc": desc}).then(function(data){
              console.log("updated success");
              $scope.getTreatments();
            });

          }
        };

        $scope.getTreatments = function() {
          $http.get('/api/gettreatments').then(function(data){
              $scope.treatments = data.data;
          });
        };

        $scope.getTreatments();
    }]);
