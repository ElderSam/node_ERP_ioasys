const routes = require("express").Router();

const SessionController = require('./app/controllers/SessionController')
const authMiddleware = require('./app/middleware/auth');

// Routes definition
routes.get('/', (req, res) => res.status(200).send('Server running!'))
routes.post('/sessions', SessionController.store)

/* ------------------ Authenticated routes ------------------ */
routes.use(authMiddleware)

routes.get('/dashboard', (req, res) => {
    res.status(200).send()
})

module.exports = routes;