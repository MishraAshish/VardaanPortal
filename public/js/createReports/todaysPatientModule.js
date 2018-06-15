angular.module('todaysPatient',[]);

angular.module('todaysPatient').controller('todaysPatientController',['$scope','$http',function($scope, $http){

        $scope.tagline = 'Todays Patient List!';      
        $scope.todaysPatient = [];
        $scope.lastDays = 30;
        $scope.getMonthsPatients = function(){
          $scope.todaysPatient = [];          
          $http.post('/api/getLastMonthPatients',{"lastDays":$scope.lastDays}).then(function(data){
            loadPatientData(data),            
            function(data){
              //failure function
              if (data) {
                $scope.submittedFee = data.data;
              }}
          });
        };

        $scope.getTodaysSubmission = function() {          
          $http.get('/api/getTodaysSubmits').then(function(data){
            //success function            
            loadPatientData(data);
            },
            function(data){
              //failure function
              if (data) {
                $scope.submittedFee = data.data;
              }
          });
        };

        function loadPatientData(data){
          if (data) {
            $scope.submittedFee = data.data;
            var currentPatient = {};
            $scope.totalFee = 0;
            $scope.totalPayment = 0;
            $scope.morning = 0;
            $scope.evening = 0;
            $http.get('/api/getPatients').then(function(jsonData){
              $scope.patient = jsonData.data;                                
              currentPatient.paidAmount = 0;
              currentPatient.shiftTime = "";                
              for (let i = 0; i < $scope.submittedFee.length; i++) {
                const elem = $scope.submittedFee[i];
                currentPatient.paidAmount = elem.paymentMade;
                currentPatient.feeAmount = elem.feeAmount;
                currentPatient.shiftTime = elem.shift;                  
                currentPatient.date = elem.created_at;   
                currentPatient.id = elem._id;               
                for (let index = 0; index < $scope.patient.length; index++) {
                    var element = $scope.patient[index];                      
                    if (element._id == elem.patientId) {
                      currentPatient.firstName = element.firstName;
                      currentPatient.lastName = element.lastName;                      
                    }
                }                  
                $scope.todaysPatient.push(currentPatient);                                                   
                $scope.totalFee = parseInt($scope.totalFee) + parseInt(currentPatient.feeAmount);
                $scope.totalPayment = parseInt($scope.totalPayment) + parseInt(currentPatient.paidAmount);
                if (currentPatient.shiftTime == "Morning") {
                  $scope.morning = $scope.morning + 1;  
                }else{
                  $scope.evening = $scope.evening + 1;
                }               
                currentPatient = {};
              }
              console.log(JSON.stringify($scope.todaysPatient));
              $scope.totalPateint = $scope.todaysPatient.length;                
          });                        
          }
        };

        $scope.getTodaysSubmission();
}]);