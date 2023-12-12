const mongoose = require('mongoose')

const EduSchema = new mongoose.Schema({
    username: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, required: true },

})

module.exports = mongoose.model('EduSchema', EduSchema)