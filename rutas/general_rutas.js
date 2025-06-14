const express = require('express');
const router = express.Router();
const GeneralController = require('../controladores/general_controllers');

router.get('/todo', GeneralController.getAllData);

module.exports = router;