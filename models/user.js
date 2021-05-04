"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			User.hasOne(models.Restaurant, {
				as: "restaurant",
				foreignKey: "userId",
			});

			User.hasMany(models.Transaction, {
				foreignKey: "userId",
				as: "transactions",
			});
		}
	}
	User.init(
		{
			email: DataTypes.STRING,
			password: DataTypes.STRING,
			fullName: DataTypes.STRING,
			gender: DataTypes.STRING,
			phone: DataTypes.STRING,
			image: DataTypes.STRING,
			location: DataTypes.STRING,
			role: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "User",
		}
	);
	return User;
};
