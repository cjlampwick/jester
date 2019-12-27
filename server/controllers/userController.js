const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Cookies = require('cookies');

const { roles } = require('../roles')

async function hashPassword(password) {
    return await bcrypt.hash(password, 10);
}

async function validatePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
}

exports.signup = async (req, res, next) => {
    try {
        const { email, password, role, name } = req.body
        const hashedPassword = await hashPassword(password);
        const newUser = new User({ 
            email, 
            password: hashedPassword, 
            role: role || "customer",
            name
        });
        const accessToken = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: "1d"
        });
        newUser.accessToken = accessToken;
        
        await newUser.save();
        
        // res.json({
        //     data: newUser,
        //     accessToken
        // })

        const users = await User.find({
            role
        });

        let data={};
        data[role+'s'] = users;

        res.status(200).render(role+'s', data);

    } catch (error) {
        next(error)
    }
}

exports.login = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ email: username });

        if (!user) return next(new Error('Email does not exist'));

        const validPassword = await validatePassword(password, user.password);

        if (!validPassword) return next(new Error('Password is not correct'))

        const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '2 days'
        });

        await User.findByIdAndUpdate(user._id, { accessToken })

        var cookies = new Cookies(req, res)
        cookies.set('accessToken', accessToken);

        res.status(200)
            .redirect('../')

    } catch (error) {
        next(error);
    }
}

exports.logout = async (req, res, next) => {
    var cookies = new Cookies(req, res)
    
    var accessToken = cookies.get('accessToken');
    cookies.set('accessToken', accessToken, { expires: new Date()});

    res.status(200)
        .redirect('../login')
}

exports.getUsers = async (req, res, next) => {
    const users = await User.find({});
    res.status(200).json({
        data: users
    });
}

exports.getCustomers = async (req, res, next) => {
    try{
        const customers = await User.find({
            role: "customer"
        });

        let data = {} ;

        data.actions = [
            {
                name: "Add",
                icon: "add",
                modal: "newCustomer"
            }
        ]

        res.status(200).render('index', {
            title: 'Customers',
            view: 'customers',
            data,
            customers
        });

        next();
    } catch(error){
        next(error)
    }
}

exports.getAgents = async (req, res, next) => {
    try{
        const agents = await User.find({
            role: "agent"
        });

        let data = {} ;

        data.actions = [
            {
                name: "Add",
                icon: "add",
                modal: "newAgent"
            }
        ]

        res.status(200).render('index', {
            title: 'Agents',
            view: 'agents',
            data,
            agents
        });

        next();
    } catch(error){
        next(error)
    }
}

exports.getUser = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);
        if (!user) return next(new Error('User does not exist'));
        res.status(200).json({
            data: user
        });
    } catch (error) {
        next(error)
    }
}

exports.updateUser = async (req, res, next) => {
    try {
        const update = req.body
        const userId = req.params.userId;

        const filter = { _id: req.params.userId };

        await User.findOneAndUpdate(filter, update);

        const user = await User.findById(userId);        

        res.status(200).json({
            data: user,
            message: 'User has been updated'
        });

    } catch (error) {
        next(error)
    }
}

exports.deleteUser = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        await User.findByIdAndDelete(userId);
        res.status(200).json({
            data: null,
            message: 'User has been deleted'
        });
    } catch (error) {
        next(error)
    }
}

exports.grantAccess = function (action, resource) {
    return async (req, res, next) => {
        try {
            const permission = roles.can(req.user.role)[action](resource);
            if (!permission.granted) {
                return res.status(401).json({
                    error: "You don't have enough permission to perform this action"
                });
            }
            next()
        } catch (error) {
            next(error)
        }
    }
}

exports.allowIfLoggedin = async (req, res, next) => {
    try {
        const user = res.locals.loggedInUser;
        if (!user)
            return res.status(401).redirect('../login');
            
        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
}