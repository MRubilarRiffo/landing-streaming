const { Product, License, Review, Cart, Order, User, CartProduct, Variation, ProductVariation } = require("../db");

const includedClause = (included) => {
    const allowedIncluded = [
        { text: 'product', table: Product },
        { text: 'license', table: License },
        { text: 'review', table: Review },
        { text: 'cart', table: Cart },
        { text: 'order', table: Order },
        { text: 'user', table: User },
        { text: 'cartProduct', table: CartProduct },
        { text: 'variation', table: Variation },
        { text: 'productVariation', table: ProductVariation }
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