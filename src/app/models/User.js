const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define(
		"User",
		{
			name: DataTypes.STRING,
			email: DataTypes.STRING,
			password: DataTypes.VIRTUAL,
			password_hash: DataTypes.STRING,
			isAdmin: DataTypes.ENUM(0, 1),
		},
		{
			hooks: {
				beforeSave: async (user) => {
					if (user.password) {
						user.password_hash = await bcrypt.hash(
							user.password,
							8
						);
					}
				},
			},
		}
	);

	return User;
};
