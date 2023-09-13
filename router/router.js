const express = require('express');
const router = express.Router(); 
const {getUser, createUser, updateUser, deleteUser} = require('../controllers/userController');
//const {createUser} = require('../controllers/userController');
//const {updateUser} = require('../controllers/userController')

router.get("/", (req, res) => {
   res.send('Woo-Hoo Lets Build a User CRUD API!🙋')
})

router.get("/api/:userID", getUser);

router.post("/api", createUser);

router.put("/api/:userID", updateUser);

router.delete("/api/:userID", deleteUser);

module.exports = router;
