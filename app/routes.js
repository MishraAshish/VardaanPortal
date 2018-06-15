// app/routes.js


module.exports = function(app) {

  // server routes ===========================================================
  // handle things like api calls
  // authentication routes  
  /*API's for Entities To Create(Add)/Edit/Delete - Patients And Its Data etc*/

  //API - /api/createuser
  app.post('/api/createuser', function(req, res) {
    var Patient = require('./api/createPatients/createuserModel');
    // use mongoose to get all nerds in the database
    console.log(JSON.stringify(req.body));
    var today = new Date();
    var dateString = today.getDate() +"-" + (today.getMonth()+1) +"-" + today.getFullYear() ;//+ " : " + today.toTimeString();
    var patient = new Patient({
      firstName: req.body.FirstName,
      lastName: req.body.LastName,
      careOfName:req.body.CareOfName,
      gender:req.body.Gender, // 1-Male, 2-Female, 3-Trans
      age:req.body.Age,
      mobile: req.body.Mobile,
      email: req.body.Email,
      admin: false,//req.body.admin,// will remain false
      centerId:req.body.Center,
      address: req.body.Address,
      locationId: req.body.Location,// from location table like pratap vihar/ astha etc
      chiefComplaints: req.body.CheifComplaint, //Name of the disease -- should come from disease table
      diagnosisId: req.body.Diagnosis, //Name of the diagnosis provided -- should come from diagnosis table
      treatmentId: req.body.Treatments,
      occupationId: req.body.Occupation,
      referenceId: req.body.Reference, // Should come from reference table -- doctor, patient, advertisement, website, self
      doctorId: req.body.Doctor,
      type: req.body.type, // 1-Patient, 2-Doctor
      created_at: req.body.entryDate ? req.body.entryDate : dateString,
      updated_at: dateString,
      image:req.body.file,
      previousComplaints : req.body.previousProblems
    });

    // Below code to read from folder and convert to buffer (Array or Bytes)
    //var fs = require('fs');
    // var myImage = {
    //   data : fs.readFileSync(req.body.imgPath),
    //   contentType : 'image/png'
    // }
    //console.log(__dirname+"/img/Test.png");
    //var d = fs.readFileSync(__dirname+"/img/Test.png");
    //var d = fs.readFileSync(__dirname+"/img/Ashish.png");
    //console.log(req.body.fileData);
    //patient.profileImage.data = req.body.fileData;
    //patient.profileImage.contentType = "image/png";//req.body.file.type"";
    //console.log(patient);

    patient.save(function(err) {
      if (err){
        console.log("Getting Error "+err);
        res.send(err);
        return;
      }

      console.log('patient saved successfully!');
      res.send("Patient Saved!");
    });
  });

  // -- api/getpatients
  app.get('/api/getpatients', function(req, res) {
    var Patient = require('./api/createPatients/createuserModel');
    Patient.find(function(err, patients) {
      // if there is an error retrieving, send the error.
      // nothing after res.send(err) will execute
      if (err){
        res.send(err);
        return;
      }

      //console.log(patients);
      res.json(patients); // return all nerds in JSON format
    });
  });

  // --api/delpatients
  app.post('/api/delpatients', function(req, res) {
    console.log(req.body);
    var Patient = require('./api/createPatients/createuserModel');
    Patient.findOneAndRemove(req.body, function(err, patient) {
      if (err){
        res.send(err);
        return;
      }
      if (patient == null) {
          res.send("Can't be deleted!");
          return;
      };
      // delete him
      patient.remove(function(err) {
        if (err) {
          res.send(err);
          return;
        };

        console.log('Patient successfully deleted!');
        res.send(patient);
        return;
      });
    });
  });

  // --api/editpatient
  app.post('/api/edituser', function(req, res) {
    console.log(req.body);
    var Patient = require('./api/createPatients/createuserModel');
    Patient.findById(req.body._id, function(err, patient) {
      if (err) {
        res.send(err);
        return;
      };

      if (patient == null) {
          res.send("Can't be edited!");
          return;
      };
      
      var today = new Date();
      var dateString = today.getDate() +"-" + (today.getMonth()+1) +"-" + today.getFullYear() ;//+ " : " + today.toTimeString();
      
      patient.lastName = req.body.LastName;
      patient.firstName = req.body.FirstName;
      patient.careOfName = req.body.CareOfName;
      patient.gender = req.body.Gender; // 1-Male, 2-Female, 3-Trans
      patient.age = req.body.Age;
      patient.mobile = req.body.Mobile;
      patient.email = req.body.Email;
      patient.admin = false;//req.body.admin,// will remain false
      patient.centerId= req.body.Center;
      patient.address= req.body.Address;
      patient.locationId= req.body.Location;// from location table like pratap vihar/ astha etc
      patient.chiefComplaints= req.body.CheifComplaint; //Name of the disease -- should come from disease table
      patient.diagnosisId= req.body.Diagnosis; //Name of the diagnosis provided -- should come from diagnosis table
      patient.treatmentId= req.body.Treatments;
      patient.occupationId= req.body.Occupation;
      patient.referenceId= req.body.Reference; // Should come from reference table -- doctor, patient, advertisement, website, self
      patient.doctorId= req.body.Doctor;
      patient.type= req.body.type; // 1-Patient, 2-Doctor
      patient.created_at = req.body.entryDate ? req.body.entryDate : dateString,
      patient.updated_at = dateString,      
      patient._id=req.body._id;
      patient.image=req.body.file;
      patient.previousComplaints = req.body.previousProblems;
      // save patient.the user
      patient.save(function(err) {
        //if (err) throw err;
        if (err) {
          res.send(err);
          return;
        };

        console.log('Patient successfully updated!');
        res.send(patient);
        return;
      });
    });
  });
  /*Pateint API's Ends*/

  //API - /api/createDocProfile
  app.post('/api/createdocprofile', function(req, res) {
    var Patient = require('./api/createPatients/createDoctorProfModel');
    // use mongoose to get all nerds in the database
    console.log(JSON.stringify(req.body));
    var today = new Date();
    var dateString = today.getDate() +"-" + (today.getMonth()+1) +"-" + today.getFullYear() ;//+ " : " + today.toTimeString();
    var patient = new Patient({
      name: req.body.Name,  
      mobile: req.body.Mobile,
      timing: req.body.Timings,
      days: req.body.Days,
      address: req.body.Address,
      qualification: req.body.Qualification,  
      created_at: req.body.entryDate ? req.body.entryDate : dateString,
      updated_at: dateString      
    });
    patient.save(function(err) {
      if (err){
        console.log("Getting Error "+err);
        res.send(err);
        return;
      }

      console.log('Doctor Profile saved successfully!');
      res.send("Doctor Saved!");
    });
  });

  // -- api/doctorProfile
  app.get('/api/getdoctorprof', function(req, res) {
    var Patient = require('./api/createPatients/createDoctorProfModel');
    Patient.find(function(err, patients) {
      // if there is an error retrieving, send the error.
      // nothing after res.send(err) will execute
      if (err){
        res.send(err);
        return;
      }

      //console.log(patients);
      res.json(patients); // return all nerds in JSON format
    });
  });

  // --api/deldoctorProfile
  app.post('/api/deldoctorProf', function(req, res) {
    console.log(req.body);
    var Patient = require('./api/createPatients/createDoctorProfModel');
    Patient.findOneAndRemove(req.body, function(err, patient) {
      if (err){
        res.send(err);
        return;
      }
      if (patient == null) {
          res.send("Can't be deleted!");
          return;
      };
      // delete him
      patient.remove(function(err) {
        if (err) {
          res.send(err);
          return;
        };

        console.log('Patient successfully deleted!');
        res.send(patient);
        return;
      });
    });
  });

  // --api/editpatient
  app.post('/api/editDoctorProf', function(req, res) {
    console.log(req.body);
    var Patient = require('./api/createPatients/createDoctorProfModel');
    Patient.findById(req.body._id, function(err, patient) {
      if (err) {
        res.send(err);
        return;
      };

      if (patient == null) {
          res.send("Can't be edited!");
          return;
      };
      
      var today = new Date();
      var dateString = today.getDate() +"-" + (today.getMonth()+1) +"-" + today.getFullYear() ;//+ " : " + today.toTimeString();
      
      patient.name = req.body.Name,     
      patient.mobile = req.body.Mobile,      
      patient.timing = req.body.Timing,
      patient.days =req.body.Days,
      patient.age =req.body.Address,
      patient.created_at = req.body.entryDate ? req.body.entryDate : dateString,
      patient.updated_at = dateString,      
      patient._id=req.body._id;      
      // save patient.the user
      patient.save(function(err) {
        //if (err) throw err;
        if (err) {
          res.send(err);
          return;
        };

        console.log('DoctorProfile successfully updated!');
        res.send(patient);
        return;
      });
    });
  });
  /*DoctorProfile API's Ends*/


  /*API's for Accounts to add Fees for the Patient Add/Edit/Delete*/
  // -- apifeesubmit
  app.post('/api/feesubmit', function(req, res) {
    var FeesSubmit = require('./api/createAccounts/feesubmitModel');
    var today = new Date();
    var dateString = today.getDate() +"-" + (today.getMonth()+1) +"-" + today.getFullYear();
    
    console.log(req.body);
    var FeesSubmit = new FeesSubmit({
      feeAmount : req.body.feeAmount,
      paymentMade : req.body.paymentMade,
      patientId : req.body.patientId,
      existingPatient : req.body.existingPatient,
      settlementAmount : req.body.settlementAmount,
      created_at : req.body.paymentDate ? req.body.paymentDate : dateString,
      updated_at : dateString,
      shift: req.body.shift
    });

    FeesSubmit.save(function(err) {
      if (err) {
        res.send(err);
        return;
      };

      res.send("Fee Details Saved!");
      console.log('Fee Submitted successfully!');
    });
  });

  app.post('/api/getLastMonthPatients', function(req, res) {
    var FeesSubmit = require('./api/createAccounts/feesubmitModel');        
    var lastDays = isNaN(req.body.lastDays) ? 30 : parseInt(req.body.lastDays);        
    var today = new Date();
    var lastDate = new Date(today.getTime() - (lastDays * 24 * 60 * 60 * 1000));
    var dateString = today.getDate() +"-" + (today.getMonth()+1) +"-" + today.getFullYear();    
    var ltdateString = lastDate.getDate() +"-" + (lastDate.getMonth()+1) +"-" + lastDate.getFullYear();    
    console.log("patients" + dateString);
    console.log("patients" + ltdateString);
    FeesSubmit.find({created_at : { $gt: dateString, $lt:ltdateString }}).exec(function(err, patients) {      
      if (err)
      res.send(err);

      res.json(patients); // return all nerds in JSON format
    });
  });

  app.get('/api/getTodaysSubmits', function(req, res) {
    var FeesSubmit = require('./api/createAccounts/feesubmitModel');
    var today = new Date();
    var dateString = today.getDate() +"-" + (today.getMonth()+1) +"-" + today.getFullYear();
    FeesSubmit.find({created_at : dateString},function(err, feesSubmits) {    
      console.log("feessa" + feesSubmits);
      if (err)
      res.send(err);

      res.json(feesSubmits); // return all nerds in JSON format
    });
  });

  // -- api/getsubmittedfees
  app.post('/api/getsubmittedfees', function(req, res) {
    var FeesSubmit = require('./api/createAccounts/feesubmitModel');
    //Patient.find(function(err, patients) {
    FeesSubmit.find({patientId : req.body.patientId},function(err, feesSubmits) {
      // if there is an error retrieving, send the error.
      // nothing after res.send(err) will execute
      console.log(feesSubmits);
      if (err)
      res.send(err);

      res.json(feesSubmits); // return all nerds in JSON format
    });
  });

  // --api/delsubmittedfees
  app.post('/api/delsubmittedfees', function(req, res) {
    console.log(req.body);
    var FeesSubmit = require('./api/createAccounts/feesubmitModel');
    FeesSubmit.findOneAndRemove(req.body, function(err, feesSubmits) {
      if (err){
        res.send(err);
        return;
      }
      if (feesSubmits == null) {
          res.send("Can't be deleted!");
          return;
      };
      // delete him
      feesSubmits.remove(function(err) {
        if (err) {
          res.send(err);
          return;
        };

        console.log('feesSubmits successfully deleted!');
        res.send(feesSubmits);
        return;
      });
    });
  });

  // --api/editfeessubmits
  app.post('/api/editfeessubmits', function(req, res) {
    console.log(req.body);
    var FeesSubmit = require('./api/createAccounts/feesubmitModel');
    FeesSubmit.findById(req.body._id, function(err, feesSubmits) {
    if (err) {
        res.send(err);
        return;
      };

      if (feesSubmits == null) {
          res.send("Can't be edited!");
          return;
      };

      feesSubmits.feeAmount = req.body.Amount;
      // save the user
      feesSubmits.save(function(err) {
        //if (err) throw err;
        if (err) {
          res.send(err);
          return;
        };

        console.log('feesSubmits successfully updated!');
        res.send(feesSubmits);
        return;
      });
    });
  });

  // Diagnosis API's
  // -- api/creatediagnosis
  // app.post('/api/creatediagnosis', function(req, res) {
  //   var Diagnosis = require('./api/createEntities/cEDiagnosisModel');
  //   console.log(req.body.desc);
  //   var Diagnosis = new Diagnosis({
  //     Desc: req.body.desc
  //   });
  //
  //   Diagnosis.save(function(err) {
  //     if (err) {
  //       res.send(err);
  //       return;
  //     };
  //
  //     res.send("Diagnosis Saved!");
  //     console.log('Data saved successfully!');
  //   });
  // });

  // ExpenseType API's
  // -- api/submitExpenses
  app.post('/api/submitExpenses', function(req, res) {
    var ExpenseSubmit = require('./api/createAccounts/expensesubmitModel');
    console.log(req.body.desc);
    var today = new Date();
    var dateString = today.getDate() +"-" + (today.getMonth()+1) +"-" + today.getFullYear();

    var expense = new ExpenseSubmit({
      expenseAmount : req.body.ExpenseAmount,
      userID : req.body.userID,
      expensesTypeID : req.body.ExpenseType.expensesTypeID,
      created_at : dateString,
      updated_at : dateString
    });

    expense.save(function(err) {
      if (err) {
        res.send(err);
        return;
      };

      res.send("Expense Saved!");
      console.log('Data saved successfully!');
    });
  });

  // -- api/getExpense
  app.get('/api/getExpense', function(req, res) {
    var ExpenseSubmit = require('./api/createAccounts/expensesubmitModel');
    ExpenseSubmit.find(function(err, center) {
      // if there is an error retrieving, send the error.
      // nothing after res.send(err) will execute
      if (err)
      res.send(err);

      res.json(center); // return all nerds in JSON format
    });
  });

  // --api/delExpense
  app.post('/api/delExpense', function(req, res) {
    console.log(req.body);
    var ExpenseSubmit = require('./api/createAccounts/expensesubmitModel');
    ExpenseSubmit.findOneAndRemove(req.body, function(err, center) {
      if (err){
        res.send(err);
        return;
      }
      if (center == null) {
          res.send("Can't be deleted!");
          return;
      };
      // delete him
      center.remove(function(err) {
        if (err) {
          res.send(err);
          return;
        };

        console.log('expense successfully deleted!');
        res.send(center);
        return;
      });
    });
  });

  // --api/editcenter
  app.post('/api/editExpenseSubmit', function(req, res) {
    console.log(req.body);
    var ExpenseSubmit = require('./api/createAccounts/expensesubmitModel');
    ExpenseSubmit.findById(req.body._id, function(err, center) {
      if (err) {
        res.send(err);
        return;
      };

      if (center == null) {
          res.send("Can't be edited!");
          return;
      };

      center.Desc = req.body.Desc;
      // save the user
      center.save(function(err) {
        //if (err) throw err;
        if (err) {
          res.send(err);
          return;
        };

        console.log('expense submit successfully updated!');
        res.send(center);
        return;
      });
    });
  });


  // ExpenseType API's
  // -- api/addExpenseType
  app.post('/api/createExpenseType', function(req, res) {
    var ExpenseType = require('./api/createEntities/addExpenseType');
    console.log(req.body.desc);
    var expenseType = new ExpenseType({
      Desc: req.body.desc
    });

    expenseType.save(function(err) {
      if (err) {
        res.send(err);
        return;
      };

      res.send("Expense Type Saved!");
      console.log('Data saved successfully!');
    });
  });

  // -- api/getcenter
  app.get('/api/getExpenseType', function(req, res) {
    var ExpenseType = require('./api/createEntities/addExpenseType');
    ExpenseType.find(function(err, center) {
      // if there is an error retrieving, send the error.
      // nothing after res.send(err) will execute
      if (err)
      res.send(err);

      res.json(center); // return all nerds in JSON format
    });
  });

  // --api/delcenter
  app.post('/api/deleteExpenseType', function(req, res) {
    console.log(req.body);
    var ExpenseType = require('./api/createEntities/addExpenseType');
    ExpenseType.findOneAndRemove(req.body, function(err, center) {
      if (err){
        res.send(err);
        return;
      }
      if (center == null) {
          res.send("Can't be deleted!");
          return;
      };
      // delete him
      center.remove(function(err) {
        if (err) {
          res.send(err);
          return;
        };

        console.log('center successfully deleted!');
        res.send(center);
        return;
      });
    });
  });

  // --api/editcenter
  app.post('/api/editExpenseType', function(req, res) {
    console.log(req.body);
    var ExpenseType = require('./api/createEntities/addExpenseType');
    ExpenseType.findById(req.body._id, function(err, center) {
      if (err) {
        res.send(err);
        return;
      };

      if (center == null) {
          res.send("Can't be edited!");
          return;
      };

      center.Desc = req.body.Desc;
      // save the user
      center.save(function(err) {
        //if (err) throw err;
        if (err) {
          res.send(err);
          return;
        };

        console.log('center successfully updated!');
        res.send(center);
        return;
      });
    });
  });


  /*API's for Entities To Create(Add)/Edit/Delete - CheifComplaints, Doctors, etc*/

  // -- api/createcheifcomplaints
  app.post('/api/createcheifcomplaints', function(req, res) {
    var CheifComplaints = require('./api/createEntities/cECheifComplaintsModel');
    console.log(req.body.desc);
    var CheifComplaints = new CheifComplaints({
      Desc: req.body.desc
    });

    CheifComplaints.save(function(err) {
      if (err) {
        res.send(err);
        return;
      };

      res.send("Cheif Complaints Saved!");
      console.log('CheifComplaints saved successfully!');
    });
  });

  // -- api/getcheifcomplaints
  app.get('/api/getcheifcomplaints', function(req, res) {
    var CheifComplaints = require('./api/createEntities/cECheifComplaintsModel');
    CheifComplaints.find(function(err, cheifComplaints) {
      // if there is an error retrieving, send the error.
      // nothing after res.send(err) will execute
      if (err)
      res.send(err);

      res.json(cheifComplaints); // return all nerds in JSON format
    });
  });

  // --api/delcheifcomplaints
  app.post('/api/delcheifcomplaints', function(req, res) {
    console.log(req.body);
    var CheifComplaints = require('./api/createEntities/cECheifComplaintsModel');
    CheifComplaints.findOneAndRemove(req.body, function(err, cheifComplaints) {
      if (err){
        res.send(err);
        return;
      }
      if (cheifComplaints == null) {
          res.send("Can't be deleted!");
          return;
      };
      // delete him
      cheifComplaints.remove(function(err) {
        if (err) {
          res.send(err);
          return;
        };

        console.log('CheifComplaints successfully deleted!');
        res.send(cheifComplaints);
        return;
      });
    });
  });

  // --api/editcheifcomplaints
  app.post('/api/editcheifcomplaints', function(req, res) {
    console.log(req.body);
    var CheifComplaints = require('./api/createEntities/cECheifComplaintsModel');
    CheifComplaints.findById(req.body._id, function(err, cheifComplaints) {
    if (err) {
        res.send(err);
        return;
      };

      if (cheifComplaints == null) {
          res.send("Can't be edited!");
          return;
      };

      cheifComplaints.Desc = req.body.Desc;
      // save the user
      cheifComplaints.save(function(err) {
        //if (err) throw err;
        if (err) {
          res.send(err);
          return;
        };

        console.log('CheifComplaints successfully updated!');
        res.send(cheifComplaints);
        return;
      });
    });
  });

  // Diagnosis API's
  // -- api/creatediagnosis
  app.post('/api/creatediagnosis', function(req, res) {
    var Diagnosis = require('./api/createEntities/cEDiagnosisModel');
    console.log(req.body.desc);
    var Diagnosis = new Diagnosis({
      Desc: req.body.desc
    });

    Diagnosis.save(function(err) {
      if (err) {
        res.send(err);
        return;
      };

      res.send("Diagnosis Saved!");
      console.log('Data saved successfully!');
    });
  });

  // -- api/getdiagnosis
  app.get('/api/getdiagnosis', function(req, res) {
    var Diagnosis = require('./api/createEntities/cEDiagnosisModel');
    Diagnosis.find(function(err, diagnosis) {
      // if there is an error retrieving, send the error.
      // nothing after res.send(err) will execute
      if (err)
      res.send(err);

      res.json(diagnosis); // return all nerds in JSON format
    });
  });

  // --api/deldiagnosis
  app.post('/api/deldiagnosis', function(req, res) {
    console.log(req.body);
    var Diagnosis = require('./api/createEntities/cEDiagnosisModel');
    Diagnosis.findOneAndRemove(req.body, function(err, diagnosis) {
      if (err){
        res.send(err);
        return;
      }
      if (diagnosis == null) {
          res.send("Can't be deleted!");
          return;
      };
      // delete him
      diagnosis.remove(function(err) {
        if (err) {
          res.send(err);
          return;
        };

        console.log('diagnosis successfully deleted!');
        res.send(diagnosis);
        return;
      });
    });
  });

  // --api/editdiagnosis
  app.post('/api/editdiagnosis', function(req, res) {
    console.log(req.body);
    var Diagnosis = require('./api/createEntities/cEDiagnosisModel');
    Diagnosis.findById(req.body._id, function(err, diagnosis) {
      if (err) {
        res.send(err);
        return;
      };

      if (diagnosis == null) {
          res.send("Can't be edited!");
          return;
      };

      diagnosis.Desc = req.body.Desc;
      // save the user
      diagnosis.save(function(err) {
        //if (err) throw err;
        if (err) {
          res.send(err);
          return;
        };

        console.log('diagnosis successfully updated!');
        res.send(diagnosis);
        return;
      });
    });
  });

  // Treatments API's
  // -- api/createtreatments
  app.post('/api/createtreatments', function(req, res) {
    var Treatments = require('./api/createEntities/cETreatmentsModel');
    console.log(req.body.desc);
    var Treatments = new Treatments({
      Desc: req.body.desc
    });

    Treatments.save(function(err) {
      if (err) {
        res.send(err);
        return;
      };

      res.send("Treatments Saved!");
      console.log('Data saved successfully!');
    });
  });

  // -- api/gettreatments
  app.get('/api/gettreatments', function(req, res) {
    var Treatments = require('./api/createEntities/cETreatmentsModel');
    Treatments.find(function(err, treatments) {
      // if there is an error retrieving, send the error.
      // nothing after res.send(err) will execute
      if (err)
      res.send(err);

      res.json(treatments); // return all nerds in JSON format
    });
  });

  // --api/deltreatments
  app.post('/api/deltreatments', function(req, res) {
    console.log(req.body);
    var Treatments = require('./api/createEntities/cETreatmentsModel');
    Treatments.findOneAndRemove(req.body, function(err, treatments) {
      if (err){
        res.send(err);
        return;
      }
      if (treatments == null) {
          res.send("Can't be deleted!");
          return;
      };
      // delete him
      treatments.remove(function(err) {
        if (err) {
          res.send(err);
          return;
        };

        console.log('treatments successfully deleted!');
        res.send(treatments);
        return;
      });
    });
  });

  // --api/edittreatments
  app.post('/api/edittreatments', function(req, res) {
    console.log(req.body);
    var Treatments = require('./api/createEntities/cETreatmentsModel');
    Treatments.findById(req.body._id, function(err, treatments) {
      if (err) {
        res.send(err);
        return;
      };

      if (treatments == null) {
          res.send("Can't be edited!");
          return;
      };

      treatments.Desc = req.body.Desc;
      // save the user
      treatments.save(function(err) {
        //if (err) throw err;
        if (err) {
          res.send(err);
          return;
        };

        console.log('Treatments successfully updated!');
        res.send(treatments);
        return;
      });
    });
  });

  // Occupation API's
  // -- api/createoccupation
  app.post('/api/createoccupation', function(req, res) {
    var Occupation = require('./api/createEntities/cEOccupationModel');
    console.log(req.body.desc);
    var Occupation = new Occupation({
      Desc: req.body.desc
    });

    Occupation.save(function(err) {
      if (err) {
        res.send(err);
        return;
      };

      res.send("Occupation Saved!");
      console.log('Data saved successfully!');
    });
  });

  // -- api/getoccupation
  app.get('/api/getoccupation', function(req, res) {
    var Occupation = require('./api/createEntities/cEOccupationModel');
    Occupation.find(function(err, occupation) {
      // if there is an error retrieving, send the error.
      // nothing after res.send(err) will execute
      if (err)
      res.send(err);

      res.json(occupation); // return all nerds in JSON format
    });
  });

  // --api/deloccupation
  app.post('/api/deloccupation', function(req, res) {
    console.log(req.body);
    var Occupation = require('./api/createEntities/cEOccupationModel');
    Occupation.findOneAndRemove(req.body, function(err, occupation) {
      if (err){
        res.send(err);
        return;
      }
      if (occupation == null) {
          res.send("Can't be deleted!");
          return;
      };
      // delete him
      occupation.remove(function(err) {
        if (err) {
          res.send(err);
          return;
        };

        console.log('occupation successfully deleted!');
        res.send(occupation);
        return;
      });
    });
  });

  // --api/editoccupation
  app.post('/api/editoccupation', function(req, res) {
    console.log(req.body);
    var Occupation = require('./api/createEntities/cEOccupationModel');
    Occupation.findById(req.body._id, function(err, occupation) {
      if (err) {
        res.send(err);
        return;
      };

      if (occupation == null) {
          res.send("Can't be edited!");
          return;
      };

      occupation.Desc = req.body.Desc;
      // save the user
      occupation.save(function(err) {
        //if (err) throw err;
        if (err) {
          res.send(err);
          return;
        };

        console.log('occupation successfully updated!');
        res.send(occupation);
        return;
      });
    });
  });

  // Location API's
  // -- api/createlocation
  app.post('/api/createlocation', function(req, res) {
    var Location = require('./api/createEntities/cELocationModel');
    console.log(req.body.desc);
    var Location = new Location({
      Desc: req.body.desc
    });

    Location.save(function(err) {
      if (err) {
        res.send(err);
        return;
      };

      res.send("Location Saved!");
      console.log('Data saved successfully!');
    });
  });

  // -- api/getlocation
  app.get('/api/getlocation', function(req, res) {
    var Location = require('./api/createEntities/cELocationModel');
    Location.find(function(err, location) {
      // if there is an error retrieving, send the error.
      // nothing after res.send(err) will execute
      if (err)
      res.send(err);

      res.json(location); // return all nerds in JSON format
    });
  });

  // --api/dellocation
  app.post('/api/dellocation', function(req, res) {
    console.log(req.body);
    var Location = require('./api/createEntities/cELocationModel');
    Location.findOneAndRemove(req.body, function(err, location) {
      if (err){
        res.send(err);
        return;
      }
      if (location == null) {
          res.send("Can't be deleted!");
          return;
      };
      // delete him
      location.remove(function(err) {
        if (err) {
          res.send(err);
          return;
        };

        console.log('location successfully deleted!');
        res.send(location);
        return;
      });
    });
  });

  // --api/editlocation
  app.post('/api/editlocation', function(req, res) {
    console.log(req.body);
    var Location = require('./api/createEntities/cELocationModel');
    Location.findById(req.body._id, function(err, location) {
      if (err) {
        res.send(err);
        return;
      };

      if (location == null) {
          res.send("Can't be edited!");
          return;
      };

      location.Desc = req.body.Desc;
      // save the user
      location.save(function(err) {
        //if (err) throw err;
        if (err) {
          res.send(err);
          return;
        };

        console.log('location successfully updated!');
        res.send(location);
        return;
      });
    });
  });

  // Center API's
  // -- api/createcenter
  app.post('/api/createcenter', function(req, res) {
    var Center = require('./api/createEntities/cECenterModel');
    console.log(req.body.desc);
    var Center = new Center({
      Desc: req.body.desc
    });

    Center.save(function(err) {
      if (err) {
        res.send(err);
        return;
      };

      res.send("Center Saved!");
      console.log('Data saved successfully!');
    });
  });

  // -- api/getcenter
  app.get('/api/getcenter', function(req, res) {
    var Center = require('./api/createEntities/cECenterModel');
    Center.find(function(err, center) {
      // if there is an error retrieving, send the error.
      // nothing after res.send(err) will execute
      if (err)
      res.send(err);

      res.json(center); // return all nerds in JSON format
    });
  });

  // --api/delcenter
  app.post('/api/delcenter', function(req, res) {
    console.log(req.body);
    var Center = require('./api/createEntities/cECenterModel');
    Center.findOneAndRemove(req.body, function(err, center) {
      if (err){
        res.send(err);
        return;
      }
      if (center == null) {
          res.send("Can't be deleted!");
          return;
      };
      // delete him
      center.remove(function(err) {
        if (err) {
          res.send(err);
          return;
        };

        console.log('center successfully deleted!');
        res.send(center);
        return;
      });
    });
  });

  // --api/editcenter
  app.post('/api/editcenter', function(req, res) {
    console.log(req.body);
    var Center = require('./api/createEntities/cECenterModel');
    Center.findById(req.body._id, function(err, center) {
      if (err) {
        res.send(err);
        return;
      };

      if (center == null) {
          res.send("Can't be edited!");
          return;
      };

      center.Desc = req.body.Desc;
      // save the user
      center.save(function(err) {
        //if (err) throw err;
        if (err) {
          res.send(err);
          return;
        };

        console.log('center successfully updated!');
        res.send(center);
        return;
      });
    });
  });

  // Doctor API's
  //var doctorController = require("./api/createEntities/cEDoctorController");
  // -- api/createdoctor
  app.post('/api/createdoctor', function(req, res) {
    var Doctor = require('./api/createEntities/cEDoctorModel');
    console.log(req.body.desc);
    var Doctor = new Doctor({
      Desc: req.body.desc
    });

    Doctor.save(function(err) {
      console.log(err);
      if (err) {
        res.send(err);
        return;
      };

      res.send("Doctor Saved!");
      console.log('Data saved successfully!');
    });
  });

  // -- api/getdoctor
  app.get('/api/getdoctor', function(req, res) { 
    //res.send("unable to get doctor"); 
    var Doctor = require('./api/createEntities/cEDoctorModel');
     Doctor.find(function(err, doctor) {
       // if there is an error retrieving, send the error.
      // nothing after res.send(err) will execute
       console.log("doctor" + doctor);
        if (err)
        res.send(err);

    // //   res.send(doctor);
        res.json(doctor); // return all nerds in JSON format
      });       
    });
  // --api/deldoctor
  app.post('/api/deldoctor', function(req, res) {
    console.log(req.body);
    var Doctor = require('./api/createEntities/cEDoctorModel');
    Doctor.findOneAndRemove(req.body, function(err, doctor) {
      if (err){
        res.send(err);
        return;
      }
      if (doctor == null) {
          res.send("Can't be deleted!");
          return;
      };
      // delete him
      doctor.remove(function(err) {
        if (err) {
          res.send(err);
          return;
        };

        console.log('doctor successfully deleted!');
        res.send(doctor);
        return;
      });
    });
  });

  // --api/editdoctor
  app.post('/api/editdoctor', function(req, res) {
    console.log(req.body);
    var Doctor = require('./api/createEntities/cEDoctorModel');
    Doctor.findById(req.body._id, function(err, doctor) {
      if (err) {
        res.send(err);
        return;
      };

      if (doctor == null) {
          res.send("Can't be edited!");
          return;
      };

      doctor.Desc = req.body.Desc;
      // save the user
      doctor.save(function(err) {
        //if (err) throw err;
        if (err) {
          res.send(err);
          return;
        };

        console.log('doctor successfully updated!');
        res.send(doctor);
        return;
      });
    });
  });

  // Refer API's
  // -- api/createrefer
  app.post('/api/createrefer', function(req, res) {
    var Refer = require('./api/createEntities/cEReferModel');
    console.log(req.body.desc);
    var Refer = new Refer({
      Desc: req.body.desc
    });

    Refer.save(function(err) {
      if (err) {
        res.send(err);
        return;
      };

      res.send("refer Saved!");
      console.log('Data saved successfully!');
    });
  });

  // -- api/getrefer
  app.get('/api/getrefer', function(req, res) {
    var Refer = require('./api/createEntities/cEReferModel');
    Refer.find(function(err, refer) {
      // if there is an error retrieving, send the error.
      // nothing after res.send(err) will execute
      if (err)
      res.send(err);

      res.json(refer); // return all nerds in JSON format
    });
  });

  // --api/delrefer
  app.post('/api/delrefer', function(req, res) {
    console.log(req.body);
    var Refer = require('./api/createEntities/cEReferModel');
    Refer.findOneAndRemove(req.body, function(err, refer) {
      if (err){
        res.send(err);
        return;
      }
      if (refer == null) {
          res.send("Can't be deleted!");
          return;
      };
      // delete him
      refer.remove(function(err) {
        if (err) {
          res.send(err);
          return;
        };

        console.log('refer successfully deleted!');
        res.send(refer);
        return;
      });
    });
  });

  // --api/editrefer
  app.post('/api/editrefer', function(req, res) {
    console.log(req.body);
    var Refer = require('./api/createEntities/cEReferModel');
    Refer.findById(req.body._id, function(err, refer) {
      if (err) {
        res.send(err);
        return;
      };

      if (refer == null) {
          res.send("Can't be edited!");
          return;
      };

      refer.Desc = req.body.Desc;
      // save the user
      refer.save(function(err) {
        //if (err) throw err;
        if (err) {
          res.send(err);
          return;
        };

        console.log('refer successfully updated!');
        res.send(refer);
        return;
      });
    });
  });


  // FeeExpenses API's
  // -- api/createfee
  app.post('/api/createfee', function(req, res) {
    var Fee = require('./api/createEntities/cEFeeExpensesModel');
    console.log(req.body.desc);
    var Fee = new Fee({
      Desc: req.body.desc
    });

    Fee.save(function(err) {
      if (err) {
        res.send(err);
        return;
      };

      res.send("Fee Saved!");
      console.log('Data saved successfully!');
    });
  });

  // -- api/getfee
  app.get('/api/getfee', function(req, res) {
    var Fee = require('./api/createEntities/cEFeeExpensesModel');
    Fee.find(function(err, fee) {
      // if there is an error retrieving, send the error.
      // nothing after res.send(err) will execute
      if (err)
      res.send(err);

      res.json(fee); // return all nerds in JSON format
    });
  });

  // --api/delfee
  app.post('/api/delfee', function(req, res) {
    console.log(req.body);
    var Fee = require('./api/createEntities/cEFeeExpensesModel');
    Fee.findOneAndRemove(req.body, function(err, fee) {
      if (err){
        res.send(err);
        return;
      }
      if (fee == null) {
          res.send("Can't be deleted!");
          return;
      };
      // delete him
      fee.remove(function(err) {
        if (err) {
          res.send(err);
          return;
        };

        console.log('fee successfully deleted!');
        res.send(fee);
        return;
      });
    });
  });

  // --api/editfee
  app.post('/api/editfee', function(req, res) {
    console.log(req.body);
    var Fee = require('./api/createEntities/cEFeeExpensesModel');
    Fee.findById(req.body._id, function(err, fee) {
      if (err) {
        res.send(err);
        return;
      };

      if (fee == null) {
          res.send("Can't be edited!");
          return;
      };

      fee.Desc = req.body.Desc;
      // save the user
      fee.save(function(err) {
        //if (err) throw err;
        if (err) {
          res.send(err);
          return;
        };

        console.log('fee successfully updated!');
        res.send(fee);
        return;
      });
    });
  });

  /*Create Entities API's Ends*/

  // frontend routes =========================================================
  // route to handle all angular requests
  app.get('/', function(req, res) {
    console.log("I am in routes");
    res.sendfile('./public/index.html'); // load our public/index.html file
  });

};
