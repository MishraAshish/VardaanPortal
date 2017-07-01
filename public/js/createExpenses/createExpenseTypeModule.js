angular.module('createExpenseType',[]);

angular.module('createExpenseType').controller('createExpenseTypeController',['$scope','$http',function($scope, $http){

        $scope.tagline = 'Creating Expenses Types!';

        $scope.addExpenseType = function(){
          if ($scope.newCenter == null || $scope.newCenter == "") {
            alert("Can't add empty value. Please type!");
            return;
          }

          $http.post('/api/createExpenseType',$scope.newCenter).then(function(data){
            console.log("Data Saved successfully");
            $scope.getExpenseTypes();
            $scope.newCenter.desc = "";
          });

        };

        $scope.deleteExpenseType = function(id){
          if(confirm("Deleting Expenses Type Name! Are you sure?")){

            $http.post('/api/deleteExpenseType',{"_id" : id}).then(function(data){
              console.log("delete success");
              $scope.getExpenseTypes();
            });

          }
        };

        $scope.editExpenseType = function(id,desc){
          if(confirm("Editing Expenses Name! Are you sure?")){

            $http.post('/api/editExpenseType',{"_id" : id, "Desc": desc}).then(function(data){
              console.log("updated success");
              $scope.getExpenseTypes();
            });

          }
        };

        $scope.getExpenseTypes = function() {
          $http.get('/api/getExpenseType').then(function(data){
              $scope.center = data.data;
          });
        };

        $scope.getExpenseTypes();
}]);
