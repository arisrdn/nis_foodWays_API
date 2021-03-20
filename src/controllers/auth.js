const { User } = require("../../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const dotenv = require("dotenv");
dotenv.config();

exports.login = async (req, res) => {
	try {
		const { email, password } = req.body;
		// console.log("cek req", res.send);
		//   validasi
		const schema = Joi.object({
			email: Joi.string().email().min(10).max(50).required(),
			password: Joi.string().min(8).required(),
		});

		//   mengambil eror dari joi
		const { error } = schema.validate(req.body);

		//   cek jika ada error
		if (error)
			return res.status(400).send({
				status: "validation failed",
				message: error.details[0].message,
			});

		// chek email di database
		const checkEmail = await User.findOne({
			where: {
				email,
			},
		});

		if (!checkEmail)
			return res.status(400).send({
				status: "Login Failed",
				message: "Your Credentials is not Valid",
			});

		// bcryp password
		const isValidPass = await bcrypt.compare(password, checkEmail.password);

		if (!isValidPass) {
			return res.status(400).send({
				status: "Login Failed",
				message: "Your Credentials is not Valid",
			});
		}

		//   konfigurasi token
		const secretKey = process.env.SECRET_KEY;
		//   ubah id jadi token
		const token = jwt.sign(
			{
				id: checkEmail.id,
			},
			secretKey
		);
		// console.log(token);

		res.status(200).send({
			status: "success",
			message: "Login Success",
			data: {
				user: {
					fullName: checkEmail.fullName,
					email: checkEmail.email,
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

exports.register = async (req, res) => {
	try {
		console.log("email=", req.body);

		const { email, password } = req.body;
		const schema = Joi.object({
			email: Joi.string().email().min(10).max(50).required(),
			password: Joi.string().min(8).required(),
			fullName: Joi.string().required(),
			gender: Joi.string().required(),
			phone: Joi.string().required(),
		});

		const { error } = schema.validate(req.body);

		if (error)
			return res.status(400).send({
				status: "validation failed",
				message: error.details[0].message,
			});

		const checkEmail = await User.findOne({
			where: {
				email,
			},
		});
		if (checkEmail)
			return res.status(400).send({
				status: "Register failed",
				message: "Email already registered",
			});

		const hashStrength = parseInt(process.env.PASSWORD_STRENGTH);
		const hashedPassword = await bcrypt.hash(password, hashStrength);
		// console.log("secret kode2", process.env.SECRET_KEY);

		const user = await User.create({
			...req.body,
			password: hashedPassword,
		});

		const secretKey = process.env.SECRET_KEY;

		const token = jwt.sign(
			{
				id: user.id,
			},
			secretKey
		);

		res.send({
			status: "success",
			message: "User Succesfully Registered",
			data: {
				user: {
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

let todos = [
	{
		id: 1,
		title: "Belajar Express",
		isDone: false,
	},
	{
		id: 2,
		title: "Belajar Node.js",
		isDone: true,
	},
];

exports.register1 = (req, res) => {
	console.log("email=", req.body);
	console.log("secret kode ", process.env.SECRET_KEY);
	res.send({
		status: "success",
		message: "Todo Succesfully Get",
		data: {
			todos,
		},
	});
};

exports.login1 = (req, res) => {
	res.send({
		status: "success",
		message: "Todo Succesfully Get",
		data: {
			todos,
		},
	});
};
