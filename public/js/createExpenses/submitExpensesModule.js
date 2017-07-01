angular.module('submitExpenses',[]);

angular.module('submitExpenses').controller('submitExpensesController',['$scope','$http',function($scope, $http){

        $scope.tagline = 'Expenses submission screen is coming soon!';

        $scope.submitExpenses = function(){
          $http.post('/api/submitExpenses',$scope.newexpense).then(function(data){
            console.log("expense Saved successfully");
            $scope.getExpenses();
          });
        };

        $scope.deleteExpense = function(id){
          $http.post('/api/delExpense',{"_id" : id}).then(function(data){
            console.log("user deleted successfully");
            $scope.getExpenses();
          });
        };

        $scope.getExpenses = function(userName){
          $http.get('/api/getExpense').then(function(data){
              $scope.expenses = data.data;
          });
        };
        $scope.getExpenses();

        $scope.getExpenseTypes = function() {
          $http.get('/api/getExpenseType').then(function(data){
              //success function
              if (data) {
                data.data.push({"_id":"-1","Desc":"--Please Select--","__v":0});
                $scope.expenseType = data.data;
              }},
              function(data){
                //failure function
                if (data) {
                  data.data.push({"_id":"-1","Desc":"--Please Select--","__v":0});
                  $scope.expenseType = data.data;
                }
          });
        };
        $scope.newexpense = {};
        $scope.newexpense.ExpenseType = {"_id":"-1","Desc":"--Please Select--","__v":0};
        $scope.getExpenseTypes();
}]);
