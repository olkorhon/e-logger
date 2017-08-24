// Third party modules
require('colors');
const winston = require('winston');
require('winston-daily-rotate-file');

// Application modules
const tools = require('./tools');
const config = require('../config');
const ErrorStack = require('./error-stack');

const loggingLevels = ['silent', 'error', 'warn', 'info', 'debug', 'verbose', 'silly'];

class Logger {
    constructor() {
        this.logger = new winston.Logger({
            transports: [
                this._generateConsoleTransport(),
                this._generateFileTransport()
            ]
        });

        loggingLevels.slice(1).forEach(this._wrapFunction.bind(this));
    }

    get coreLogger() {
        return this.logger;
    }

    _generateConsoleTransport() {
        const level = loggingLevels[config.args.l || config.consoleDefaultLevel];

        return new winston.transports.Console({
            colorize: true, // colorize the output to the console
            formatter: this._consoleFormatter.bind(this),
            level: level
        });
    }

    _generateFileTransport() {
        const level = loggingLevels[config.fileLoggingLevel];

        return new winston.transports.DailyRotateFile({
            filename: './logs/ log.txt',
            datePattern: 'yyyy-MM-dd',
            prepend: true,
            json: false,
            formatter: this._fileFormatter.bind(this),
            level: level
        });
    }

    _consoleFormatter(options) {
        const color = this._getLevelColor(options.level);
        
        const lines = options.message.split('\n');
        for (let i = 0; i < lines.length; i++) {
            const tag = i === 0 ? tools.padToLength(`[${options.level}]`, 12)[color] : '            ';
            lines[i] = tag + lines[i];
        }

        return lines.join('\n');
    }

    _fileFormatter(options) {
        const timestamp = new Date();
        timestamp.setMinutes(timestamp.getMinutes() - timestamp.getTimezoneOffset());

        const lines = options.message.split('\n');
        for (let i = 0; i < lines.length; i++) {
            const tag = i === 0 ? tools.padToLength(`[${options.level}]`, 12) : '            ';
            lines[i] = timestamp.toISOString() + ' ' + tag + lines[i];
        }

        return lines.join('\n');
    }

    _stringifyParam(param) {
        if (param instanceof ErrorStack) {
            return param.toString(0, true);
        } else if (param instanceof Error) {
            return param.message;
        }
        
        return param;
    }

    _wrapFunction(name) {
        const original = this.logger[name];
        this.logger[name] = (object) => {
            original(this._stringifyParam(object));
        };
    }

    _getLevelColor(level) {
        switch(level) {
        case 'info':
            return 'cyan';
        case 'warn':
            return 'yellow';
        case 'error':
            return 'red';
        default:
            return 'white';
        }
    }
}


module.exports = new Logger();
