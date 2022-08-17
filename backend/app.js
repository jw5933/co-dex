const config = require('./utils/config');
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

require('express-async-errors');

const logger = require('./utils/logger');
const wordsRouter = require('./controllers/words');
const defsRouter = require('./controllers/definitions');
const middleware = require('./utils/middleware');

logger.info('connecting to', config.MONGODB_URI);

mongoose.connect(config.MONGODB_URI)
    .then(() => logger.info('connected to mongoDB'))
    .catch((error) => logger
        .error('error connecting to mongoDB', error.message));

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

app.use('/api/words', wordsRouter);
app.use('/api/definitions', defsRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
