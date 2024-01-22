const server = require('./src/server');
const { conn } = require('./src/db');
const { createReview_h } = require('./src/handlers/reviews/createReview_h');

const PORT = 3001;

conn.sync({ force: true })
    .then(async () => {
        const name = 'Microsoft 365 - 12 meses';

        await conn.models.Product.create({
            name: name,
            description: 'Test test testTest test testTest test test',
            price: 5490,
            priceOffert: 2490,
            slug: name.toLowerCase().replace(/\s+/g, '-').replace(/-+/g, '-'),
        });

        await conn.models.License.create({
            key: '1234-5678-8901-2344',
            isActive: true,
            ProductId: 1,
        });

        const review = {
            content: 'Review Review Review Review Review Review Review',
            rating: 5,
            ProductId: 1,
        };

        const review2 = {
            content: 'Review Review Review Review Review Review Review',
            rating: 2,
            ProductId: 1,
        };
        
        await createReview_h(review.content, review.rating, review.ProductId);
        await createReview_h(review2.content, review2.rating, review2.ProductId);
    })
    .then(() => {
        server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
    })
    .catch(error => console.log(error));