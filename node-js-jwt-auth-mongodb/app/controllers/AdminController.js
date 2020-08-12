const model = require("../models");
const _ = require("lodash")

exports.listUser = async(req, res) => {
    try {
        let users = await model.user.find({ role: 'USER' }, { password: 0, __v: 0 })
        return res.status(200).send({ statusCode: 200, data: users })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ statusCode: 500, data: { error: error, errorType: "server" } });
    }
};

exports.updateUser = async(req, res) => {
    try {
        let user = await model.user.findOne({ _id: req.params.id });
        user.status = user.status == 'active' ? 'inactive' : 'active';
        let updated_user = await user.save()
        updated_user = _.pick(updated_user, ['_id', 'username', 'email', 'status', 'role', 'createdAt', 'updatedAt'])
        return res.status(200).send({ statusCode: 200, data: updated_user })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ statusCode: 500, data: { error: error, errorType: "server" } });
    }
};