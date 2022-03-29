const { verifyUserIsAdmin } = require("../controllers/UserController");

module.exports = async (req, res, next) => {
	if(!req.userId) res.status(500).send({ message: 'erro userId' })

	await verifyUserIsAdmin(req, res);

	return next();
};
