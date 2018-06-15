angular.module('cEDiagnosis',[]);
angular.module('cEDiagnosis').controller('cEDiagnosisController',['$scope','$http',function($scope, $http){

        $scope.tagline = 'Add Or Update Diagnosis';

        $scope.addDiagnosis = function(){
          if ($scope.newDiagnosis == null || $scope.newDiagnosis == "") {
            alert("Can't add empty value. Please type!");
            return;
          }

          $http.post('/api/creatediagnosis',$scope.newDiagnosis).then(function(data){
            console.log("Data Saved successfully");
            $scope.getDiagnosis();
            $scope.newDiagnosis.desc = "";
          });

        };

        $scope.deleteDiagnosis = function(id){
          if(confirm("Deleting Diagnosis! Are you sure?")){

            $http.post('/api/deldiagnosis',{"_id" : id}).then(function(data){
              console.log("delete success");
              $scope.getDiagnosis();
            });

          }
        };

        $scope.editDiagnosis = function(id,desc){
          if(confirm("Editing Diagnosis! Are you sure?")){

            $http.post('/api/editdiagnosis',{"_id" : id, "Desc": desc}).then(function(data){
              console.log("updated success");
              $scope.getDiagnosis();
            });

          }
        };

        $scope.getDiagnosis = function() {
          $http.get('/api/getdiagnosis').then(function(data){
              $scope.diagnosis = data.data;
              $scope.diagnosis.sort(function(a, b) {
                return a.Desc > b.Desc;
              });
              $scope.diagnosis.sort();
          });
        };

        $scope.getDiagnosis();
    }]);
