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
			"Products",
			[
				{
					id: 1,
					tittle: "ayam geprek",
					price: 24000,
					image: "ayam-geprek.jpg",
					userid: 2,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					id: 2,
					tittle: "ayam merica",
					price: 18000,
					image: "ayam-merica.jpg",
					userid: 2,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					id: 3,
					tittle: "ayam geprek",
					price: 24000,
					image: "ayam-geprek.jpg",
					userid: 2,
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
			"Products",
			{ id: { [Op.in]: [1, 2, 3] } },
			{}
		);
	},
};
