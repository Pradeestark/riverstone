const model = require("../models");
const jwt = require("../services/jwt")
const UserMailer = require("../mailers/services/UserMailer")
const _ = require("lodash")
module.exports = class UserService {

    static async loginUser(body) {
        return new Promise(async(resolve, reject) => {
            try {
                let user = await model.user.findOne({
                    email: body.email
                })

                if (!user)
                    reject({ statusCode: 401, message: "Unauthorized" });

                let passwordIsValid = await jwt.comparePassword(body.password, user.password)

                if (!passwordIsValid)
                    reject({ statusCode: 401, message: "Unauthorized" });

                let expiresIn = 86400 // 24 hours

                let payload = { id: user._id }

                let token = await jwt.sign(payload, expiresIn)

                let response = _.pick(user, ['_id', 'username', 'email'])

                resolve({
                    statusCode: 200,
                    data: {
                        ...response,
                        accessToken: token
                    }
                });
            } catch (error) {
                console.log(error)
                reject({ statusCode: 500, message: "Something went wrong!", error: error })
            }
        });
    }

    static async signUp(body) {
        return new Promise(async(resolve, reject) => {
            try {
                const user = new model.user({
                    username: body.username,
                    email: body.email,
                    role: 'USER',
                    password: await jwt.hashPassword(body.password)
                });

                user.save((error, user) => {
                    if (error) {
                        console.log(error)
                        reject({ statusCode: 500, message: "Something went wrong!", error: error })
                    }
                    UserMailer.signUp(user).then(data => {
                        console.log(data);
                    })
                    console.log("USER::CREATED")
                    return resolve({ statusCode: 200 })
                });
            } catch (error) {
                console.log(error)
                reject({ statusCode: 500, message: "Something went wrong!", error: error })
            }
        })
    }

    static resetPassword(token, password) {
        return new Promise((resolve, reject) => {
            try {
                model.user.findOne({ resetPasswordToken: token }).then(async user => {
                    if (user) {
                        if (user.resetPasswordExpiry < new Date()) {
                            reject({ statusCode: 400, message: 'Token expired' })
                        } else {
                            console.log(token, password)
                            user.password = await jwt.hashPassword(password)
                            user.resetPasswordToken = null
                            user.resetPasswordExpiry = null
                            user.save().then(user => {
                                resolve({ statusCode: 200, message: 'Reset password successful' })
                            }).catch(error => {
                                console.log(error)
                                reject({ statusCode: 500, message: "Something went wrong!", error: error })
                            })
                        }
                    } else {
                        reject({ statusCode: 400, message: 'Invalid token' })
                    }
                }).catch(error => {
                    console.log(error)
                    reject({ statusCode: 500, message: "Something went wrong!", error: error })
                })
            } catch (error) {
                reject({ statusCode: 500, message: "Something went wrong!", error: error })
            }
        });
    }

    static sendResetPassword(email) {
        return new Promise((resolve, reject) => {
            model.user.findOne({ email: email }).then(async user => {
                if (user) {
                    user.resetPasswordToken = await jwt.hashPassword(new Date().getTime().toString())
                    user.resetPasswordExpiry = new Date(new Date().getTime() + (60 * 60 * 1000));
                    user.save().then(async user => {
                        UserMailer.forgotPassword(user).then(data => {
                            console.log(data);
                        })
                        resolve({ statusCode: 200, message: 'Email sent successfully' })
                    }).catch(err => {
                        console.log(err);
                        reject({ statusCode: 500, message: "Something went wrong!", error: error })
                    })
                } else {
                    reject({ statusCode: 400, message: 'Email not exists' })
                }
            })
        });
    }

    static validateResetToken(token) {
        return new Promise((resolve, reject) => {
            console.log(token)
            model.user.findOne({ resetPasswordToken: token }).then(async user => {
                if (user) {
                    if (user.resetPasswordExpiry < new Date()) {
                        reject({ statusCode: 400, data: false })
                    } else {
                        resolve({ statusCode: 200, data: true })
                    }
                } else {
                    reject({ statusCode: 400, data: false })
                }
            })
        });
    }
}