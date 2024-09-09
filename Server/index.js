const server = require('./src/server');
const { conn } = require('./src/db');
const { createReview_h } = require('./src/handlers/reviews/createReview_h');
const fs = require('fs');

const PORT = 3001;

conn.sync({ force: false })
    // .then(async () => {
    //     const rawData = fs.readFileSync('data.json');
    //     const data = JSON.parse(rawData);

    //     for (const product of data.products) {
    //         const { name, options } = product.variation;

    //         const productObj = {
    //             ...product,
    //             variation: product.variation.active
    //         };

    //         const productCreate = await conn.models.Product.create(productObj);

    //         const salePrices = options.map(option => option.salePrice);

    //         const result = {
    //             minPrice: Math.min(...salePrices),
    //             maxPrice: Math.max(...salePrices)
    //         };

    //         const variation = await conn.models.Variation.create({
    //             name,
    //             ProductId: productCreate.id,
    //             minPrice: result.minPrice,
    //             maxPrice: result.maxPrice,
    //         });

    //         const bulkVariation = options.map(({ value, stock, previousPrice, salePrice }) => ({
    //             value,
    //             stock,
    //             previousPrice,
    //             salePrice,
    //             ProductId: productCreate.id,
    //             VariationId: variation.id,
    //         }))

    //         await conn.models.ProductVariation.bulkCreate(bulkVariation);

    //     };

    //     for (const review of data.reviews) {
    //         await createReview_h(review.content, review.rating, review.productId);
    //     };

    //     for (const license of data.licenses) {
    //         await conn.models.License.create(license);
    //     };

    //     for (const user of data.users) {
    //         await conn.models.User.create(user);
    //     };
    // })
    .then(() => {
        server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
    })
    .catch(error => console.log(error));