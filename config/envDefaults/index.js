const production = require('./production.json');
const development = require('./development.json');
const test = require('./test.json');

const environments = {
    production,
    development,
    test
};


module.exports = environments[process.env.NODE_ENV || 'development'];
