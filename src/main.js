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
app.post('/login', (req, res) => {
    const {username, password} = req.body;

    if (!username || !password) {
        return res.sendStatus(422);
    }

    if (username !== USERNAME && password !== PASSWORD) {
        return res.sendStatus(401);
    }

    try {
        const token = generateAccessToken({
            username: USERNAME,
        });

        let tries = 0;
        while (!req.session.ACCESS_TOKEN && tries < 3) {
            req.session.ACCESS_TOKEN = token;
            req.session.save();
            tries++;
        }

        return res.status(200).send({ACCESS_TOKEN: token});
    } catch (error) {
        console.warn(error);
        return res.sendStatus(500);
    }
});

app.get('/verify', authenticateToken, (req, res) => res.sendStatus(200));

app.delete('/logout', authenticateToken, (req, res) => {
    req.session.destroy(error => {
        if (error) {
            return res.sendStatus(500);
        }

        return res.sendStatus(200);
    });
});

/* Swagger API Documentation */
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

/* Express Endpoints Listen */
app.listen(PORT, () => console.log(`alive on http://localhost:${PORT}`));
