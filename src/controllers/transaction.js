const { Product, User, Transaction, Order } = require("../../models/");
const Joi = require("joi");
const { Op } = require("sequelize");
const order = require("../../models/order");
exports.getTransactionPartner = async (req, res) => {
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

		// const transaction = await Transaction.findAll({
		// 	where: { partnerId: req.userId.id },
		// 	include: [
		// 		{
		// 			model: User,
		// 			as: "userOrder",
		// 			attributes: {
		// 				exclude: [
		// 					"createdAt",
		// 					"updatedAt",
		// 					"userId",
		// 					"role",
		// 					"password",
		// 					"image",
		// 					"gender",
		// 				],
		// 			},
		// 		},
		// 		{
		// 			model: Order,
		// 			as: "order",

		// 			attributes: {
		// 				exclude: ["createdAt", "updatedAt"],
		// 			},
		// 		},
		// 	],
		// 	attributes: {
		// 		exclude: ["createdAt", "updatedAt", "partnerId"],
		// 	},
		// });
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

exports.getDetailTransaction = async (req, res) => {
	try {
		const { id } = req.params;
		const transaction = await Transaction.findOne({
			where: {
				id,
			},
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
			],
			attributes: {
				exclude: ["createdAt", "updatedAt", "partnerId", "userId"],
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

		console.log("products", orders);

		const transaction = await Transaction.create({
			userId: req.userId.id,
			shippingFee: body.shippingFee,
			locationDelivery: body.locationDelivery,
			partnerId: orders[0].userId,
			status: "Waiting Approval",
		});

		for (let i = 0; i < orders.length; i++) {
			await Order.create({
				transactionId: transaction.id,
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
		const userOrder = await User.findOne({
			where: {
				id: req.userId.id,
			},
			attributes: {
				exclude: ["password", "image", "role", "createdAt", "updatedAt"],
			},
		});

		res.send({
			status: "success",
			message: "Success Add New Transaction",
			data: {
				transaction: {
					id: transaction.id,
					userOrder,
					status: transaction.status,
					orders,
				},
			},
		});
	} catch (error) {
		console.log(error);
		res.status(500).send(...errorResponse);
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
