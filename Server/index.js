const server = require('./src/server');
const { conn } = require('./src/db');
const { createReview_h } = require('./src/handlers/reviews/createReview_h');
const fs = require('fs');

const PORT = 3001;

conn.sync({ force: true })
    .then(async () => {
        const rawData = fs.readFileSync('data.json');
        const data = JSON.parse(rawData);

        for (const product of data.products) {
            await conn.models.Product.create(product);
        };

        for (const review of data.reviews) {
            await createReview_h(review.content, review.rating, review.productId);
        };

        for (const license of data.licenses) {
            await conn.models.License.create(license);
        };

        for (const user of data.users) {
            await conn.models.User.create(user);
        };        
    })
    .then(() => {
        server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
    })
    .catch(error => console.log(error));