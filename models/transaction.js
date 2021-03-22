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

			Transaction.belongsToMany(models.Product, {
				foreignKey: "transactionId",
				// as: "order",
				through: {
					model: "Order",
					as: "jembatan",
					foreignKey: "transactionId",
				},
			});

			// Transaction.hasMany(models.Order, {
			// 	as: "orders",
			// });
		}
	}
	Transaction.init(
		{
			status: DataTypes.STRING,
			shippingFee: DataTypes.INTEGER,
			partnerId: DataTypes.INTEGER,
			userId: DataTypes.INTEGER,
			locationDelivery: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "Transaction",
		}
	);
	return Transaction;
};
