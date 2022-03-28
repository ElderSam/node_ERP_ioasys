module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define(
		"User",
		{
			name: DataTypes.STRING,
			email: DataTypes.STRING,
			password_hash: DataTypes.STRING,
            isAdmin: DataTypes.ENUM(0, 1),
		},
		{
			hooks: {
				beforeSave: async (user) => {
					user.password_hash = "123";
				},
			},
		}
	);

	return User;
};