const mongoose = require('mongoose');

const dbConnection = async (collection, cb) => {
    await mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(async () => {
            const db = await mongoose.connection.collection(collection);
            await cb(db);
            await mongoose.connection.close();
        })
        .catch(err => {
            console.error('Error connecting to the database:', err);
        });
};

module.exports = dbConnection;
