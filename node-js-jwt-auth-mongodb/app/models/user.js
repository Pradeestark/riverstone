const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');

const UserSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: uuidv4
    },
    status: {
        type: String,
        default: 'active'
    },
    username: String,
    email: String,
    password: String,
    resetPasswordToken: String,
    resetPasswordExpiry: Date,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    role: {
        required: true,
        type: String,
    }
})

UserSchema.pre("save", async function() {
    this.set({ updatedAt: new Date() });
});

const User = mongoose.model(
    "User", UserSchema
);

module.exports = User;