"use strict";
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("Users", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			email: {
				type: Sequelize.STRING,
			},
			password: {
				type: Sequelize.STRING,
			},
			fullName: {
				type: Sequelize.STRING,
			},
			gender: {
				type: Sequelize.STRING,
			},
			phone: {
				type: Sequelize.STRING,
			},
			role: {
				type: Sequelize.STRING,
			},
			image: {
				type: Sequelize.STRING,
			},
			location: {
				type: Sequelize.STRING,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("Users");
	},
};
// "use strict";
// module.exports = {
// 	up: async (queryInterface, Sequelize) => {
// 		await queryInterface.createTable("Users", {
// 			id: {
// 				allowNull: false,
// 				autoIncrement: true,
// 				primaryKey: true,
// 				type: Sequelize.INTEGER,
// 			},
// 			email: {
// 				type: Sequelize.STRING,
// 			},
// 			password: {
// 				type: Sequelize.STRING,
// 			},
// 			fullName: {
// 				type: Sequelize.STRING,
// 			},
// 			gender: {
// 				type: Sequelize.STRING,
// 			},
// 			phone: {
// 				type: Sequelize.STRING,
// 			},
// 			role: {
// 				type: Sequelize.STRING,
// 			},
// 			image: {
// 				type: Sequelize.STRING,
// 				allowNull: true,
// 			},
// 			location: {
// 				type: Sequelize.STRING,
// 			},
// 			createdAt: {
// 				allowNull: false,
// 				type: Sequelize.DATE,
// 			},
// 			updatedAt: {
// 				allowNull: false,
// 				type: Sequelize.DATE,
// 			},
// 		});
// 	},
// 	down: async (queryInterface, Sequelize) => {
// 		await queryInterface.dropTable("Users");
// 	},
// };
