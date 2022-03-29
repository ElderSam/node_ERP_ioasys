const request = require("supertest");
const { faker } = require('@faker-js/faker');

const app = require("../../src/app");
const truncate = require("../utils/truncate");
const factory = require("../factories");

describe("Create User", () => {
	beforeEach(async () => {
		await truncate();
	});

    it("should create a new user", async () => {
        const response = await request(app).post("/user").send({
			name: 'User test',
			email: 'teste@gmail.com',
			password: "123123",
		});

		expect(response.status).toBe(200);
		expect(typeof response.body.id).toBe('number')
    })

    it("should not create a new user when email exists", async () => {
        const user = await factory.create("User", {
			password: "123123",
		});

        const response = await request(app).post("/user").send({
			name: 'Test',
			email: user.email,
			password: "123123",
		});

		expect(response.status).toBe(422);
    })

    it("should not create a new user when not pass email", async () => {
        const response = await request(app).post("/user").send({
			name: faker.name.findName(),
			password: faker.internet.password()
		});

		expect(response.status).toBe(400);
    })

	it("should not create a new user when not pass name", async () => {
        const response = await request(app).post("/user").send({
			email: faker.internet.email(),
			password: faker.internet.password()
		});

		expect(response.status).toBe(400);
    })

	it("should not create a new user when not pass password", async () => {
        const response = await request(app).post("/user").send({
			name: faker.name.findName(),
			email: faker.internet.email(),
		});

		expect(response.status).toBe(400);
    })
});
