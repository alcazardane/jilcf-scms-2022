const express = require('express')

const {createAccount, readAccount} = require('../controllers/accountController')
const router = express.Router()
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const csvtojson = require('csvtojson');
const mongoose = require('mongoose');
const Acc = require('../models/accountModel')


// // require authentication
// const requireAuth = require('../middleware/requireAuth')
// router.use(requireAuth)

// ACCOUNTS TABLE
router.post('/create', createAccount)
router.get('/accountRecords', readAccount)
router.post('/upload', upload.single('file'), (req, res) => {
    csvtojson()
    .fromFile(req.file.path)
    .then((jsonObj) => {
        const data = new Acc({
            data: jsonObj
        });
        data.save().then(() => {
            res.json({ message: 'File uploaded and added to database!' });
        });
    });
});

module.exports = router