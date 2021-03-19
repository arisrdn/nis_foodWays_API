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
			"Users",
			[
				{
					id: 1,
					email: "user1@gmail.com",
					password: "ngacak123",
					fullName: "aris user",
					gender: "male",
					phone: "0876543215678",
					role: "user",
					image: "user1.jpg",
					location: "106.89412071827951,-6.907608398292808",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					id: 2,
					email: "user2@gmail.com",
					password: "ngacak123",
					fullName: "aris partner",
					gender: "male",
					phone: "0876543215678",
					role: "partner",
					image: "user2.jpg",
					location: "106.89858056149086,-6.8854488843342665",
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
		return queryInterface.bulkDelete("Users", { id: { [Op.in]: [1, 2] } }, {});
	},
};
