const { User } = require("../models");

function validateFields(data) {
	const keys = Object.keys(data);

	const fieldsErr = [];
	keys.forEach((key) => {
		if (!data[key]) fieldsErr.push(key);
	});

	return fieldsErr;
}

const verifyUserIsAdmin = async (req, res) => {
	try {
		if (!req.userId) res.status(500).send({ message: "erro userId" });

		const user = await User.findOne({ where: { id: req.userId } });
		if (!user.is_admin) {
			return res
				.status(403)
				.json({ message: "User does not have admin permission" });
		}
		return true;
	} catch (err) {
		return res.status(401).json({ message: "Token invalid" });
	}
};

async function create(req, res) {
	const { name, email, password, is_admin } = req.body;
	const userData = { name, email, password, is_admin };

	const auxData = { ...userData };
	delete auxData.is_admin;
	const errors = validateFields(auxData);

	if (errors.length > 0) {
		const errorStr = errors.toString().replaceAll(",", ", ");

		return res
			.status(400)
			.json({ message: `required fields: ${errorStr}` });
	}

	const user = await User.findOne({ where: { email } });

	if (user) {
		return res.status(422).json({
			message: "There is already a registered user with this email",
		});
	}

	try {
		const newUser = await User.create(userData);

		return res.status(200).send({
			id: newUser.id,
			name: newUser.name,
			email: newUser.email,
			is_admin: newUser.is_admin,
		});
	} catch (err) {
		return res.status(500).json({
			message:
				"Error when trying to insert new user into database. " + err,
		});
	}
}

async function update(req, res) {
	const id = parseInt(req.params.id);
	if (id != req.userId) {
		// update my user
		await verifyUserIsAdmin(req, res);
	}

	const loggedUser = await User.findOne({ where: { id: req.userId } });
	if (!loggedUser.dataValues.is_admin) {
		// if the logged user is not admin
		delete req.body.is_admin;
	}
	return updateUser(req, res);
}

async function updateUser(req, res) {
	const id = parseInt(req.params.id);
	const { name, email, password, is_admin } = req.body;
	const userData = { name, email, password, is_admin };

	const auxData = { ...userData };
	delete auxData.is_admin;
	const errors = validateFields(auxData);

	if (errors.length > 0) {
		const errorStr = errors.toString().replaceAll(",", ", ");

		return res
			.status(400)
			.json({ message: `required fields: ${errorStr}` });
	}

	const user = await User.findOne({ where: { email } });

	if (user && user.dataValues && user.dataValues.id !== id) {
		return res.status(422).json({
			message: "There is already a registered user with this email",
		});
	}

	try {
		const updUser = await User.update(userData, { where: { id } });
		if (updUser[0] === 1) return res.status(200).send({});
	} catch (err) {
		return res.status(500).json({
			message: "Error when trying to update user into database. " + err,
		});
	}
}

async function list(req, res) {
	const users = await User.findAll();

	const listRes = users.map(({ dataValues }) => {
		delete dataValues.password_hash;
		return dataValues;
	});

	return res.status(200).send({ users: listRes });
}

async function listById(req, res, id = false) {
	const user = await User.findOne({ where: { id: req.params.id } });
	delete user.dataValues.password_hash;

	return res.status(200).send({ user });
}

async function myUserInfo(req, res) {
	if (!req.userId)
		res.status(500).send({ message: "error: userId not defined" });

	const user = await User.findOne({ where: { id: req.userId } });
	delete user.dataValues.password_hash;

	return res.status(200).send({ user });
}

async function deleteById(req, res) {
	if (!req.params.id) res.status(500).send({ message: "id not provided" });

	await User.destroy({ where: { id: req.params.id } })
	return res.status(200).send({});
}

module.exports = {
	create,
	list,
	verifyUserIsAdmin,
	listById,
	myUserInfo,
	update,
	deleteById,
}; // UserController
