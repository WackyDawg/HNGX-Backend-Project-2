const express = require('express');
const router = express.Router(); 
const {
   validatePersonBody,
   validatePersonUpdateBody,
 } = require("../middleware/validation");
const {getPerson, createPerson, updatePerson, deletePerson} = require('../controllers/personController');
//const {createUser} = require('../controllers/userController');
//const {updateUser} = require('../controllers/userController')

router.get("/api", (req, res) => {
   res.send('Woo-Hoo ths is my User CRUD API!🙋')
})

router.get("/api/:userID", getPerson);

router.post("/api", validatePersonBody, createPerson);

router.put("/api/:userID", validatePersonBody, updatePerson);

router.delete("/api/:userID", deletePerson);

module.exports = router;
