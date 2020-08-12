const model = require("../models");
const UserService = require("../services/UserService");
const UserMailer = require("../mailers/services/UserMailer")
const jwt = require("../services/jwt");

exports.signUp = async(req, res) => {

    let isExist = await model.user.findOne({ email: req.body.email })
    if (isExist)
        return res.status(400).send({ statusCode: 400, message: "Email already exist" });

    UserService.signUp(req.body).then(response => {
        return res.send(response);
    }).catch(err => {
        return res.send(err);
    })

};

exports.login = async(req, res) => {
    UserService.loginUser(req.body).then(response => {
        res.send(response);
    }).catch(err => {
        res.send(err);
    })
};

exports.forgotPassword = (req, res) => {
    let { email } = req.body;
    UserService.sendResetPassword(email).then(token => {
        res.send({ statusCode: 200, message: "Email sent successfully" });
    }).catch(err => {
        res.send(err);
    })
}

exports.resetPassword = (req, res) => {
    let { token, newPassword } = req.body
    if (!token)
        res.send({ statusCode: 400, message: "Token not found" });

    UserService.resetPassword(token, newPassword).then(resp => {
        res.send(resp);
    }).catch(err => {
        res.send(err);
    })
}

exports.validateResetToken = async(req, res) => {
    let { token } = req.body
    UserService.validateResetToken(token).then(resp => {
        res.send(resp);
    }).catch(err => {
        res.send(err);
    })
}