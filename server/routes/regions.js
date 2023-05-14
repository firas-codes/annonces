const express = require("express");
const { addPays, getPays, getGouvernorats, addGouvernorat, getVilles, addVille } = require("../controllers/regionsController");
const router = express.Router();


router.route('/pays').post(addPays).get(getPays);
router.route('/gouvernorats').get(getGouvernorats).post(addGouvernorat);
router.route('/villes').get(getVilles).post(addVille);

module.exports = router;