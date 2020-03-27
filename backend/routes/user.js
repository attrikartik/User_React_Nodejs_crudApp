const express = require("express");
const { body } = require('express-validator');

// business logic controls regarging users in DB
const userControllers = require('../controllers/user');

const router =  express.Router();

// GET users from DB
router.get("/users",userControllers.getUsers);

// POST / add user to DB
router.post("/user",[
    body('fullName')
    .trim()
    .not()
    .isEmpty(),
    body('email')
    .trim()
    .not()
    .isEmpty()
    .isEmail(),
    body('zipCode')
    .trim()
    .not()
    .isEmpty(),
    body('message')
    .trim()
    .not()
    .isEmpty()
],userControllers.addUser);

// PUT / edit details of user(with given id) in DB
router.put("/user/:userId",userControllers.editUser);

// DELETE / delete user(with given id) from DB
router.delete("/user/:userId",userControllers.deleteUser);


module.exports = router ;