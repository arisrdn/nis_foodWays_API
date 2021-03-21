const { User } = require("../../models");

exports.checkRolePartner = async (req, res, next) => {
	try {
		const user = await User.findOne({
			where: {
				id: req.userId.id,
			},
		});

		if (user.role == "PARTNER") {
			next();
		} else {
			res.status(401).send({
				status: "failed",
				message: "only partners have access",
			});
		}
	} catch (error) {
		res.status(401).send({
			status: "failed",
			message: "cannot be accessed",
		});
	}
};

exports.checkRoleUser = async (req, res, next) => {
	try {
		const user = await User.findOne({
			where: {
				id: req.userId.id,
			},
		});

		if (user.role == "USER") {
			next();
		} else {
			res.status(401).send({
				status: "failed",
				message: "only users have access",
			});
		}
	} catch (error) {
		res.status(401).send({
			status: "failed",
			message: "cannot be accessed",
		});
	}
};
