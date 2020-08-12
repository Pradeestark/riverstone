// In this file you can configure migrate-mongo
const dbConfig = require("./app/config")

const config = {
    mongodb: {
        // TODO Change (or review) the url to your MongoDB:
        url: `mongodb://${dbConfig.host}:${dbConfig.port}`,

        // TODO Change this to your database name:
        databaseName: `${dbConfig.database}`,

        options: {
            useNewUrlParser: true, // removes a deprecation warning when connecting
            useUnifiedTopology: true, // removes a deprecating warning when connecting
        }
    },

    // The migrations dir, can be an relative or absolute path. Only edit this when really necessary.
    migrationsDir: "./app/migrations",

    // The mongodb collection where the applied changes are stored. Only edit this when really necessary.
    changelogCollectionName: "changelog",

    // The file extension to create migrations and search for in migration dir 
    migrationFileExtension: ".js"
};

// Return the config as a promise
module.exports = config;