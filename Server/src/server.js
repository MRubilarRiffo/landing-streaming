const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const errorMiddleware = require('../src/middleware/errorMiddleware');

const router = require('./routes');

const server = express();

server.use(morgan('dev'));
server.use(express.json());
server.use(cors());

server.use('/api', router);

server.use(errorMiddleware);

module.exports = server;