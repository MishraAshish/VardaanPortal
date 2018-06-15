//This controller is used to export API's related to Doctor Creation
//console.log(__base+'app/api/createEntities/cEDoctorModel');


var DoctorController = {
    
    get_allDoctors :  function(req, res) {
        //res.send("unable to get doctor"); 
        var DoctorModel = require(__base+'app/api/createEntities/cEDoctorModel');
        console.log("Get all doctors");
        DoctorModel.find(function(err, doctor) {
        // if there is an error retrieving, send the error.
        // nothing after res.send(err) will execute
        console.log("doctor" + doctor);
        if (err)
        res.send(err);

        //   res.send(doctor);
        res.json(doctor); // return all nerds in JSON format
      });       
    },

    save_doctor : function(req, res) {
        var DoctorModel = require(__base+'app/api/createEntities/cEDoctorModel');
        console.log(req.body.desc);
        var DoctorModel = new DoctorModel({
        Desc: req.body.desc
        });

        DoctorModel.save(function(err) {
        console.log(err);
        if (err) {
            res.send(err);
            return;
        };

        res.send("Doctor Saved!");
        console.log('Data saved successfully!');
        });
    },
    make_httpCall : function(req, res) {
        var Client = require('node-rest-client').Client; 
        var client = new Client();
        client.get('http://localhost:8080/api/doctors', function (data, response) {
        // parsed response body as js object         
        console.log(data);        
        //console.log(response);        
        res.json(data); 
    });
    }
}

module.exports = DoctorController;