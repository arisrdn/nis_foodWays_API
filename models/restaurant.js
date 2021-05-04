"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Restaurant extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Restaurant.belongsTo(models.User, {
				as: "partner",
				foreignKey: {
					name: "userId",
				},
			});
			Restaurant.hasMany(models.Product, {
				foreignKey: "restaurantId",
				as: "products",
			});
			Restaurant.hasMany(models.Transaction, {
				foreignKey: "restaurantId",
				as: "transactions",
			});
		}
	}
	Restaurant.init(
		{
			name: DataTypes.STRING,
			image: DataTypes.STRING,
			location: DataTypes.STRING,
			userId: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "Restaurant",
		}
	);
	return Restaurant;
};
