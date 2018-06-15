//below api is used to createuser which should either be a patient or doctor
// app/models/nerd.js
// grab the mongoose module
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// create a schema
var cheifComplaintsSchema = new Schema({
  Desc: String
});

// the schema is useless so far
// we need to create a model using it
var CheifComplaints = mongoose.model('cheifComplaints', cheifComplaintsSchema);
// define our nerd model
// module.exports allows us to pass this to other files when it is called
//module.exports = mongoose.model('Nerd', {
  //  name : {type : String, default: ''}
//});

//if (mongoose.connection.readyState == 0) {
//  mongoose.connect('mongodb://localhost/myapp');
//  console.log("DB Connected");
//}
//console.log("DB Already Connected");
module.exports = CheifComplaints;
