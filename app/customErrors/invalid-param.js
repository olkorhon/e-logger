const tools = require('../tools');

class InvalidParameter extends Error {
    constructor(description, expectation, parameter) {
        super(description);
        this.expectation = expectation;
        this.param = parameter;
    }

    format(indentLevel) {
        const meta = {
            param: `<${typeof this.parameter}> ${this.parameter}`,
            expected: this.expectation
        };

        return tools.textBlock(
            this.message, meta, indentLevel);
    }
}

module.exports = InvalidParameter;
