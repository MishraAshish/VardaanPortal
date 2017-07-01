// require(['d3'], function(d3) {
//     //console.log(window.d3); // undefined
//     //console.log(myd3); // d3 object
//     window.d3 = d3;
//     return d3;
// });
angular.module('viewReports',['angularCharts']);
angular.module('viewReports').controller('createreportsController',['$scope','$http',function($scope, $http){

        $scope.tagline = 'Allows to view all reports created!';

        $scope.series = [];

        $scope.chartDetails = [
              { name: "Chief Complaints",  id:1},
              { name: "Location",  id:2},
              { name: "Gender",  id:3}
            ];
        $scope.selected = {};
        $scope.selected.chartFor = { name: "Chief Complaints",  id:1}; // For Male Defaulting for Male

        $scope.getComplaints = function() {
          $http.get('/api/getcheifcomplaints').then(function(data){
            if (data) {
              //data.data.push({"_id":"-1","Desc":"--Please Select--","__v":0});
              $scope.chiefComplaints = data.data;
            }
          });
        };
        $scope.getComplaints();

        $scope.getPatients = function() {
          $http.get('/api/getpatients').then(function(data){
              $scope.patient = data.data;
              $scope.chartdata = [];
              for (var i = 0; i < $scope.chiefComplaints.length; i++) {
                $scope.series.push($scope.chiefComplaints[i].Desc);
                var dataObj = {x: $scope.chiefComplaints[i].Desc, tooltip:"", y: [] };
                var x = 0;
                for (var j = 0; j < $scope.patient.length; j++) {
                  for (var k = 0; k < $scope.patient[j].chiefComplaintsId.length; k++) {
                    if ($scope.patient[j].chiefComplaintsId[k] == $scope.chiefComplaints[i]._id) {
                        x++;
                    }
                  }
                }
                dataObj.y.push(x);
                dataObj.tooltip = $scope.chiefComplaints[i].Desc +" Total = "+x;
                $scope.chartdata.push(dataObj);
              }
              $scope.data1 = {
            		series: $scope.series,
            		data: $scope.chartdata
            	};

              $scope.chartType = 'bar';

            	$scope.config1 = {
            		labels: false,
            		title: "Products",
            		legend: {
            			display: true,
            			position: 'left'
            		},
            		innerRadius: 0
            	};
          });
        };
        $scope.getPatients();


        $scope.changeSelection = function() {
            //alert($scope.selected.chartFor.name);
            if ($scope.selected.chartFor.id == 2) {
              $scope.getLocation();
            }else {
                $scope.getPatients();
            }
        };

        $scope.getLocation = function() {
          $http.get('/api/getlocation').then(function(data){
            debugger;
            if (data) {
                $scope.location = data.data;
                $scope.chartdata = [];
                for (var i = 0; i < $scope.location.length; i++) {
                  $scope.series.push($scope.location[i].Desc);
                  var dataObj = {x: $scope.location[i].Desc, tooltip:"", y: [] };
                  var x = 0;
                  for (var j = 0; j < $scope.patient.length; j++) {
                      if ($scope.patient[j].locationId == $scope.location[i]._id) {
                          x++;
                      }
                    }
                  dataObj.y.push(x);
                  dataObj.tooltip = $scope.location[i].Desc +" Total = "+x;
                  $scope.chartdata.push(dataObj);
                }
                $scope.data1 = {
                  series: $scope.series,
                  data: $scope.chartdata
                };

                $scope.chartType = 'bar';

                $scope.config1 = {
                  labels: false,
                  title: "Products",
                  legend: {
                    display: true,
                    position: 'left'
                  },
                  innerRadius: 0
                };
            }
          });
        };
        // $scope.data1 = {
      	// 	series: $scope.series,
      	// 	data: [{
      	// 		x: "Sales",
      	// 		y: [100, 500, 0],
      	// 		tooltip: "this is tooltip"
      	// 	}, {
      	// 		x: "Not Sales",
      	// 		y: [300, 100, 100]
      	// 	}, {
      	// 		x: "Tax",
      	// 		y: [351]
      	// 	}, {
      	// 		x: "Not Tax",
      	// 		y: [54, 0, 879]
      	// 	}]
      	// };

      	// $scope.data2 = {
      	// 	series: ['<em>500</em> Keyboards', '<em>105</em> Laptops', '<em>100</em> TVs'],
      	// 	data: [{
      	// 		x: "Sales",
      	// 		y: [100, 500, 0],
      	// 		tooltip: "this is tooltip"
      	// 	}, {
      	// 		x: "Income",
      	// 		y: [300, 100, 100]
      	// 	}, {
      	// 		x: "Expense",
      	// 		y: [351, 50, 25]
      	// 	}]
      	// }

        // $scope.config2 = {
      	// 	labels: false,
      	// 	title: "HTML-enabled legend",
      	// 	legend: {
      	// 		display: true,
      	// 		htmlEnabled: true,
      	// 		position: 'right'
      	// 	},
      	// 	lineLegend: 'traditional'
      	// }

      	// $scope.chartType = 'bar';
        //
      	// $scope.config1 = {
      	// 	labels: false,
      	// 	title: "Products",
      	// 	legend: {
      	// 		display: true,
      	// 		position: 'left'
      	// 	},
      	// 	innerRadius: 0
      	// };

        // $scope.newPateint = {};
        //
        // $scope.getOccupation = function() {
        //   $http.get('/api/getoccupation').then(function(data){
        //     //success function
        //     if (data) {
        //       data.data.push({"_id":"-1","Desc":"--Please Select--","__v":0});
        //       $scope.occupation = data.data;
        //     }},
        //     function(data){
        //       //failure function
        //       if (data) {
        //         data.data.push({"_id":"-1","Desc":"--Please Select--","__v":0});
        //         $scope.occupation = data.data;
        //       }
        //   });
        // };
        // $scope.getOccupation();
        // $scope.newPateint.Occupation = {"_id":"-1","Desc":"--Please Select--","__v":0};
        //
        // $scope.getLocation = function() {
        //   $http.get('/api/getlocation').then(function(data){
        //     if (data) {
        //       data.data.push({"_id":"-1","Desc":"--Please Select--","__v":0});
        //         $scope.location = data.data;
        //     }
        //   });
        // };
        // $scope.getLocation();
        // $scope.newPateint.Location = {"_id":"-1","Desc":"--Please Select--","__v":0};
        //
        // $scope.getComplaints = function() {
        //   $http.get('/api/getcheifcomplaints').then(function(data){
        //     if (data) {
        //       //data.data.push({"_id":"-1","Desc":"--Please Select--","__v":0});
        //       $scope.chiefComplaints = data.data;
        //     }
        //   });
        // };
        // $scope.getComplaints();
        // //$scope.newPateint.CheifComplaint = {"_id":"-1","Desc":"--Please Select--","__v":0};
        //
        // $scope.getDiagnosis = function() {
        //   $http.get('/api/getdiagnosis').then(function(data){
        //     if(data)
        //       $scope.diagnosis = data.data;
        //   });
        // };
        // $scope.getDiagnosis();
        //
        // $scope.getTreatments = function() {
        //   $http.get('/api/gettreatments').then(function(data){
        //     if(data)
        //       $scope.treatments = data.data;
        //   });
        // };
        // $scope.getTreatments();
        //
        // $scope.getRefer = function() {
        //   $http.get('/api/getrefer').then(function(data){
        //     if (data) {
        //       data.data.push({"_id":"-1","Desc":"--Please Select--","__v":0});
        //       $scope.refer = data.data;
        //     }
        //   });
        // };
        // $scope.getRefer();
        // $scope.newPateint.Reference = {"_id":"-1","Desc":"--Please Select--","__v":0};
        //
        // $scope.getDoctor = function() {
        //   $http.get('/api/getdoctor').then(function(data){
        //     if (data) {
        //       data.data.push({"_id":"-1","Desc":"--Please Select--","__v":0});
        //       $scope.doctor = data.data;
        //     }
        //   });
        // };
        // $scope.getDoctor();
        // $scope.newPateint.Doctor = {"_id":"-1","Desc":"--Please Select--","__v":0};
        //
        // $scope.addPatient = function(){
        //   $scope.newPateint.Center = 1;
        //   $scope.newPateint.CheifComplaints = $scope.getCommaSeparated($scope.newPateint.CheifComplaint);
        //   $scope.newPateint.Treatments = $scope.getCommaSeparated($scope.newPateint.Treatments);
        //   $scope.newPateint.Diagnosis = $scope.getCommaSeparated($scope.newPateint.Diagnosis);
        //   //$scope.newPateint.file = $scope.file;
        //   if ($scope.file && $scope.file.size > 70000) {//68500
        //     alert("Please select a file of 70KB or Less.");
        //     return;
        //   }
        //
        //   if (!$scope.filepreview) {
        //     alert("Please select a Profile Pic to upload.");
        //     return;
        //   }
        //
        //   $scope.newPateint.fileData = $scope.filepreview;
        //
        //   debugger;
        //   $http.post('/api/createuser',$scope.newPateint).then(function(data){
        //      console.log("Data Saved successfully");
        //      $scope.getPatients();
        //   });
        // };
        //
        // $scope.getCommaSeparated = function(array){
        //   var list = [];
        //   if (array) {
        //     for (var i = 0; i < array.length; i++) {
        //       if (array[i]._id != -1) {
        //         list.push(array[i]._id);
        //       }
        //     }
        //   }
        //   return list;
        // };
        //
        // $scope.deletePatient = function(id){
        //   if(confirm("Deleting Patient! Are you sure?")){
        //     $http.post('/api/delpatients',{"_id" : id}).then(function(data){
        //       console.log("delete success");
        //       $scope.getPatients();
        //     });
        //   }
        // };
        //
        // $scope.editPatients = function(id,desc){
        //   if(confirm("Editing Patients Details! Are you sure?")){
        //     $http.post('/api/edituser',{"_id" : id, "Desc": desc}).then(function(data){
        //       console.log("updated success");
        //       $scope.getPatients();
        //     });
        //   }
        // };
        //
        // $scope.getPatients = function() {
        //   $http.get('/api/getpatients').then(function(data){
        //       $scope.patient = data.data;
        //       //debugger;
        //       $scope.image = $scope.patient[$scope.patient.length - 1].image;
        //
        //       //Below code is to convert byte array to base64 image
        //       //$scope.image = btoa(String.fromCharCode.apply(null, new Uint8Array($scope.patient[$scope.patient.length - 1].profileImage.data)));
        //   });
        // };
        //
        // $scope.getPatients();
    }]);
