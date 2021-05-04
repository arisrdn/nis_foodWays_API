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
			"Restaurants",
			[
				{
					id: 1,
					name: "Burger K",
					image: "bglogo.jpeg",
					location: "106.88203,-6.91506",
					userId: 1,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					id: 2,
					name: "Bensu geprek",
					image: "bensulogo.jpeg",
					location: "106.87618,-6.93505",
					userId: 2,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					id: 3,
					userId: 3,
					name: "sushi ko",
					image: "sushi.jpeg",
					location: "106.87417,-6.90944",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					id: 4,
					userId: 4,
					name: "Donut in",
					image: "donut.jpeg",
					location: "106.89923,-6.89856",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					id: 5,
					userId: 5,
					name: "KF cekas",
					image: "kfc.jpeg",
					location: "106.91802,-6.90633",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					id: 6,
					userId: 6,
					name: "ruSteak",
					image: "stlogo.jpeg",
					location: "106.92057,-6.91158",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					id: 7,
					userId: 7,
					name: "Nasi Bagus",
					image: "nasgor.jpeg",
					location: "106.92037,-6.91663",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					id: 8,
					userId: 8,
					name: "Kopi ku",
					image: "kopi.jpeg",
					location: "106.92566,-6.92052",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					id: 9,
					userId: 9,
					name: "Haus???",
					image: "minuman.jpeg",
					location: "106.92977,-6.92188",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					id: 10,
					userId: 10,
					name: "Enak",
					image: "enak.jpeg",
					location: "106.90843,-6.92246",
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
			"Restaurants",
			{ id: { [Op.in]: [1, 2, 3] } },
			{}
		);
	},
};
