const { conn } = require('../db');

const includedClause = (included) => {
    const selectedIncluded = included.split(',');

    const clause = selectedIncluded.map(item => {
        const found = conn.models[item[0].toUpperCase() + item.slice(1)] || null;
        if (found) {
            return found;
        } else {
            return null;
        };
    }).filter(item => item !== null);

    return clause;
};

module.exports = { includedClause };