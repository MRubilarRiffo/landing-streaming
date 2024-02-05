const server = require('./src/server');
const { conn } = require('./src/db');
const { createReview_h } = require('./src/handlers/reviews/createReview_h');

const PORT = 3001;

conn.sync({ force: true })
    .then(async () => {
        await conn.models.Product.create({
            name: 'Microsoft 365 - 12 meses',
            description: 'Test test testTest test testTest test test',
            price: 9490,
            priceOffert: 4990,
            slug: 'Microsoft 365 - 12 meses'.toLowerCase().replace(/\s+/g, '-').replace(/-+/g, '-'),
            immediateDelivery: true,
            image: 'https://res.cloudinary.com/dctl1zamk/image/upload/v1706817897/Innovoza/yqvsysqbtstdghtycbqz.png',
            category: 'Licencia',
            bulkPrice: [
                {
                    min: "5",
                    max: "10",
                    discount: "1000"
                },
                {
                    min: "11",
                    max: "20",
                    discount: "2000"
                },
                {
                    min: "21",
                    max: "",
                    discount: "3000"
                }
            ]
        });

        await conn.models.Product.create({
            name: 'Adobe Create 6 meses',
            description: 'Test test testTest test testTest test test',
            price: 4490,
            priceOffert: 14990,
            slug: 'Adobe Create 6 meses'.toLowerCase().replace(/\s+/g, '-').replace(/-+/g, '-'),
            immediateDelivery: true,
            image: 'https://res.cloudinary.com/dctl1zamk/image/upload/v1706817897/Innovoza/yqvsysqbtstdghtycbqz.png',
            category: 'Licencia',
            bulkPrice: [
                {
                    min: "",
                    max: "10",
                    discount: "1000"
                },
                {
                    min: "11",
                    max: "20",
                    discount: "2000"
                },
                {
                    min: "21",
                    max: "",
                    discount: "3000"
                }
            ]
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
            rating: 5,
            ProductId: 1,
        };
        
        await createReview_h(review.content, review.rating, review.ProductId);
        await createReview_h(review2.content, review2.rating, review2.ProductId);
    })
    .then(() => {
        server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
    })
    .catch(error => console.log(error));