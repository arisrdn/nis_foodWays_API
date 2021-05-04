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
			"Orders",
			[
				{
					id: 1,
					qty: 3,
					pricePurchased: 24000,
					transactionId: 1,
					productId: 1,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					id: 2,
					qty: 1,
					pricePurchased: 10000,
					transactionId: 1,
					productId: 2,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					id: 3,
					qty: 2,
					pricePurchased: 14000,
					transactionId: 2,
					productId: 1,
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
			"Orders",
			{ id: { [Op.in]: [1, 2, 3] } },
			{}
		);
	},
};
