const routes = require("express").Router();
const SessionController = require('./app/controllers/SessionController')

// Routes definition
routes.post('/sessions', SessionController.store)

module.exports = routes;