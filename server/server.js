// server/server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const path = require('path')
const helmet = require('helmet');
const Cookies = require('cookies')

const User = require('./models/userModel')

const userRouter = require('./routes/users');
const loginRouter = require('./routes/login');
const indexRouter = require('./routes/index');

require("dotenv").config({
    path: path.join(__dirname, "../.env")
});

const app = express();
const PORT = process.env.PORT;

app.use(helmet());
app.disable('x-powered-by');

mongoose
    .connect('mongodb://localhost:' + process.env.DB_PORT + '/rbac')
    .then(() => {
        console.log('Connected to the Database successfully');
    });

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/login', loginRouter);

app.use(async (req, res, next) => {
    var cookies = new Cookies(req, res)
    var accessToken = cookies.get('accessToken');

    if (accessToken) {
        const { userId, exp } = await jwt.verify(accessToken, process.env.JWT_SECRET);
        // Check if token has expired
        if (exp < Date.now().valueOf() / 1000) {
            return res.status(401).json({ error: "JWT token has expired, please login to obtain a new one" });
        }

        res.locals.loggedInUser = await User.findById(userId); 
        next();
    } else {
        next();
    }
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/users', userRouter);
app.use('/', indexRouter);

app.listen(PORT, () => {
    console.log('Server is listening on Port:', PORT)
})