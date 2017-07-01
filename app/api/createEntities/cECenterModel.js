//below api is used to createuser which should either be a patient or doctor
// app/api/createEntities/cEDiagnosisModel.js
// grab the mongoose module
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// create a schema
var centerSchema = new Schema({
  Desc: String
});

// the schema is useless so far
// we need to create a model using it
var CenterSchema = mongoose.model('center', centerSchema);

if (mongoose.connection.readyState == 0) {
  mongoose.connect('mongodb://localhost/myapp');
  console.log("DB Connected");
}
console.log("DB Already Connected");
module.exports = CenterSchema;