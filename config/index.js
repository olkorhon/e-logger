const packageInfo = require('../package.json');
const conf = require('./conf.json');
const envDefaults = require('./envDefaults');

const ArgumentParser = require('argparse').ArgumentParser;
const parser = new ArgumentParser({
    version: packageInfo.version,
    addHelp: true,
    description: packageInfo.description
});

parser.addArgument(
    ['-l', '-loglevel'],
    {
        help: 'logging level of console (-l info, -ll debug, -lll verbose, -llll silly)',
        action: 'count',
        defaultValue: 2
    }
);

const args = parser.parseArgs();


module.exports = Object.assign({}, envDefaults, conf, {args});
