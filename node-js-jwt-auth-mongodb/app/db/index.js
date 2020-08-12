const dbConfig = require("../config");
const model = require("../models");

module.exports = class DB {
    static init() {
        model.mongoose
            .connect(`mongodb://${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
            .then(() => {
                console.log("Successfully connect to MongoDB.");
            })
            .catch(err => {
                console.error("Connection error", err);
                process.exit();
            });
    }
}