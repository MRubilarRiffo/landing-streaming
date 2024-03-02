require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
	host: DB_HOST,
	port: DB_PORT,
	dialect: 'mysql',
	logging: false,
});

const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, '/models'))
	.filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
	.forEach((file) => {
		modelDefiners.push(require(path.join(__dirname, '/models', file)));
	});

	modelDefiners.forEach(model => model(sequelize));

	let entries = Object.entries(sequelize.models);
	let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
	sequelize.models = Object.fromEntries(capsEntries);
	
	const { Product, License, Review, User, Cart, Order } = sequelize.models;

	//Relaciones aquí
	License.belongsTo(Product);
	Product.hasMany(License);

	Review.belongsTo(Product);
	Product.hasMany(Review);

	User.hasMany(Order);
	Order.belongsTo(User);

	User.hasOne(Cart);
	Cart.belongsTo(User);

module.exports = {
	...sequelize.models,
	conn: sequelize,
};