const { Product, User } = require("../../models/");
const Joi = require("joi");
const { Sequelize, Model, DataTypes } = require("sequelize");

exports.getProducts = async (req, res) => {
	try {
		const products = await Product.findAll({
			include: [
				{
					model: User,
					as: "user",
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
exports.getProductFav = async (req, res) => {
	try {
		const store = await User.findAll({
			include: [
				{
					model: Product,
					as: "products",
					attributes: ["tittle"],
				},
			],
			attributes: {
				exclude: ["createdAt", "updatedAt", "userId"],
			},
		});

		// await User.findAndCountAll({
		// 	include: [{ model: Product, as: "products" }],
		// 	// limit: 3,
		// });

		// products = "56";
		await console.log("fav ==========", store);
		// const products = await Product.findAll({
		// 	include: [
		// 		{
		// 			model: User,
		// 			as: "user",
		// 			attributes: {
		// 				exclude: [
		// 					"createdAt",
		// 					"updatedAt",
		// 					"UserId",
		// 					"role",
		// 					"password",
		// 					"image",
		// 					"gender",
		// 				],
		// 			},
		// 		},
		// 	],
		// 	attributes: {
		// 		exclude: ["createdAt", "updatedAt", "userId"],
		// 	},
		// });
		res.send({
			status: "success",
			message: "Produccts Succesfully Get",
			data: {
				store,
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
		// console.log("chek id", req.userId);
		const product = await Product.findOne({
			where: {
				id,
			},
			include: [
				{
					model: User,
					as: "user",
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
exports.getProductsUser = async (req, res) => {
	try {
		const { id } = req.params;
		const product = await Product.findAll({
			where: {
				userId: id,
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
exports.getProductsPartnerLogin = async (req, res) => {
	try {
		const id = req.userId.id;
		const product = await Product.findAll({
			where: {
				userId: id,
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
		const schema = Joi.object({
			tittle: Joi.string().required(),
			price: Joi.required(),
		});

		const { error } = schema.validate(req.body);

		if (error)
			return res.status(400).send({
				status: "validation failed",
				message: error.details[0].message,
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
		console.log("chek");

		const productCrete = await Product.create({
			...req.body,
			userId: req.userId.id,
			image: req.files.imageFile[0].filename,
		});

		const product = await Product.findOne({
			where: {
				id: productCrete.id,
			},
			include: [
				{
					model: User,
					as: "user",
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
			message: "Product Successfully Added",
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

exports.updateProduct = async (req, res) => {
	try {
		const { body } = req;
		const { id } = req.params;
		// await console.log("isi body", req);

		const schema = Joi.object({
			tittle: Joi.string().required(),
			price: Joi.required(),
		});

		const { error } = schema.validate(req.body);

		if (error)
			return res.status(400).send({
				status: "validation failed",
				message: error.details[0].message,
			});

		if (
			req.files.imageFile == undefined ||
			req.files.imageFile[0] == "undefined"
		) {
		} else {
			body.image = req.files.imageFile[0].filename;
		}

		const checkId = await Product.findOne({
			where: {
				id,
			},
		});

		if (!checkId)
			return res.send({
				status: "success",
				message: `Product with id: ${id} not found`,
			});

		const updateId = await Product.update(
			{
				...body,
			},
			{
				where: {
					id,
				},
			}
		);

		const product = await Product.findOne({
			where: {
				id,
			},
			include: [
				{
					model: User,
					as: "user",
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
			message: "Product Successfully Updated",
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

exports.deleteProduct = async (req, res) => {
	try {
		const { id } = req.params;

		const product = await Product.findOne({
			where: {
				id,
			},
		});

		if (!product) {
			return res.status(400).send({
				status: "error",
				message: "can't found",
			});
		}

		await product.destroy();

		res.send({
			status: "success",
			message: "Product Succesfully Delete",
		});
	} catch (err) {
		console.log(err);
		res.status(500).send({
			status: "error",
			message: "Server Error",
		});
	}
};
