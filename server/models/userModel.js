// server/models/userModel.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'customer',
        enum: ["customer", "agent", "admin"]
    },
    accessToken: {
        type: String
    }
});

UserSchema.virtual('groups', {
    ref: 'group',
    localField: '_id',
    foreignField: 'users'
});

const User = mongoose.model('user', UserSchema);

module.exports = User;