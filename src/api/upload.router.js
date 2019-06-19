const express = require('express');
const uploadRoutes = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const sessionStorage = require('sessionstorage')

// Require Login model in our routes module
const Upload = require('./upload.model');


const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function(req, file, cb){
        cb(null, 'Image'+path.extname(file.originalname));
    }
});

const upload = multer({
    storage : storage
});

//Add Image  to Mongo DB
uploadRoutes.route("/addimg").post(upload.single('image'), function (req, res) {
  const upload = new Upload();
  console.log('fdfdfdff',req.body)

  Upload.findOneAndUpdate({userId:req.body.userId}, {
    image: fs.readFileSync('./uploads/Image.jpg')
}, {new: true}, (error, resp) =>{
    if(!resp) {
        console.log('new')
        upload.image = fs.readFileSync('./uploads/Image.jpg');
        //upload.image.data = new Buffer(req.body.data, 'base64')
        //upload.image.data = req.body.data;
        //upload.image.contentType = "image/jpeg";
        upload.userId = req.body.userId;
        upload.save()
            .then(res => {
                res.send('Uploaded successfully');
            })
            .catch(err => {
            if(err){
                res.send("unable to save to database");
            }
            });
    }else{
        console.log('up')
        res.send(upload);
    }

    if(error){
        console.log("Error while updating");
    }
});
});

// Find a Image data
uploadRoutes.route('/:userId').get(function (req, res) {
  Upload.findOne({userId: req.params.userId})
    .then(Upload => {
        if(!Upload) {
            return res.status(404).send({
                message: "Upload not found with id " + req.params.userId
            });            
        }
        const buf = Buffer.from(Upload.image.toString('base64'));
        let binary = '';
        let bytes = [].slice.call(new Uint8Array(buf));
        bytes.forEach(b => {
            binary += String.fromCharCode(b);
        });
        res.send(binary);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Upload not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Upload with id " + req.params.userId
        });
    });
});

module.exports = uploadRoutes;