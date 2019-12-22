const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GroupSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    iconUrl: {
        type: String,
        required: false,
        trim: true
    },
    users: [{
        type: Schema.Types.ObjectId, ref: 'user'
    }]
});

const Group = mongoose.model('group', GroupSchema);

module.exports = Group;