const { Restaurant, Product, User, Transaction } = require("../../models/");
const { Op, Sequelize } = require("sequelize");
const Joi = require("joi");
const URL = process.env.URL;
const URL2 = process.env.URL;

exports.createRestaurant = async (req, res) => {
	try {
		const check = await Restaurant.findOne({
			where: {
				userId: req.userId.id,
			},
		});

		if (check)
			return res.status(400).send({
				status: "Create Failed",
				message: `you already have a restaurant`,
			});
		if (
			req.files.imageFile == undefined ||
			req.files.imageFile[0] == "undefined"
		) {
			return res.status(400).send({
				status: "validation failed",
				message: "Please select image to upload",
			});
		}
		const schema = Joi.object({
			name: Joi.string().required(),
			location: Joi.string().required(),
		});
		console.log(req.body);

		const { error } = schema.validate(req.body);

		if (error)
			return res.status(400).send({
				status: "validation failed",
				message: error.details[0].message,
			});

		const restaurantCreate = await Restaurant.create({
			...req.body,
			userId: req.userId.id,
			image: req.files.imageFile[0].filename,
		});

		const restaurant = await Restaurant.findAll({
			where: {
				id: restaurantCreate,
			},
			include: [
				{
					model: User,
					as: "partner",
					attributes: {
						exclude: [
							"createdAt",
							"updatedAt",
							"UserId",
							"role",
							"password",
							"image",
							"gender",
							"id",
						],
					},
				},
			],
			attributes: {
				exclude: ["createdAt", "updatedAt", "userId"],
			},
		});
		res.send({
			status: "success",
			message: "Restaurant Successfully Created",
			data: {
				restaurant,
			},
		});
	} catch (err) {
		console.log(err);
		res.status(500).send({
			status: "error",
			message: "Server Error",
		});
	}
};

exports.updateRestaurant = async (req, res) => {
	try {
		const { body } = req;
		userId = req.userId.id;

		const schema = Joi.object({
			name: Joi.string().required(),
			location: Joi.required(),
		});

		const { error } = schema.validate(req.body);

		if (error)
			return res.status(400).send({
				status: "validation failed",
				message: error.details[0].message,
			});

		const restaurantUpdate = await Restaurant.findOne({
			where: {
				userId,
			},
		});
		// console.log("usr id", restaurantUpdate);
		if (restaurantUpdate.id == undefined)
			return res.status(400).send({
				status: "Update Failed",
				message: `You don't have a restaurant`,
			});

		if (
			req.files.imageFile == undefined ||
			req.files.imageFile[0] == "undefined"
		) {
		} else {
			body.image = req.files.imageFile[0].filename;
		}
		await Restaurant.update(body, {
			where: {
				id: restaurantUpdate.id,
			},
		});

		const restaurant = await Restaurant.findOne({
			where: {
				id: restaurantUpdate.id,
			},
			include: [
				{
					model: User,
					as: "partner",
					attributes: {
						exclude: [
							"createdAt",
							"updatedAt",
							"UserId",
							"role",
							"password",
							"image",
							"gender",
						],
					},
				},
			],
			attributes: {
				exclude: ["createdAt", "updatedAt"],
			},
		});
		res.send({
			status: "success",
			message: "Restaurant Successfully Updated",
			data: {
				restaurant,
			},
		});
	} catch (err) {
		console.log(err);
		res.status(500).send({
			status: "error",
			message: "Server Error",
		});
	}
};

exports.getRestaurants = async (req, res) => {
	try {
		if (req.userId == undefined) {
			userId = null;
		} else {
			userId = req.userId.id;
		}

		const restaurants = await Restaurant.findAll({
			where: {
				userId: {
					[Op.ne]: userId,
				},
			},
			include: [
				{
					model: User,
					as: "partner",
					attributes: {
						exclude: [
							"createdAt",
							"updatedAt",
							"UserId",
							"role",
							"password",
							"image",
							"gender",
						],
					},
				},
			],
			attributes: {
				exclude: ["createdAt", "updatedAt", "userId"],
			},
		});
		res.send({
			status: "success",
			message: "restaurants Succesfully Get",
			data: {
				restaurants,
				url: URL,
			},
		});
	} catch (err) {
		console.log(err);
		res.status(500).send({
			status: "error",
			message: "Server Error",
		});
	}
};
exports.getRestaurant = async (req, res) => {
	try {
		// const { id } = req.params;
		const restaurant = await Restaurant.findOne({
			where: {
				userId: req.userId.id,
			},
			include: [
				{
					model: Product,
					as: "products",
					attributes: {
						exclude: ["createdAt", "updatedAt"],
					},
				},
				{
					model: Transaction,
					as: "transactions",
					attributes: {
						exclude: ["createdAt", "updatedAt"],
					},
				},
			],
			attributes: {
				exclude: ["createdAt", "updatedAt", "userId"],
			},
		});
		res.send({
			status: "success",
			message: "Restaurant Succesfully Get",
			data: {
				restaurant,
				url: URL,
				url2: URL2,
			},
		});
	} catch (err) {
		console.log(err);
		res.status(500).send({
			status: "error",
			message: "Server Error",
		});
	}
};
exports.getDetailRestaurant = async (req, res) => {
	try {
		const { id } = req.params;
		const restaurant = await Restaurant.findOne({
			where: {
				id,
			},
			include: [
				{
					model: Product,
					as: "products",
					attributes: {
						exclude: ["createdAt", "updatedAt"],
					},
				},
			],
			attributes: {
				exclude: ["createdAt", "updatedAt", "userId"],
			},
		});
		res.send({
			status: "success",
			message: "Restaurant Succesfully Get",
			data: {
				restaurant,
			},
		});
	} catch (err) {
		console.log(err);
		res.status(500).send({
			status: "error",
			message: "Server Error",
		});
	}
};

exports.getRestaurantFav = async (req, res) => {
	try {
		// const restaurantsData = await Restaurant.findAll({
		// 	include: [
		// 		{
		// 			model: Transaction,
		// 			as: "transactions",
		// 			attributes: {
		// 				exclude: ["createdAt", "updatedAt"],
		// 			},
		// 		},
		// 	],
		// 	attributes: {
		// 		exclude: ["createdAt", "updatedAt", "userId"],
		// 	},
		// });
		// const restaurantsString = JSON.stringify(restaurantsData);
		// const restaurantsObject = JSON.parse(restaurantsString);
		// const restaurants = restaurantsObject.map((product) => ({
		// 	...product,
		// 	transactions: product.transactions.length,
		// }));

		const restaurantsData = await Restaurant.findAll({
			attributes: [
				"Restaurant.id",
				"Restaurant.name",
				"Restaurant.image",
				"Restaurant.location",
				[
					Sequelize.literal(
						"(SELECT COUNT(*) FROM Transactions WHERE Transactions.restaurantId = Restaurant.id)"
					),
					"transactionCount",
				],
			],
			order: [[Sequelize.literal("transactionCount"), "DESC"]],
			raw: true,
			limit: 4,
		});
		const restaurantsString = JSON.stringify(restaurantsData);
		const restaurantsObject = JSON.parse(restaurantsString);
		const restaurants = restaurantsObject.map((product) => ({
			...product,
			image: URL + product.image,
		}));
		res.send({
			status: "success",
			message: "Restaurant Favorit Succesfully Get",
			data: {
				restaurants,
				// chek,
			},
		});
	} catch (err) {
		console.log(err);
		res.status(500).send({
			status: "error",
			message: "Server Error",
		});
	}
};
