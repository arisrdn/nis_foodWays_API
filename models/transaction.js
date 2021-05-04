"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Transaction extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Transaction.belongsTo(models.User, {
				foreignKey: "userId",
				as: "userOrder",
			});
			Transaction.belongsTo(models.Restaurant, {
				foreignKey: "restaurantId",
				as: "restaurant",
			});
			Transaction.hasMany(models.Order, {
				as: "orders",
				foreignKey: "transactionId",
			});
		}
	}
	Transaction.init(
		{
			status: DataTypes.STRING,
			note: DataTypes.STRING,
			shippingFee: DataTypes.INTEGER,
			restaurantId: DataTypes.INTEGER,
			userId: DataTypes.INTEGER,
			isRead: DataTypes.INTEGER,
			locationDelivery: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "Transaction",
		}
	);
	return Transaction;
};
