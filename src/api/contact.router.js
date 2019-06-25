const express = require('express');
const contactRoutes = express.Router();

// Require Login model in our routes module
let Contact = require('./contact.model');

// Find a Contact data
contactRoutes.route('/users').get(function (req, res) {
    Contact.findOne({userId: req.query.userId})
    .then(Contact => {
        if(!Contact) {
            return res.status(404).send({
                message: "Contact not found with id " + req.query.userId
            });            
        }
        res.send(Contact);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Contact not found with id " + req.query.userId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Contact with id " + req.query.userId
        });
    });
});

contactRoutes.route('/update').post(function (req, res) {
    Contact.findOneAndUpdate({userId:req.body.userId}, {
        name: req.body.name,
        designation: req.body.designation,
        mobile: req.body.mobile,
        email: req.body.email,
        address: req.body.address
    }, {new: true}, (error, resp) =>{
        if(!resp) {
            console.log("No Contact Data found..!");
        }
        res.send(Contact)

        if(error){
            console.log("Error while updating");
        }
    });
});

module.exports = contactRoutes;