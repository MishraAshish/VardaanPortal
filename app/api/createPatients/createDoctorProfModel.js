var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// create a schema
var createDoctorProfSchema = new Schema({
  name: String,  
  mobile: String,
  timing: String,
  days: String,
  address: String,
  qualification: String,
  created_at: String,
  updated_at: String
});

var DoctorProf = mongoose.model('doctorProf', createDoctorProfSchema);
module.exports = DoctorProf;
