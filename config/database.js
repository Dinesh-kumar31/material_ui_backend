    const mongoose = require("mongoose");
    const { MONGO_URI } = process.env;

    exports.connnect = () => {
        mongoose.connect(MONGO_URI, {
            useNewURLParser: true,
            useUnifiedTopology: true,
        }).then(() => {
            console.log("Successfully connected to database");
        }).catch((error) => {
            console.log("database connection failed");
            console.error(error);
        })
    }