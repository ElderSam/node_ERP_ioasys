const routes = require("express").Router();

const SessionController = require('./app/controllers/SessionController')
const UserController = require('./app/controllers/UserController')
const authMiddleware = require('./app/middleware/auth');
const adminMiddleware = require('./app/middleware/admin');

// Routes definition
routes.get('/', (req, res) => res.status(200).send('Server running!'))
routes.post('/sessions', SessionController.store)
routes.post('/user', UserController.create)

/* ------------------ Authenticated routes ------------------ */
routes.use(authMiddleware)

routes.get('/dashboard', (req, res) => {
    res.status(200).send()
})
routes.get('/users/me', UserController.myUserInfo)

routes.put('/users/:id', UserController.update)

/* --------- Admin routes ---------  */
routes.use(adminMiddleware)

routes.get('/users', UserController.list)
routes.get('/users/:id', UserController.listById)

module.exports = routes;