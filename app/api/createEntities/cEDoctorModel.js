//below api is used to createuser which should either be a patient or doctor
// app/api/createEntities/cEDiagnosisModel.js
// grab the mongoose module
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// create a schema
var doctorSchema = new Schema({
  Desc: String
});

// the schema is useless so far
// we need to create a model using it

module.exports =  mongoose.model('doctor', doctorSchema);
