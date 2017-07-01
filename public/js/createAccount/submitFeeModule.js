angular.module('submitFee',["ui.bootstrap"]);

angular.module('submitFee').controller('submitFeeController',['$scope','$http',function($scope, $http){

        $scope.tagline = 'Fee Submission For Patients!';
        $scope.selected = undefined;
        $scope.isReplyFormOpen = false;
        $scope.showSubmittedFee = false;
        $scope.sum = 0;
        $scope.statusClass = "Credit";

        $scope.getPatients = function() {
          $http.get('/api/getpatients').then(function(data){
              $scope.patient = data.data;
              //$scope.image = $scope.patient[$scope.patient.length - 1].image;
          });
        };

        $scope.getPatients();

        $scope.getFee = function() {
          $http.get('/api/getfee').then(function(data){
            //success function
            if (data) {
              data.data.push({"_id":"-1","Desc":"--Please Select--","__v":0});
              $scope.fee = data.data;
              $scope.isReplyFormOpen = true;
              $scope.selected.feeAmount = {"_id":"-1","Desc":"--Please Select--","__v":0};
              $scope.selected.paymentMade = {"_id":"-1","Desc":"--Please Select--","__v":0};
            }},
            function(data){
              //failure function
              if (data) {
                data.data.push({"_id":"-1","Desc":"--Please Select--","__v":0});
                $scope.fee = data.data;
              }
          });
        };

        $scope.getSubmittedFee = function() {
          var submittingFeeObj = {
            patientId : $scope.selected.patientId
          };
          $http.post('/api/getsubmittedfees',submittingFeeObj).then(function(data){
            //success function
            if (data) {
              $scope.submittedFee = data.data;
              if ($scope.submittedFee && $scope.submittedFee.length > 0) {
                  $scope.showSubmittedFee = true;
                  $scope.selected.existingPatient = false;
                  var sumArr = [];
                  $scope.sum = 0;
                  for (var i = 0; i < $scope.submittedFee.length; i++) {
                    var settlementAmount = $scope.submittedFee[i].settlementAmount == undefined ? 0 : $scope.submittedFee[i].settlementAmount;
                    sumArr.push($scope.submittedFee[i].paymentMade - $scope.submittedFee[i].feeAmount + settlementAmount);
                  }
                  $scope.sum = sumArr.reduce((a, b) => a + b, 0);
                  //template replaces the complete element with its text.
                  $scope.statusClass = ($scope.sum == 0 || $scope.sum > 0 ) ? 'Credit' : 'Debit';
              }

            }},
            function(data){
              //failure function
              if (data) {
                $scope.submittedFee = data.data;
              }
          });
        };

        $scope.submitFee = function() {
          if (!$scope.selected.feeAmount.Desc || $scope.selected.feeAmount._id == -1 ||
              !$scope.selected.paymentMade.Desc || $scope.selected.paymentMade._id == -1) {
            alert("Fee Can't be Submitted. Please select a proper value!");
            return false;
          }
          var submittingFeeObj = {
            feeAmount : $scope.selected.feeAmount.Desc,
            paymentMade : $scope.selected.paymentMade.Desc,
            patientId : $scope.selected.patientId,
            settlementAmount : $scope.selected.settlementAmount,
            existingPatient : $scope.selected.existingPatient,
          };
          $http.post('/api/feesubmit',submittingFeeObj).then(function(data){
            //success function
            if (data) {
              $scope.getSubmittedFee();
            }},
            function(data){
              //failure function
              if (data) {
                console.log("error occured while getting submitted fees");
              }
          });
        };

        $scope.deletesubmitFee = function(id) {
          if(confirm("Deleting Fee Amount! Are you sure?")){
            $http.post('/api/delsubmittedfees',{"_id" : id}).then(function(data){
              console.log("delete success");
              $scope.getSubmittedFee();
            });
          }
        };

        $scope.onSelect = function ($item, $model, $label) {
          $scope.$item = $item;
          $scope.$model = $model;
          $scope.$label = $label;
          $scope.selected.image = $item.image;
          $scope.selected.patientId = $item._id;
          $scope.selected.firstName = $item.firstName;
          $scope.selected.lastName = $item.lastName;
          $scope.selected.settlementAmount = $item.settlementAmount;
          $scope.selected.mobile = $item.mobile;
          $scope.selected.existingPatient = false;
          $scope.sum = 0;
          $scope.statusClass = "Credit";
          $scope.getFee();
          $scope.getSubmittedFee();
      };
}]);
