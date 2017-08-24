// Application modules
const logger = require('./logger');

logger.coreLogger.info(`Loading logger in environment: "${process.env.NODE_ENV}".`);

module.exports = logger.coreLogger;