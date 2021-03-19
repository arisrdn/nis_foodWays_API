const EscapeElastic = require("elasticsearch-sanitize");

exports.textSanitaize = (req, res, next) => {
	try {
		const { body } = req;
		for (var key in body) {
			var data = body[key];
			dataCheck = EscapeElastic(data);
			if (data !== dataCheck) {
				console.log("data sanitasi ", data, "sesudah", dataCheck);
				return res.status(400).send({
					status: "error",
					message: "not allowed characters",
				});
			}

			next();
		}
	} catch (error) {
		return res.status(400).send({
			status: "error",
			message: "Not allowed characters",
		});
	}
};
