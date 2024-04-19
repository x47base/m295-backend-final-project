/* Packages */
const express = require('express');

/* Middleware Imports */
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const session = require('express-session');

/* API Automatic Documentation Endpoint */
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/swagger.json');

/* Token Authentication Function */
const {generateAccessToken, authenticateToken} = require('./modules/auth');

/* Express App */
const app = express();

/* Variables & Constants */
const PORT = process.env.PORT || 3000;
const USERNAME = 'zli';
const PASSWORD = 'zli1234';

/* API Logging Function */
const logRequest = (req, res, next) => {
    const date = new Date();
    console.log(`[${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}] ${req.method} ${req.path}`);
    next();
};

/* Middleware(s) */
app.use(logRequest);
app.use(cookieParser());
app.use(cors({
    origin: '*',
}));
app.use(session({
    secret: '2xrjrVgxkqKF62f86ZiHoZKOfOqGd0wqCPMk3qu35mojOyVLBF8uOwhHL3iokqkU',
    resave: true,
    saveUninitialized: true,
}));

/* Endpoints */
app.get('/', (req, res) => res.sendStatus(200));

/* Tasks */
const tasks = require('./routes/tasks');
app.use('/tasks', bodyParser.json());
app.use('/tasks', authenticateToken);
app.use('/tasks', tasks);

/* Authentication */
app.use('/login', bodyParser.json());
app.post('/login', (req, res) => {});

app.get('/verify', authenticateToken, (req, res) => {});

app.delete('/logout', authenticateToken, (req, res) => {});

/* Swagger API Documentation */
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

/* Express Endpoints Listen */
app.listen(PORT, () => console.log(`alive on http://localhost:${PORT}`));
