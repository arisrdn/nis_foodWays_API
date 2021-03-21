const { Product } = require("../../models/");
const Joi = require("joi");
const { login } = require("./auth");

exports.getproducts = async (req, res) => {
	try {
		const products = await Product.findAll({
			attributes: {
				exclude: ["createdAt", "updatedAt"],
			},
		});
		res.send({
			status: "success",
			message: "Produccts Succesfully Get",
			data: {
				products,
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

exports.getDetailProduct = async (req, res) => {
	try {
		const { id } = req.params;
		console.log("chek id", req.userId);
		const product = await Product.findOne({
			where: {
				id,
			},
			attributes: {
				exclude: ["createdAt", "updatedAt"],
			},
		});
		res.send({
			status: "success",
			message: "Product Succesfully Get",
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

exports.createProduct = async (req, res) => {
	try {
		const { email, password } = req.body;
		const schema = Joi.object({
			fullName: Joi.string().required(),
			gender: Joi.string().required(),
			phone: Joi.string().required(),
			type: Joi.string().required(),
		});

		const { error } = schema.validate(req.body);

		if (error)
			return res.status(400).send({
				status: "validation failed",
				message: error.details[0].message,
			});

		const product = await User.create({
			...req.body,
			userId: req.userId.id,
		});

		res.send({
			status: "success",
			message: "Product Successfully Added",
			data: {
				product: {
					name: user.name,
					email: user.email,
					token,
				},
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

exports.updateProduct = async (req, res) => {
	try {
		const { body } = req;
		const { id } = req.params;
		await console.log("isi body", req.files);

		const schema = Joi.object({
			email: Joi.string().email().min(10).max(50).required(),
			fullName: Joi.string().required(),
			phone: Joi.string().required(),
			location: Joi.string().required(),
			gender: Joi.string().required(),
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
		const user = await Product.findOne({
			where: {
				id: req.userId.id,
			},
			attributes: {
				exclude: ["createdAt", "updatedAt", "password", "id"],
			},
		});
		res.send({
			status: "success",
			message: "User Succesfully Updated",
			data: {
				user,
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

exports.deleteProduct = async (req, res) => {
	try {
		const { id } = req.params;

		const user = await Product.findOne({
			where: {
				id: id,
			},
		});

		if (!user) {
			return res.status(400).send({
				status: "error",
				message: "can't found",
			});
		}

		await Product.destroy();

		res.send({
			status: "success",
			message: "User Succesfully Delete",
		});
	} catch (err) {
		console.log(err);
		res.status(500).send({
			status: "error",
			message: "Server Error",
		});
	}
};
