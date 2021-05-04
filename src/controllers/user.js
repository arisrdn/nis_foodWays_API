const { User, Restaurant, Transaction, Order } = require("../../models/");
const Joi = require("joi");
const URL = process.env.URL;

exports.getUsers = async (req, res) => {
	try {
		const users = await User.findAll({
			include: [
				{
					model: Restaurant,
					as: "restaurant",
					attributes: {
						exclude: ["createdAt", "updatedAt", "userId"],
					},
				},
			],
			attributes: {
				exclude: ["createdAt", "updatedAt", "password"],
			},
		});
		res.send({
			status: "success",
			message: "Users Succesfully Get",
			data: {
				users,
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

exports.getDetailUser = async (req, res) => {
	try {
		console.log("chek id", req.userId);
		const user = await User.findOne({
			where: {
				id: req.userId.id,
			},
			include: [
				{
					model: Restaurant,
					as: "restaurant",
					attributes: {
						exclude: ["createdAt", "updatedAt", "userId"],
					},
				},
				{
					model: Transaction,
					as: "transactions",
					attributes: {
						exclude: ["createdAt", "userId"],
					},
					order: ["updatedAt", "DESC"],
					include: [
						{
							model: Restaurant,
							as: "restaurant",
							attributes: {
								exclude: ["createdAt", "userId"],
							},
						},
						{
							model: Order,
							as: "orders",
							attributes: {
								exclude: ["createdAt", "userId"],
							},
						},
					],
				},
			],
			attributes: {
				exclude: ["createdAt", "updatedAt", "password"],
			},
		});
		res.send({
			status: "success",
			message: "Users Succesfully Get",
			data: {
				user,
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

exports.updateUser = async (req, res) => {
	try {
		const { body } = req;

		await console.log("isi body", req.files);
		const schema = Joi.object({
			// email: Joi.string().email().min(10).max(50).required(),
			fullName: Joi.string().required(),
			phone: Joi.string().required(),
			location: Joi.string().required(),
			// gender: Joi.string().required(),
		});

		const { error } = schema.validate(req.body);

		if (error)
			return res.status(400).send({
				status: "validation failed",
				message: error.details[0].message,
			});

		body.image = req.files.imageFile[0].filename;

		await console.log("body", body);
		await console.log("ok", req.userId);

		await User.update(body, {
			where: {
				id: req.userId.id,
			},
		});

		const user = await User.findOne({
			where: {
				id: req.userId.id,
			},
			include: [
				{
					model: Restaurant,
					as: "restaurant",
					attributes: {
						exclude: ["createdAt", "updatedAt", "userId"],
					},
				},
			],
			attributes: {
				exclude: ["createdAt", "updatedAt", "password", "id"],
			},
		});
		// user.fullName = fullName;
		// user.email = email;
		// user.location = location;
		// user.phone = phone;
		// user.gender = gender;
		// user.image = req.files.imageFile[0].filename;
		// await user.save();

		res.send({
			status: "success",
			message: "User Succesfully Updated",
			data: {
				user,
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

exports.deleteUser = async (req, res) => {
	try {
		const { id } = req.params;

		const user = await User.findOne({
			where: {
				id: id,
			},
		});

		if (!user) {
			return res.status(400).send({
				status: "error",
				message: "user not exist",
			});
		}

		await user.destroy();

		res.send({
			status: "success",
			message: "User Successfully Delete",
		});
	} catch (err) {
		console.log(err);
		res.status(500).send({
			status: "error",
			message: "Server Error",
		});
	}
};
