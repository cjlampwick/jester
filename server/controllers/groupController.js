const Group = require('../models/groupModel');

exports.newGroup = async (req, res, next) => {
    try {
        const { name, iconUrl } = req.body
        const newGroup = new Group({ name, iconUrl })

        await newGroup.save();

        res.json({
            data: newGroup
        })
    } catch (error) {
        next(error)
    }
}

exports.removeGroup = async (req, res, next) => {
    try {
        const groupId = req.params.groupId;

        await Group.findByIdAndDelete(groupId);

        res.status(200).send({
            message: "Group removed successfully"
        })
    } catch (error) {
        res.status(500).send({
            message: "Could not delete group",
            error
        })
    }
}

exports.getGroups = async (req, res, next) => {
    try {
        const groups = await Group.find({});
        res.status(200).json({
            data: groups
        });
    } catch (error) {
        next(error)
    }
}