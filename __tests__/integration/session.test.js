const request = require("supertest");

const app = require("../../src/app");
const { User } = require("../../src/app/models");
const truncate = require("../utils/truncate")

describe("Authentication", () => {
	beforeEach(async () => {
		await truncate();
	})

	it("should authenticate with valid credentials", async () => {
		const user = await User.create({
			name: "Samuel",
			email: "test@gmail.com.br",
			password: "123123",
		});

		expect(user.email).toBe("test@gmail.com.br")

		const response = await request(app).post("/sessions").send({
			email: user.email,
			password: "123123",
		});

		expect(response.status).toBe(200);
	});

	it("should not authenticate with invalid credentials", async () => {
		const user = await User.create({
			name: "Samuel",
			email: "test@gmail.com.br",
			password: "123123",
			// isAdmin: 0
		});

		const response = await request(app).post("/sessions").send({
			email: user.email,
			password: "123456",
		});

		expect(response.status).toBe(401);
	});

	it("should return JWT token when authenticated", async () => {
		const user = await User.create({
			name: "Samuel",
			email: "sam@gmail.com",
			password: "123123",
		});

		const response = await request(app)
			.post("/sessions")
			.send({
				email: user.email,
				password: "123123",
			});

		expect(response.body).toHaveProperty('token');
	});
});