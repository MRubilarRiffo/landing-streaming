const { Product, License, Review } = require("../db");

const includedClause = (included) => {
    const allowedIncluded = [
        { text: 'product', table: Product },
        { text: 'license', table: License },
        { text: 'review', table: Review }
    ];
    
    const selectedIncluded = included.split(',');

    const clause = selectedIncluded.map(item => {
        const found = allowedIncluded.find(({ text }) => text === item);
        if (found) {
            return found.table;
        } else {
            return null;
        };
    }).filter(item => item !== null);

    return clause;
};

module.exports = { includedClause };