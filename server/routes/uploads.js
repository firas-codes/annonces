const express = require("express");
const { addLogo } = require("../controllers/uploadController");
const router = express.Router();

router.route('/logo').post(addLogo);


module.exports = router;