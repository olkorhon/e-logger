const MKL = 8; // METADATA_KEY_LENGTH
const INDENT = '    ';

function textBlock(title, meta, indent = 0, useColors = false) {
    const textIndent = multiplyText(INDENT, indent);

    let result = `${textIndent}${title}`;

    if (meta) {
        Object.keys(meta).forEach((key, i, keys) => {
            if (useColors) {
                result += `\n${textIndent}${i === keys.length - 1 ? '└─' : '├─'}${padToLength(key, MKL).white}: ${meta[key]}`.gray;
            } else {
                result += `\n${textIndent}${i === keys.length - 1 ? '└─' : '├─'}${padToLength(key, MKL)}: ${meta[key]}`;
            }
        });
    }
    result += '\n';

    return result;
}

function padToLength(txt, length) {
    let newTxt = txt;
    if (newTxt.length > length) {
        return `${newTxt.slice(0, length - 3)}...`;
    }
  
    while (newTxt.length < length) { newTxt += ' '; }
    return newTxt;
}

function multiplyText(text, amount) {
    let result = '';
    for (let i = 0; i < amount; i++) {
        result += text;
    }

    return result;
}

function getIndent(indent) {
    return multiplyText(INDENT, indent);
}

module.exports = {
    textBlock,
    multiplyText,
    padToLength,
    getIndent
};