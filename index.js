require('colors');

const config = require('./config');

// Important ascii art
/* eslint-disable */
if (process.env.NODE_ENV === 'development' && config.startupBanner) {
    console.log('');
    console.log('   _____                 _                                  _      '.green);
    console.log('  |  __ \\               | |                                | |    '.green);
    console.log('  | |  | | _____   _____| | ___  _ __  _ __ ___   ___ _ __ | |_   '.green);
    console.log('  | |  | |/ _ \\ \\ / / _ \\ |/ _ \\| \'_ \\| \'_ ` _ \\ / _ \\ \'_ \\| __|  '.green);
    console.log('  | |__| |  __/\\ V /  __/ | (_) | |_) | | | | | |  __/ | | | |_   '.green);
    console.log('  |_____/ \\___| \\_/ \\___|_|\\\___/| .__/|_| |_| |_|\\___|_| |_|\\__|  '.green);
    console.log('                                | |                               '.green);
    console.log('                                |_|                               '.green);
    console.log('');
} else if (process.env.NODE_ENV === 'production' && config.startupBanner) {
    console.log('');
    console.log('   _____               _            _   _               '.red);
    console.log('  |  __ \\             | |          | | (_)              '.red);
    console.log('  | |__) | __ ___   __| |_   _  ___| |_ _  ___  _ __    '.red);
    console.log('  |  ___/ \'__/ _ \\ / _` | | | |/ __| __| |/ _ \\| \'_ \\   '.red);
    console.log('  | |   | | | (_) | (_| | |_| | (__| |_| | (_) | | | |  '.red);
    console.log('  |_|   |_|  \\___/ \\__,_|\\__,_|\\___|\\__|_|\\___/|_| |_|  '.red);
    console.log('');                                     
}
else if (process.env.NODE_ENV === 'test' && config.startupBanner) {
    console.log('');
    console.log('   _______        _     '.yellow);
    console.log('  |__   __|      | |    '.yellow);
    console.log('     | | ___  ___| |_   '.yellow);
    console.log('     | |/ _ \\/ __| __|  '.yellow);
    console.log('     | |  __/\\__ \\ |_   '.yellow);
    console.log('     |_|\\___||___/\\__|  '.yellow);
    console.log('');    
}
/* eslint-enable */

const logger = require('./app');
const ErrorStack = require('./app/error-stack.js');

// Testing logs
const errorStack = new ErrorStack();
const error = new Error('This is an error!');
error.meta = {
    key1: 'Value1',
    key2: 'Value2',
    key3: 'Value3'
};

errorStack.addError(error);
errorStack.addError(error);
errorStack.addError(error);

logger.info('This is a good to know thing');
logger.warn('WARNINGGG');
logger.error(errorStack);

module.exports = logger;
