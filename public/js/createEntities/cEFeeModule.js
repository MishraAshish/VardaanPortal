angular.module('cEFee',[]);
angular.module('cEFee').controller('cEFeeController',['$scope','$http',function($scope, $http){

        $scope.tagline = 'Add Or Update Fee/Expenses List';

        $scope.addFee = function(){
          if ($scope.newFee == null || $scope.newFee == "") {
            alert("Can't add empty value. Please type!");
            return;
          }

          $http.post('/api/createfee',$scope.newFee).then(function(data){
            console.log("Data Saved successfully");
            $scope.getFee();
            $scope.newFee.desc = "";
          });

        };

        $scope.deleteFee = function(id){
          if(confirm("Deleting Fee/Expenses! Are you sure?")){

            $http.post('/api/delfee',{"_id" : id}).then(function(data){
              console.log("delete success");
              $scope.getFee();
            });

          }
        };

        $scope.editFee = function(id,desc){
          if(confirm("Editing Fee/Expenses Name! Are you sure?")){

            $http.post('/api/editfee',{"_id" : id, "Desc": desc}).then(function(data){
              console.log("updated success");
              $scope.getFee();
            });

          }
        };

        $scope.getFee = function() {
          $http.get('/api/getfee').then(function(data){
              $scope.fee = data.data;
              $scope.fee.sort(function(a, b) {
                return a.Desc > b.Desc;
              });
              $scope.fee.sort();
          });
        };

        $scope.getFee();
    }]);
