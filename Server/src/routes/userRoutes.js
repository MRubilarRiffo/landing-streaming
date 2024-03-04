const userRoutes = require('express').Router();

const { getUser } = require('../controllers/user/getUser');

userRoutes.get('/getuser', getUser);

module.exports = userRoutes;