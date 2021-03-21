// const EscapeElastic = require("elasticsearch-sanitize");

exports.textSanitaze = async (req, res, next) => {
	try {
		EscapeElastic = (query) => {
			return (
				query
					// .replace(/[\*\+\-=~><\"\?^\${}\(\)\:\!\/[\]\\\s]/g, "\\$&") // replace single character special characters
					.replace(/[*+?^${}()|[\]\\]/g, "\\$&")
					.replace(/\|\|/g, "\\||") // replace ||
					.replace(/\&\&/g, "\\&&") // replace &&
					.replace(/AND/g, "\\A\\N\\D") // replace AND
					.replace(/OR/g, "\\O\\R") // replace OR
					.replace(/NOT/g, "\\N\\O\\T")
			);
		};

		const { body } = req;
		for (var key in body) {
			var data = body[key];
			dataCheck = EscapeElastic(data);
			console.log("data sanitasi ", data, "sesudah", dataCheck);
			if (data !== dataCheck) {
				return res.status(400).send({
					status: "error",
					message: "not allowed characters",
				});
			}
		}
		next();
	} catch (error) {
		console.log(error);
		return res.status(400).send({
			status: "error",
			message: "Not allowed characters",
		});
	}
};
