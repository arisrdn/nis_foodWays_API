const { Product, Restaurant } = require("../../models/");
const Joi = require("joi");
const URL = process.env.URL;

exports.getProducts = async (req, res) => {
	try {
		const products = await Product.findAll({
			include: [
				{
					model: Restaurant,
					as: "restaurant",
					attributes: {
						exclude: ["createdAt", "updatedAt", "UserId"],
					},
				},
			],
			attributes: {
				exclude: ["createdAt", "updatedAt", "restaurantId"],
			},
		});
		res.send({
			status: "success",
			message: "Produccts Successfully Get",
			data: {
				products,
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

exports.getDetailProduct = async (req, res) => {
	try {
		const { id } = req.params;
		const product = await Product.findOne({
			where: {
				id,
			},
			include: [
				{
					model: Restaurant,
					as: "restaurant",
					attributes: {
						exclude: ["createdAt", "updatedAt", "UserId"],
					},
				},
			],
			attributes: {
				exclude: ["createdAt", "updatedAt", "restaurantId"],
			},
		});
		res.send({
			status: "success",
			message: "Product Successfully Get",
			data: {
				product,
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

exports.getProductsRestaurant = async (req, res) => {
	try {
		const { id } = req.params;
		const products = await Product.findAll({
			where: {
				restaurantId: id,
			},
			attributes: {
				exclude: ["createdAt", "updatedAt"],
			},
		});

		if (!products) {
			return res.status(400).send({
				status: "error",
				message: "product doesn't exist",
			});
		}
		res.send({
			status: "success",
			message: "Products Succesfully Get",
			data: {
				products,
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

		const restaurant = await Restaurant.findOne({
			where: {
				userId: req.userId.id,
			},
		});
		if (!restaurant)
			return res.status(400).send({
				status: "Create Failed",
				message: `You don't have a restaurant`,
			});

		console.log("eataurant", restaurant);
		const productCrete = await Product.create({
			...req.body,
			restaurantId: restaurant.id,
			image: req.files.imageFile[0].filename,
		});

		const product = await Product.findOne({
			where: {
				id: productCrete.id,
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
				exclude: ["createdAt", "updatedAt"],
			},
		});
		res.send({
			status: "success",
			message: "Product Successfully Added",
			data: {
				product,
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

exports.updateProduct = async (req, res) => {
	try {
		const { body } = req;
		const { id } = req.params;
		// await console.log("isi body", req);

		const schema = Joi.object({
			tittle: Joi.string().required(),
			price: Joi.number().required(),
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
					model: Restaurant,
					as: "restaurant",
					attributes: {
						exclude: ["createdAt", "updatedAt", "UserId"],
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
				message: "product doesn't exist",
			});
		}
		const restaurant = await Restaurant.findOne({
			where: {
				userId: req.userId.id,
			},
		});
		if (!restaurant) {
			return res.status(400).send({
				status: "delete Failed",
				message: "cannot be accessed for deletion",
			});
		}

		if (product.restaurantId !== restaurant.id) {
			return res.status(400).send({
				status: "delete Failed",
				message: "cannot be accessed for deletion",
			});
		}
		await product.destroy();

		res.send({
			status: "success",
			message: "Product Succesfully Deleted",
		});
	} catch (err) {
		console.log(err);
		res.status(500).send({
			status: "error",
			message: "Server Error",
		});
	}
};
