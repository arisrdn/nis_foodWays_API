const EscapeElastic = require("elasticsearch-sanitize");

module.exports = async (data, res) => {
	dataCheck = EscapeElastic(data);
	if (data !== dataCheck) {
		console.log("data sanitasi ", data, "sesudah", dataCheck);
		return res.status(400).send({
			status: "error",
			message: "not allowed characters",
		});
	}

	return data;
};

// module.exports = {
// 	input: function (data) {
// 		dataCheck = EscapeElastic(data);
// 		if (data !== dataCheck) {
// 			return res.status(400).send({
// 				status: "error",
// 				message: "not allowed characters",
// 			});
// 		}

// 		return data;
// 	},
// };
