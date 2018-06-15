angular.module('cPCreateuser',['ngFileUpload','ui.bootstrap']);
angular.module('cPCreateuser').controller('cPCreateuserController',['$scope','$http','Upload',function($scope, $http,Upload){

        $scope.tagline = 'Add Pateint and Details!';
        $scope.newPateintSelected = [];
        $scope.newPateint = {};        
        $scope.newPateint.previousProblems = [];
	      $scope.newPateint.Email = "DEFAULT@GMAIL.COM";
        $scope.showPreviousProblems = false;  
        $scope.addAnother = true;
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
              $scope.occupation.sort(function(a, b) {
                return a.Desc > b.Desc;
              });
              $scope.occupation.sort();
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

        $scope.getCenters = function() {
          $http.get('/api/getcenter').then(function(data){            
            if (data) {
              data.data.push({"_id":"-1","Desc":"--Please Select--","__v":0});
              $scope.center = data.data;              
            }
          });
        };
        $scope.getCenters();
        $scope.newPateint.Center = {"_id":"-1","Desc":"--Please Select--","__v":0};

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
          $scope.newPateint.Treatments = $scope.newPateint.Treatments
          $scope.newPateint.Diagnosis = $scope.newPateint.Diagnosis;
          $scope.newPateint.file = $scope.file && $scope.file.name != "" ? $scope.file.name : $scope.newPateint.file;
          
          if($scope.newPateint.entryDate)
          {             
            paymentDateSet = typeof $scope.newPateint.entryDate == "string" ? new Date() : $scope.newPateint.entryDate;
            $scope.newPateint.entryDate = paymentDateSet.getDate() +"-" + (paymentDateSet.getMonth()+1) +"-" + paymentDateSet.getFullYear();
          }          
          if (!$scope.newPateint.FirstName) {
            alert("Please provide a valid name.");
            return;
          }
          if ($scope.newPateint.Mobile && $scope.newPateint.Mobile.toString().length != 10) {
            alert("Please provide a valid number.");
            return;
          }
          if ($scope.newPateint.Location && typeof $scope.newPateint.Location.Desc == "undefined") {
            alert("Please select a valid Location.");
            return;
          }          
          if ((!$scope.newPateint.Treatments || !$scope.newPateint.Treatments.length) && 
                (!$scope.newPateint.Diagnosis || !$scope.newPateint.Diagnosis.length) && 
                !$scope.newPateint.CheifComplaint) {              
              $scope.newPateint.previousProblems = [];              
              $scope.newPateint.CheifComplaint = $scope.newPateint.selectChiefComplaint;
              $scope.newPateint.Diagnosis = $scope.newPateint.selectdiagnosisId;
              $scope.newPateint.Treatments = $scope.newPateint.selecttreatmentId;
          } else {
              if (!$scope.newPateint.Treatments) {
                alert("Please select a valid Treatments.");
                return;
              }
              if (!$scope.newPateint.Diagnosis) {
                alert("Please select a valid Diagnosis.");
                return;
              }
              var treatmentsDe = $scope.newPateint.Treatments.map(a => a.Desc).toString();
              var diagnosisDe = $scope.newPateint.Diagnosis.map(a => a.Desc).toString(); 
              $scope.newPateint.previousProblems.push({
                "ChiefComplaint" : $scope.newPateint.CheifComplaint,
                "Treatments" : treatmentsDe,
                "Diagnosis" : diagnosisDe,
                "Date" : $scope.newPateint.entryDate
              });
          }
                    
          if($scope.newPateint.Email == "DEFAULT@GMAIL.COM"){
            $scope.newPateint.Email = new Date();
          }
          if ($scope.newPateint._id) {
            $http.post('/api/edituser', $scope.newPateint).then(function(data){
              console.log("updated success");
              $scope.getPatients();
              alert("Patient information has been updated successfully.");
            });            
          } else {
            $http.post('/api/createuser',$scope.newPateint).then(function(data){
              console.log("Data Saved successfully");
              $scope.getPatients();             
              alert("Patient has been added successfully.");
            });
          }
          $scope.addAnother = false;
        };

        $scope.getCommaSeparated = function(array){
          var list = [];
          if (array) {
            for (var i = 0; i < array.length; i++) {
              if (array[i] && array[i]._id != -1) {
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

        $scope.onSelect = function ($item, $model, $label) {
          $scope.$item = $item;
          $scope.$model = $model;
          $scope.$label = $label;
          $scope.editPatients($item._id);
        }

        $scope.editPatients = function(id,desc){
          if(confirm("Editing Patients Details! Are you sure?")){
            for (let index = 0; index < $scope.patient.length; index++) {
              if ($scope.patient[index]._id == id) {
                //$scope.newPateint = $scope.patient[index]
                var oldPateint = $scope.patient[index];
                $scope.newPateint._id = oldPateint._id;
                $scope.newPateint.FirstName = oldPateint.firstName;
                $scope.newPateint.LastName = oldPateint.lastName;
                $scope.newPateint.CareOfName = oldPateint.careOfName;
                $scope.newPateint.Address = oldPateint.address;
                $scope.newPateint.Mobile = oldPateint.mobile;
                $scope.newPateint.Age = oldPateint.age;
                $scope.newPateint.Email = oldPateint.email;                

                $scope.newPateint.previousProblems = oldPateint.previousComplaints && !oldPateint.previousComplaints.length
                                       ? oldPateint.previousComplaints :
                                    [{"ChiefComplaint" : oldPateint.chiefComplaints,
                                      "Treatments" : oldPateint.treatmentId.map(a => a.Desc).toString(),
                                      "Diagnosis" : oldPateint.diagnosisId.map(a => a.Desc).toString(),
                                      "Date" : oldPateint.created_at}];
                
                //$scope.previousProblems.Treatments = oldPateint.treatmentId;
                //$scope.previousProblems.Diagnosis = oldPateint.diagnosisId;
                $scope.filepreview = "img/Camera Roll/"+oldPateint.image;		
                $scope.newPateint.file = oldPateint.image;
                $scope.showPreviousProblems = true;
                var oldDate = oldPateint.created_at.split("-");
                $scope.newPateint.entryDate = new Date(oldDate[1]+"/"+oldDate[0]+"/"+oldDate[2]);                
                $scope.addAnother = true;
                $scope.newPateint.selectChiefComplaint = oldPateint.chiefComplaints;
                $scope.newPateint.selectdiagnosisId = oldPateint.diagnosisId;                
                $scope.newPateint.selecttreatmentId = oldPateint.treatmentId;
                $scope.newPateint.Location = {"_id":oldPateint.locationId[0]._id,
                                              "Desc":oldPateint.locationId[0].Desc,"__v":0};
                $scope.newPateint.Reference = {"_id":oldPateint.referenceId[0]._id,
                                              "Desc":oldPateint.referenceId[0].Desc,"__v":0};
                $scope.newPateint.Doctor = {"_id":oldPateint.doctorId[0]._id,
                                              "Desc":oldPateint.doctorId[0].Desc,"__v":0};
                $scope.newPateint.Occupation = {"_id":oldPateint.occupationId[0]._id,
                                              "Desc":oldPateint.occupationId[0].Desc,"__v":0};
                $scope.newPateint.Center = {"_id":oldPateint.centerId[0]._id,
                                              "Desc":oldPateint.centerId[0].Desc,"__v":0};                
              }             
            }
            //$scope.newPateint = $scope.patient["_id",id];
            // $http.post('/api/edituser',{"_id" : id, "Desc": desc}).then(function(data){
            //   console.log("updated success");
            //   $scope.getPatients();
            // });
          }
        };

        $scope.getPatients = function() {
          $http.get('/api/getpatients').then(function(data){
              $scope.patient = data.data;              
              });
        };

        $scope.addAnotherClick = function(){
          $scope.newPateint = {};        
          $scope.newPateint.previousProblems = [];
          $scope.showPreviousProblems = false;
          $scope.addAnother = true;
          $scope.newPateint.Gender = { name: "Male",  id:1};
          $scope.newPateint.Occupation = {"_id":"-1","Desc":"--Please Select--","__v":0};
          $scope.newPateint.Reference = {"_id":"-1","Desc":"--Please Select--","__v":0};
          $scope.newPateint.Location = {"_id":"-1","Desc":"--Please Select--","__v":0};
          $scope.newPateint.Center = {"_id":"-1","Desc":"--Please Select--","__v":0};
          $scope.newPateint.Doctor = {"_id":"-1","Desc":"--Please Select--","__v":0};
          $scope.filepreview = "";
	  $scope.newPateint.Email = "DEFAULT@GMAIL.COM";
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
