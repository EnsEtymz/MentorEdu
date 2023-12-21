const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const userController = require('./controller/UserController');
const MentorController = require('./controller/MentorController')
const StudentController = require('./controller/StudentController')
const dotenv = require('dotenv');
const { sqlDatabase } = require('./config/sqlDatabase');
const fileUpload = require('express-fileupload');

dotenv.config()


sqlDatabase()

app.use(cors())
app.use(express.static(__dirname))
app.use(fileUpload());

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// /register endpoint'i için yeni middleware'i kullanma
app.use('/user', userController);

//  Mentor için middleware
app.use('/mentor', MentorController)

//Student için middleware
app.use('/student', StudentController)




app.listen(process.env.PORT, () => {
    console.log(`Server ${process.env.PORT} portunda çalışıyor...`)
})