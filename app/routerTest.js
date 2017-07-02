var express = require('express');
var router = express.Router();

// Doctor API's
  var doctorController = require("./api/createEntities/cEDoctorController");
  // -- api/createdoctor
  router.post('/createdoctor',doctorController.save_doctor);
  
  // -- api/getdoctor  
  router.get('/getdoctor', doctorController.make_httpCall);

  router.get('/doctors', doctorController.get_allDoctors);
  //router.post('/makehttp', doctorController.make_httpCall);

  module.exports = router;