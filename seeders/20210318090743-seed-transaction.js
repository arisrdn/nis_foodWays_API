"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		/**
		 * Add seed commands here.
		 *
		 * Example:
		 * await queryInterface.bulkInsert('People', [{
		 *   name: 'John Doe',
		 *   isBetaMember: false
		 * }], {});
		 */
		return await queryInterface.bulkInsert(
			"Transactions",
			[
				{
					id: 1,
					status: "on the way",
					locationDelivery: "106.89412071827951,-6.907608398292808",
					shippingFee: 10000,
					userId: 1,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					id: 2,
					status: "on the way",
					locationDelivery: "ayam-geprek.jpg",
					shippingFee: 9000,
					userId: 1,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		);
	},

	down: async (queryInterface, Sequelize) => {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
		return queryInterface.bulkDelete(
			"Transactions",
			{ id: { [Op.in]: [1, 2] } },
			{}
		);
	},
};
