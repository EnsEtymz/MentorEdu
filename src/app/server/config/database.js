const mongoose = require('mongoose');

const db = () => {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log('MogoDB bağlantısı başarıyla sağlandı.')
        })
        .catch((error) => {
            console.error('Error connecting to MongoDB:', error)
        });
}

module.exports = db;