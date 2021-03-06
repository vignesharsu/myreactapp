const express = require('express');
const chartRoutes = express.Router();

// Require Login model in our routes module
let Chart = require('./chart.model');

// Find a Contact data
// chartRoutes.route('/:userId').get(function (req, res) {
//     Chart.findOne({userId: req.params.userId})
//     .then(Chart => {
//         if(!Chart) {
//             return res.status(404).send({
//                 message: "Chart not found with id " + req.params.userId
//             });            
//         }
//         res.send(Chart);
//     }).catch(err => {
//         if(err.kind === 'ObjectId') {
//             return res.status(404).send({
//                 message: "Chart not found with id " + req.params.userId
//             });                
//         }
//         return res.status(500).send({
//             message: "Error retrieving Chart with id " + req.params.userId
//         });
//     });
// });

// Find a chart data
chartRoutes.route('/users').get(function (req, res) {
  Chart.find({userId:req.query.userId}).then(Chart =>{
    if(!Chart) {
      return res.status(404).send({
          message: "Chart not found with id " + req.query.userId
      });            
  }
  res.send(Chart);
  }).catch(err => {
      if(err.kind === 'ObjectId') {
          return res.status(404).send({
              message: "Chart not found with id " + req.query.userId
          });                
      }
      return res.status(500).send({
          message: "Error retrieving Chart with id " + req.query.userId
      });
  });
});

module.exports = chartRoutes;