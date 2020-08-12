const express = require('express')
const router = express()
const Controller = require('../controllers')

router.post('/sign_up', Controller.UserController.signUp)
router.post('/login', Controller.UserController.login)
router.post('/forgot_password', Controller.UserController.forgotPassword)
router.post('/reset_password', Controller.UserController.resetPassword)
router.post('/validate_reset_token', Controller.UserController.validateResetToken)

module.exports = router