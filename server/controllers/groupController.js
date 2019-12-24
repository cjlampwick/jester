const Group = require('../models/groupModel');

let data = {
    actions: []
};

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

        data.actions = [
            {
                name: "Add",
                icon: "add",
                modal: "newGroup"
            }
        ]

        res.status(200).render('index', {
            title: 'Groups',
            view: 'groups',
            data,
            groups
        });

        next();
    } catch (error) {
        next(error)
    }
}

exports.getGroup = async (req, res, next) => {
    try {
        const group = await Group.findById(req.params.groupId);

        if (!group)
            return res.status(404).json({
                message: "Group not found"
            })

        res.status(200).json({
            data: group
        });
    } catch (error) {
        next(error)
    }
}