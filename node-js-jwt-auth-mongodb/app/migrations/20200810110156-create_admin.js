const jwt = require("../services/jwt")
const { v4: uuidv4 } = require('uuid');

const adminEmail = "subash@mavinzent.com"

module.exports = {
    async up(db, client) {
        let user = {
            _id: uuidv4(),
            username: "subash",
            status: "active",
            email: adminEmail,
            password: await jwt.hashPassword("subash"),
            role: "ADMIN",
            createdAt: new Date(),
            updatedAt: new Date()
        }
        await db.collection('users').insertOne(user);
    },

    async down(db, client) {
        await db.collection('users').deleteOne({ email: adminEmail });
    }
};