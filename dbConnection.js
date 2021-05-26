//Import the mongoose module
const mongoose = require('mongoose');


function initDatabaseConnection(dbHostname, dbPort) {
    //Set up default mongoose connection
    const mongoDB = `mongodb://${dbHostname}:${dbPort}/shop`;
    mongoose.connect(mongoDB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    });

    //Get the default connection
    const db = mongoose.connection;

    //Bind connection to error event (to get notification of connection errors)
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    db.once('open', function () {
        console.log("MongoDB connected");
    });
}

module.exports = initDatabaseConnection;
