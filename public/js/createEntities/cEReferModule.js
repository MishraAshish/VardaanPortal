angular.module('cERefer',[]);
angular.module('cERefer').controller('cEReferController',['$scope','$http',function($scope, $http){

        $scope.tagline = 'Add Or Update Reference List';

        $scope.addRefer = function(){
          if ($scope.newRefer == null || $scope.newRefer == "") {
            alert("Can't add empty value. Please type!");
            return;
          }

          $http.post('/api/createrefer',$scope.newRefer).then(function(data){
            console.log("Data Saved successfully");
            $scope.getRefer();
            $scope.newRefer.desc = "";
          });

        };

        $scope.deleteRefer = function(id){
          if(confirm("Deleting Reference Name! Are you sure?")){

            $http.post('/api/delrefer',{"_id" : id}).then(function(data){
              console.log("delete success");
              $scope.getRefer();
            });

          }
        };

        $scope.editRefer = function(id,desc){
          if(confirm("Editing Reference Name! Are you sure?")){

            $http.post('/api/editrefer',{"_id" : id, "Desc": desc}).then(function(data){
              console.log("updated success");
              $scope.getRefer();
            });

          }
        };

        $scope.getRefer = function() {
          $http.get('/api/getrefer').then(function(data){
              $scope.refer = data.data;
          });
        };

        $scope.getRefer();
    }]);
