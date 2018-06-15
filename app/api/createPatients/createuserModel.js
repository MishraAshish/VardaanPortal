//below api is used to createuser which should either be a patient or doctor
// app/models/nerd.js
// grab the mongoose module
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// create a schema
var patientSchema = new Schema({
  firstName: String,
  lastName: String,
  careOfName: String,//Husband, Fathers Name
  gender:Array, // 1-Male, 2-Female, 3-Trans
  age:Number,
  mobile: Number,
  email: String,
  admin: Boolean,// will remain false
  centerId: Array,// from location table like pratap vihar/ astha etc
  locationId: Array,// from putting loacal loaction to refine search
  address: String,
  occupationId: Array,
  chiefComplaints: String, //Name of the disease -- should come from disease table
  diagnosisId: Array, //Name of the diagnosis provided -- should come from diagnosis table
  treatmentId: Array,
  referenceId: Array, // Should come from reference table -- doctor, patient, advertisement, website, self
  doctorId: Array,
  type: Number, // 1-Patient, 2-Doctor
  //img: { data: Buffer, contentType: String }, // Profile Pic of Patient
  //meta: {
    //age: Number,
    //website: String
  //},
  created_at: String,
  updated_at: String,
  //profileImage: { data: Buffer, contentType: String},
  image: String,
  previousComplaints: Array
});

// the schema is useless so far
// we need to create a model using it
var Patient = mongoose.model('patient', patientSchema);
// define our nerd model
// module.exports allows us to pass this to other files when it is called
//module.exports = mongoose.model('Nerd', {
  //  name : {type : String, default: ''}
//});
//console.log(mongoose.connection.readyState);
//if (mongoose.connection.readyState == 0) {
//  mongoose.connect('mongodb://localhost/myapp');
//  console.log("DB Connected");
//}
//console.log("DB Already Connected");
module.exports = Patient;
