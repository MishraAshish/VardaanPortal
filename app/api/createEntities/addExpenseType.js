//below api is used to createuser which should either be a patient or doctor
// app/api/createEntities/cEDiagnosisModel.js
// grab the mongoose module
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// create a schema
var addExpenseTypeSchema = new Schema({
  Desc: String
});

// the schema is useless so far
// we need to create a model using it
var ExpenseTypeSchema = mongoose.model('expenseType', addExpenseTypeSchema);

//if (mongoose.connection.readyState == 0) {
//  mongoose.connect('mongodb://localhost/myapp');
//  console.log("DB Connected");
//}
//console.log("DB Already Connected");
module.exports = ExpenseTypeSchema;
