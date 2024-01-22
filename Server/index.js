const server = require('./src/server');
const { conn } = require('./src/db');

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
            key: "1234-5678-8901-2344",
            productId: 1, // Asocia la licencia al producto utilizando el productId
            isActive: true,
        });
    })
    .then(() => {
        server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
    })
    .catch(error => console.log(error));