"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Order extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Order.belongsTo(models.Transaction, {
				foreignKey: "transactionId",
				as: "transaction",
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
			});
			Order.belongsTo(models.Product, {
				foreignKey: "productId",
				as: "product",
			});
		}
	}
	Order.init(
		{
			pricePurchased: DataTypes.INTEGER,
			transactionId: DataTypes.INTEGER,
			productId: DataTypes.INTEGER,
			qty: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "Order",
		}
	);
	return Order;
};
