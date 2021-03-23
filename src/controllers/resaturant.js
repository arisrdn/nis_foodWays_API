const { Restaurant, Product, User } = require("../../models/");
const { Op } = require("sequelize");
const Joi = require("joi");

exports.createRestaurant = async (req, res) => {
	try {
		const check = await Restaurant.findOne({
			where: {
				userId: req.userId.id,
			},
		});

		if (check)
			return res.send({
				status: "Create Failed",
				message: `can only create a restaurant once`,
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

		const restaurans = await Restaurant.findAll({
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
			message: "Restaurans Succesfully Get",
			data: {
				restaurans,
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
		const restaurant = await Restaurant.findAll({
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
				product,
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
