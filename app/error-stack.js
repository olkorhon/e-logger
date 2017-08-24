const tools = require('./tools');
const errors = require('./customErrors');


class ErrorStack {
    constructor() {
        this.errors = [];
    }

    addError(error) {
        if (error instanceof Error) {
            this.errors.push(error);
        } else {
            throw new errors.InvalidParam('error not instance of an error.', 'instance of an Error', error);
        }
    }

    toString(initialIndent = 0, useColors = false) {
        let result = '';
        let indent = initialIndent;

        // Go through errors in reverse order
        this.errors.reverse().forEach((error) => {
            result += tools.textBlock(error.message, error.meta, indent, useColors);
            indent++;
        });

        return result;
    }
}


module.exports = ErrorStack;
