//below api is used to createuser which should either be a patient or doctor
// app/api/createEntities/cEDiagnosisModel.js
// grab the mongoose module
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// create a schema
var treatmentsSchema = new Schema({
  Desc: String
});

// the schema is useless so far
// we need to create a model using it
var TreatmentsSchema = mongoose.model('treatments', treatmentsSchema);

if (mongoose.connection.readyState == 0) {
  mongoose.connect('mongodb://localhost/myapp');
  console.log("DB Connected");
}
console.log("DB Already Connected");
module.exports = TreatmentsSchema;
