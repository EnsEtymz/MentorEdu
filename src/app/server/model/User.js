const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
    {
        email: { type: String, required: true },
        username: { type: String, required: true },
        password: { type: String, required: true },
        role: { type: String },
        date: { type: Date, default: new Date() }

    }
)
module.exports = mongoose.model('UserSchema', UserSchema)