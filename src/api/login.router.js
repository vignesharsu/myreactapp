const express = require('express');
const crypto = require('crypto')
const loginRoutes = express.Router();

// Require Login model in our routes module
let Login = require('./login.model');
let Contact = require('./contact.model');
var aval = "Yes";
// Generate UserId 

function genUserId(len){
  return crypto
  .randomBytes(Math.ceil(len/2))
  .toString('hex')
  .slice(0,len)
}

// Defined store route
loginRoutes.route('/register').post(function (req, res) {
  const login1 = new Login();
  const contact = new Contact();
  const Id = genUserId(4);
  Login.findOne({userId : Id})
  .then(Login =>{
    if(!Login){
      aval = "No";
    }

    if(aval == "No"){
      login1.userId = Id;
      contact.userId = Id;
      contact.name = req.body.name;
      contact.designation = req.body.designation;
      contact.mobile = req.body.mobile;
      contact.email = req.body.email;
      contact.address = req.body.address;
      login1.userName = req.body.userName;
      login1.password = req.body.password 
      login1.save()
        .then(logins => {
          if(logins){
            contact.save().then(contacts =>{
              if(contacts){
                res.status(200).json({'Login': 'Login in added successfully'});
              }
            })
          }
        })
        .catch(err => {
          if(err){
            res.status(400).send("unable to save to database");
        }
        });
    }//if
  });
});

// Defined get data(index or listing) route
loginRoutes.route('/').get(function (req, res) {
    Login.find(function(err, Logines){
    if(err){
      console.log(err);
    }
    else {
      res.json(Logines);
    }
  });
});


// Find a single Login data
loginRoutes.route('/users').get(function (req, res) {
    Login.findOne({userName: req.query.userName})
    .then(Login => {
        if(!Login) {
            return res.status(404).send({
                message: "Login not found with id " + req.params.userName
            });            
        }
        res.send(Login);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Login not found with id " + req.params.userName
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Login with id " + req.params.userName
        });
    });
});

// Defined edit route
loginRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Login.findById(id, function (err, Login){
      res.json(Login);
  });
});

//  Defined update route
loginRoutes.route('/update/:id').post(function (req, res) {
    Login.findById(req.params.id, function(err, Login) {
    if (!Login)
      res.status(404).send("data is not found");
    else {
        Login.person_name = req.body.person_name;
        Login.Login_name = req.body.Login_name;
        Login.Login_gst_number = req.body.Login_gst_number;

        Login.save().then(Login => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

// Defined delete | remove | destroy route
loginRoutes.route('/delete/:id').get(function (req, res) {
    Login.findByIdAndRemove({_id: req.params.id}, function(err, Login){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = loginRoutes;