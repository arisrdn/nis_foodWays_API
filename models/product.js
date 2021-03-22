// "use strict";
// const { Model } = require("sequelize");
// module.exports = (sequelize, DataTypes) => {
// 	class Product extends Model {
// 		/**
// 		 * Helper method for defining associations.
// 		 * This method is not a part of Sequelize lifecycle.
// 		 * The `models/index` file will call this method automatically.
// 		 */
// 		static associate(models) {
// 			// define association here
// 			// Product.belongsTo(models.User, {
// 			// 	as: "user",
// 			// });
// 			// Product.hasMany(models.Order, {
// 			// 	foreignKey: "productId",
// 			// 	as: "product",
// 			// });
// 			// // Product.belongsToMany(models.Category, {
// 			// // 	as: "categories",
// 			// // 	through: {
// 			// // 		model: "CategoryProducts",
// 			// // 		as: "jembatan",
// 			// // 	},
// 			// // });
// 			Product.belongsToMany(models.Transaction, {
// 				// foreignKey: "productId",
// 				through: {
// 					model: "order",
// 					as: "jembatan",
// 					// foreignKey: "productId",
// 				},
// 			});
// 		}
// 	}
// 	Product.init(
// 		{
// 			tittle: DataTypes.STRING,
// 			price: DataTypes.STRING,
// 			image: DataTypes.STRING,
// 			userId: DataTypes.STRING,
// 		},
// 		{
// 			sequelize,
// 			modelName: "Product",
// 		}
// 	);
// 	return Product;
// };

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
			// define association here
			Product.belongsToMany(models.Transaction, {
				// foreignKey: "productId",
				through: {
					model: "order",
					as: "jembatan",
					foreignKey: "productId",
				},
			});
			Product.belongsTo(models.User, {
				as: "user",
			});
			Product.hasMany(models.Order, {
				foreignKey: "productId",
				as: "product",
			});
		}
	}
	Product.init(
		{
			tittle: DataTypes.STRING,
			price: DataTypes.INTEGER,
			userId: DataTypes.INTEGER,
			image: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "Product",
		}
	);
	return Product;
};
