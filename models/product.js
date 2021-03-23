"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Product extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			Product.belongsTo(models.Restaurant, {
				as: "restaurant",
			});
			Product.hasMany(models.Order, {
				foreignKey: "productId",
				as: "order",
			});
		}
	}
	Product.init(
		{
			tittle: DataTypes.STRING,
			price: DataTypes.INTEGER,
			restaurantId: DataTypes.INTEGER,
			image: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "Product",
		}
	);
	return Product;
};
