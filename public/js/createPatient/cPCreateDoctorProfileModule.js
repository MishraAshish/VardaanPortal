angular.module('cPCreateDoctorProfile',[]);
angular.module('cPCreateDoctorProfile').controller('cPCreateDoctorProfileController', ['$scope', '$http', function ($scope, $http) {

  $scope.tagline = 'Add Doctor and Details!';
  $scope.newDoctorProfile = {};

  $scope.addDoctorProf = function () {
    if (!$scope.newDoctorProfile.Name) {
      alert("Please provide a valid name.");
      return;
    }
    // if ($scope.newPateint.Mobile && $scope.newPateint.Mobile.toString().length != 10) {
    //   alert("Please provide a valid number.");
    //   return;
    // }

    $http.post('/api/createdocprofile', $scope.newDoctorProfile).then(function (data) {
      console.log("Data Saved successfully");
      $scope.getnewDoctorProfile();
      alert("Doctor has been added successfully.");
    });
  }

  $scope.deleteDocProf = function (id) {
    if (confirm("Deleting Patient! Are you sure?")) {
      $http.post('/api/deldoctorProf', { "_id": id }).then(function (data) {
        console.log("delete success");
        $scope.getnewDoctorProfile();
      });
    }
  };

  $scope.getnewDoctorProfile = function () {
    $http.get('/api/getdoctorprof').then(function (data) {
      $scope.patient = data.data;
    });
  };

  $scope.getnewDoctorProfile();
}]);