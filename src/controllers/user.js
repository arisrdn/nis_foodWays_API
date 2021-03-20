const { User } = require("../../models/");
const Sanitasi = require("../middleware/textSanitaze");
const Joi = require("joi");

exports.getLogin = async (req, res) => {
	try {
		// console.log("body =", req.body);
		const { body } = req;

		for (var key in body) {
			var value = body[key];
			await Sanitasi(value, res);
		}

		const { email, password } = body;

		const schema = Joi.object({
			email: Joi.string().email().min(10).max(30).required(),
		});

		const { error } = schema.validate({
			email,
		});

		if (error) {
			console.log("login eror ", error);
			return res.status(400).send({
				status: "error",
				message: error.details[0].message,
			});
		}
		const userFromDatabase = await User.findOne({
			where: {
				email,
				password,
			},
			attributes: {
				exclude: [
					"createdAt",
					"updatedAt",
					"password",
					"location",
					"phone",
					"role",
					"gender",
					"image",
					"id",
				],
				// include: ["fullName", "email"],
			},
		});

		if (userFromDatabase === null) {
			console.log("error user", userFromDatabase);
			return res.status(400).send({
				status: "validation failed",
				message: "wrong email or password",
			});
		}
		const user = userFromDatabase.toJSON();
		user.token = "879789789798798";
		// console.log("chek ", user);

		res.send({
			status: "success",
			message: "Login Succes",
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

exports.getUsers = async (req, res) => {
	try {
		const users = await User.findAll({
			attributes: {
				exclude: ["createdAt", "updatedAt", "password"],
			},
		});
		res.send({
			status: "success",
			message: "Users Succesfully Get",
			data: {
				users,
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

exports.getDetaillUser = async (req, res) => {};

exports.updateUser = async (req, res) => {};

exports.deleteUser = async (req, res) => {};
