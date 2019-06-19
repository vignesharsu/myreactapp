const express = require('express');
const contactRoutes = express.Router();

// Require Login model in our routes module
let Contact = require('./contact.model');

// Find a Contact data
contactRoutes.route('/:userId').get(function (req, res) {
    Contact.findOne({userId: req.params.userId})
    .then(Contact => {
        if(!Contact) {
            return res.status(404).send({
                message: "Contact not found with id " + req.params.userId
            });            
        }
        res.send(Contact);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Contact not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Contact with id " + req.params.userId
        });
    });
});

module.exports = contactRoutes;