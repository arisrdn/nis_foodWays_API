const {
	Product,
	User,
	Transaction,
	Order,
	Restaurant,
} = require("../../models/");
const Joi = require("joi");
const { Op } = require("sequelize");

exports.getTransactions = async (req, res) => {
	try {
		const transactions = await Transaction.findAll({
			include: [
				{
					model: Restaurant,
					as: "restaurant",
					attributes: {
						exclude: ["createdAt", "updatedAt", "userId", "id"],
					},
				},

				{
					model: Order,
					as: "orders",
					attributes: {
						exclude: ["createdAt", "updatedAt"],
					},
					include: {
						model: Product,
						as: "product",
						attributes: ["tittle", "image"],
					},
				},
			],
			attributes: {
				exclude: ["createdAt", "updatedAt", "partnerId"],
			},
		});
		res.send({
			status: "success",
			message: "Transactions Succesfully Get",
			data: {
				transactions,
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

exports.getDetailTransaction = async (req, res) => {
	try {
		const { id } = req.params;
		const transaction = await Transaction.findOne({
			where: {
				id,
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
					model: User,
					as: "userOrder",
					attributes: {
						exclude: [
							"createdAt",
							"updatedAt",
							"userId",
							"role",
							"password",
							"image",
							"gender",
						],
					},
				},
				{
					model: Order,
					as: "orders",
					attributes: {
						exclude: ["createdAt", "updatedAt"],
					},
					include: {
						model: Product,
						as: "product",
						attributes: ["tittle", "image"],
					},
				},
			],
			attributes: {
				exclude: ["createdAt", "updatedAt", "restaurantId", "userId"],
			},
		});
		res.send({
			status: "success",
			message: "Product Succesfully Get",
			data: {
				transaction,
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

exports.createTransaction = async (req, res) => {
	try {
		const { body } = req;

		// console.log("body", body);
		const orders = [];

		for (let i = 0; i < body.product.length; i++) {
			const getProduct = await Product.findOne({
				where: {
					id: body.product[i].id,
				},
				attributes: {
					exclude: ["createdAt", "updatedAt"],
				},
			});

			const productqty = {
				...getProduct.dataValues,
				qty: body.product[i].qty,
			};

			orders.push(productqty);
		}

		// console.log("products", orders[0]);

		const transactionCreate = await Transaction.create({
			userId: req.userId.id,
			shippingFee: body.shippingFee,
			locationDelivery: body.locationDelivery,
			restaurantId: orders[0].restaurantId,
			status: "Waiting Approve",
			isRead: 1,
		});

		for (let i = 0; i < orders.length; i++) {
			await Order.create({
				transactionId: transactionCreate.id,
				productId: orders[i].id,
				pricePurchased: orders[i].price,
				qty: orders[i].qty,
			});
		}
		// const order = await Order.bulkCreate(
		// 	orders.map((product) => ({
		// 		transactionId: transaction.id,
		// 		productId: product.id,
		// 		pricePurchased: product.price,
		// 		qty: product.qty,
		// 	}))
		// );

		const transaction = await Transaction.findOne({
			where: {
				id: transactionCreate.id,
			},
			include: [
				{
					model: Restaurant,
					as: "restaurant",
					attributes: {
						exclude: ["createdAt", "updatedAt", "userId", "id"],
					},
				},
				{
					model: User,
					as: "userOrder",
					attributes: {
						exclude: [
							"createdAt",
							"updatedAt",
							"userId",
							"role",
							"password",
							"image",
							"gender",
						],
					},
				},
				{
					model: Order,
					as: "orders",
					attributes: {
						exclude: ["createdAt", "updatedAt"],
					},
					include: {
						model: Product,
						as: "product",
						attributes: ["tittle", "image"],
					},
				},
			],
			attributes: {
				exclude: ["createdAt", "updatedAt", "restaurantId", "userId"],
			},
		});

		res.send({
			status: "success",
			message: "Success Add New Transaction",
			data: {
				transaction,
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

exports.getUserTransactions = async (req, res) => {
	try {
		const transactions = await Transaction.findAll({
			where: { userId: req.userId.id },
			include: [
				{
					model: Restaurant,
					as: "restaurant",
					attributes: {
						exclude: ["createdAt", "updatedAt", "userId", "id"],
					},
				},

				{
					model: Order,
					as: "orders",
					attributes: {
						exclude: ["createdAt", "updatedAt"],
					},
					include: {
						model: Product,
						as: "product",
						attributes: ["tittle", "image"],
					},
				},
			],
			attributes: {
				exclude: ["createdAt", "updatedAt", "partnerId"],
			},
			order: [["id", "DESC"]],
		});
		res.send({
			status: "success",
			message: "Transactions Succesfully Get",
			data: {
				transactions,
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
exports.getRestaurantTransactions = async (req, res) => {
	try {
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
		const transactions = await Transaction.findAll({
			where: { restaurantId: restaurant.id },
			include: [
				{
					model: User,
					as: "userOrder",
					attributes: {
						exclude: [
							"createdAt",
							"updatedAt",
							"userId",
							"role",
							"password",
							"image",
							"gender",
						],
					},
				},
				{
					model: Order,
					as: "orders",
					attributes: {
						exclude: ["createdAt", "updatedAt"],
					},
					include: {
						model: Product,
						as: "product",
						attributes: ["tittle", "image"],
					},
				},
			],
			attributes: {
				exclude: ["createdAt", "updatedAt", "partnerId"],
			},
		});
		res.send({
			status: "success",
			message: "Transactions Succesfully Get",
			data: {
				transactions,
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

exports.updatIsRead = async (req, res) => {
	try {
		const { id } = req.params;
		const transaction = await Transaction.findOne({
			where: {
				id,
			},

			attributes: {
				exclude: ["createdAt", "updatedAt", "restaurantId", "userId"],
			},
		});
		transaction.isRead = 0;
		transaction.save();
		res.send({
			status: "success",
			message: "isRead Succesfully Update",
			data: {
				transaction,
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

exports.editTransaction = async (req, res) => {
	try {
		const { body } = req;
		const { id } = req.params;

		const transactionEdit = await Transaction.findOne({
			where: {
				id,
			},
		});
		const restaurant = await Restaurant.findOne({
			where: {
				userId: req.userId.id,
			},
		});
		if (transactionEdit.id == undefined)
			return res.status(404).send({
				status: "Error",
				message: "Transactions not found",
			});

		// const schemaTransactionInput = Joi.object({
		// 	status: Joi.string().required(),
		// });

		// const { error } = schemaTransactionInput.validate(body);

		// if (error)
		// 	return res.status(400).send({
		// 		status: "There's error in your data input",
		// 		message: error.details[0].message,
		// 	});

		const idCheck = req.userId.id;

		switch (body.status) {
			case "APPROVE":
				if (transactionEdit.restaurantId != restaurant.id) {
					return res.send({
						status: "Error",
						message: "You haven't authorization to edit this transaction.",
					});
				}
				transactionEdit.status = "On The Way";

				break;
			case "CANCEL":
				if (transactionEdit.restaurantId != restaurant.id) {
					return res.send({
						status: "Error",
						message: "You haven't authorization to edit this transaction.",
					});
				}
				transactionEdit.status = "Cancel";
				break;
			case "SUCCESS":
				if (transactionEdit.userId != idCheck) {
					return res.send({
						status: "Error",
						message: "You haven't authorization to edit this transaction.",
					});
				}
				transactionEdit.status = "Success";
				break;

			default:
				break;
		}
		transactionEdit.isRead = 1;
		await transactionEdit.save();

		const transaction = await Transaction.findOne({
			where: {
				id: transactionEdit.id,
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
					model: User,
					as: "userOrder",
					attributes: {
						exclude: [
							"createdAt",
							"updatedAt",
							"userId",
							"role",
							"password",
							"image",
							"gender",
						],
					},
				},
				{
					model: Order,
					as: "orders",
					attributes: {
						exclude: ["createdAt", "updatedAt"],
					},
					include: {
						model: Product,
						as: "product",
						attributes: ["tittle", "image"],
					},
				},
			],
			attributes: {
				exclude: ["createdAt", "updatedAt", "restaurantId", "userId"],
			},
		});
		res.send({
			status: "success",
			message: "Success Edit Transaction",
			data: {
				transaction,
			},
		});
	} catch (error) {
		console.log(err);
		res.status(500).send({
			status: "error",
			message: "Server Error",
		});
	}
};
exports.getTest = async (req, res) => {
	try {
		const transaction = await Transaction.findAll({
			where: { partnerId: req.userId.id },
			include: [
				{
					model: User,
					as: "userOrder",
					attributes: {
						exclude: [
							"createdAt",
							"updatedAt",
							"userId",
							"role",
							"password",
							"image",
							"gender",
						],
					},
				},
				{
					model: Product,
					// as: "order",
					through: {
						model: Order,
						as: "detail",
					},
					attributes: {
						exclude: ["createdAt", "updatedAt"],
					},
				},
			],
			attributes: {
				exclude: ["createdAt", "updatedAt", "partnerId"],
			},
		});

		res.send({
			status: "success",
			message: "Products Succesfully Get",
			data: {
				transaction,
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
