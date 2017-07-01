angular.module('cPCreateuser',['ngFileUpload']);
angular.module('cPCreateuser').controller('cPCreateuserController',['$scope','$http','Upload',function($scope, $http,Upload){

        $scope.tagline = 'Add Pateint and Details!';
        $scope.newPateint = {};
  //    $scope.$watch('file', function(newfile, oldfile) {
  //    if(angular.equals(newfile, oldfile) ){
  //      alert("adasdas");
  //      return;
  //    }
   //
  //   //  uploadService.upload(newfile).then(function(res){
  //   //    // DO SOMETHING WITH THE RESULT!
  //   //    console.log("result", res);
  //   //  })
  //  });

        $scope.genderList = [
              { name: "Male",  id:1}, // For Male
              { name: "Female",  id:2}, // For Female
              { name: "Transgender",  id:3} // Transgender
            ];
        $scope.newPateint.Gender = { name: "Male",  id:1}; // For Male Defaulting for Male

        $scope.getOccupation = function() {
          $http.get('/api/getoccupation').then(function(data){
            //success function
            if (data) {
              data.data.push({"_id":"-1","Desc":"--Please Select--","__v":0});
              $scope.occupation = data.data;
            }},
            function(data){
              //failure function
              if (data) {
                data.data.push({"_id":"-1","Desc":"--Please Select--","__v":0});
                $scope.occupation = data.data;
              }
          });
        };
        $scope.getOccupation();
        $scope.newPateint.Occupation = {"_id":"-1","Desc":"--Please Select--","__v":0};

        $scope.getLocation = function() {
          $http.get('/api/getlocation').then(function(data){
            if (data) {
              data.data.push({"_id":"-1","Desc":"--Please Select--","__v":0});
                $scope.location = data.data;
            }
          });
        };
        $scope.getLocation();
        $scope.newPateint.Location = {"_id":"-1","Desc":"--Please Select--","__v":0};

        $scope.getComplaints = function() {
          $http.get('/api/getcheifcomplaints').then(function(data){
            if (data) {
              //data.data.push({"_id":"-1","Desc":"--Please Select--","__v":0});
              $scope.chiefComplaints = data.data;
            }
          });
        };
        $scope.getComplaints();
        //$scope.newPateint.CheifComplaint = {"_id":"-1","Desc":"--Please Select--","__v":0};

        $scope.getDiagnosis = function() {
          $http.get('/api/getdiagnosis').then(function(data){
            if(data)
              $scope.diagnosis = data.data;
          });
        };
        $scope.getDiagnosis();

        $scope.getTreatments = function() {
          $http.get('/api/gettreatments').then(function(data){
            if(data)
              $scope.treatments = data.data;
          });
        };
        $scope.getTreatments();

        $scope.getRefer = function() {
          $http.get('/api/getrefer').then(function(data){
            if (data) {
              data.data.push({"_id":"-1","Desc":"--Please Select--","__v":0});
              $scope.refer = data.data;
            }
          });
        };
        $scope.getRefer();
        $scope.newPateint.Reference = {"_id":"-1","Desc":"--Please Select--","__v":0};

        $scope.getDoctor = function() {
          $http.get('/api/getdoctor').then(function(data){
            if (data) {
              data.data.push({"_id":"-1","Desc":"--Please Select--","__v":0});
              $scope.doctor = data.data;
            }
          });
        };
        $scope.getDoctor();
        $scope.newPateint.Doctor = {"_id":"-1","Desc":"--Please Select--","__v":0};

        $scope.addPatient = function(){
          $scope.newPateint.Center = 1;
          $scope.newPateint.CheifComplaints = $scope.getCommaSeparated($scope.newPateint.CheifComplaint);
          $scope.newPateint.Treatments = $scope.getCommaSeparated($scope.newPateint.Treatments);
          $scope.newPateint.Diagnosis = $scope.getCommaSeparated($scope.newPateint.Diagnosis);
          //$scope.newPateint.file = $scope.file;
          if ($scope.file && $scope.file.size > 70000) {//68500
            alert("Please select a file of 70KB or Less.");
            return;
          }

          if (!$scope.filepreview) {
            alert("Please select a Profile Pic to upload.");
            return;
          }

          $scope.newPateint.fileData = $scope.filepreview;

          $http.post('/api/createuser',$scope.newPateint).then(function(data){
             console.log("Data Saved successfully");
             $scope.getPatients();
          });
        };

        // Below code is to convert data file to imaage not using now
        // $scope.dataURLtoFile = function (dataurl, filename) {
        //   var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        //   bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        //   while(n--){
        //     u8arr[n] = bstr.charCodeAt(n);
        //   }
        //   return new File([u8arr], filename, {type:mime});
        // }

        $scope.getCommaSeparated = function(array){
          var list = [];
          if (array) {
            for (var i = 0; i < array.length; i++) {
              if (array[i]._id != -1) {
                list.push(array[i]._id);
              }
            }
          }
          return list;
        };

        $scope.deletePatient = function(id){
          if(confirm("Deleting Patient! Are you sure?")){
            $http.post('/api/delpatients',{"_id" : id}).then(function(data){
              console.log("delete success");
              $scope.getPatients();
            });
          }
        };

        $scope.editPatients = function(id,desc){
          if(confirm("Editing Patients Details! Are you sure?")){
            $http.post('/api/edituser',{"_id" : id, "Desc": desc}).then(function(data){
              console.log("updated success");
              $scope.getPatients();
            });
          }
        };

        $scope.getPatients = function() {
          $http.get('/api/getpatients').then(function(data){
              $scope.patient = data.data;
              //debugger;
              $scope.image = $scope.patient[$scope.patient.length - 1].image;

              //Below code is to convert byte array to base64 image
              //$scope.image = btoa(String.fromCharCode.apply(null, new Uint8Array($scope.patient[$scope.patient.length - 1].profileImage.data)));
          });
        };

        $scope.getPatients();
    }]);

angular.module('cPCreateuser')
  .directive("fileinput", [function() {
      return {
        scope: {
          fileinput: "=",
          filepreview: "="
        },
        link: function(scope, element, attributes) {
          element.bind("change", function(changeEvent) {
            scope.fileinput = changeEvent.target.files[0];
            var reader = new FileReader();
            reader.onload = function(loadEvent) {
              scope.$apply(function() {
                scope.filepreview = loadEvent.target.result;
              });
            }
            reader.readAsDataURL(scope.fileinput);
          });
        }
}
}]);
