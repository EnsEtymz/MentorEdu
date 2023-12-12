const express = require('express')
const router = express()
const UserSchema = require('../model/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')


// Kullanıcı Kayıt (Register) İşlemi
router.post('/register', async (req, res) => {

    try {
        const { email, username, password, role } = req.body
        const user = await UserSchema.findOne({ email: email })

        if (user) {
            return res.status(500).json({ message: "Bu email zaten mevcut!", success: false })
        }

        const passwordHash = await bcrypt.hash(password, 12)

        const newUser = await UserSchema.create({ email, username, password: passwordHash, role })
        const userToken = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY, { expiresIn: '1h' })
        res.status(201).json({
            success: true,
            message: "Kayıt İşlemi Başarılı.",
            newUser,
            userToken
        })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})



//Kullanıcı Giriş (Login) İşlemi
router.post('/login', async (req, res) => {

    try {
        const { email, password } = req.body
        const user = await UserSchema.findOne({ email })
        if (!user) {
            return res.status(500).json({ message: "Email Bulunamadı!!", success: false })
        }
        const comparePassword = await bcrypt.compare(password, user.password)
        if (!comparePassword) {
            return res.status(500).json({ message: "Parola yanlış!!", success: false })
        }

        const userToken = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' })
        res.status(201).json({
            success: true,
            message: "Giriş Başarılı",
            user,
            userToken
        })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})



//Kullanıcı Parola Sıfırlama İşlemi

const sendMail = (to, subject, text) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'etyimezenes8@gmail.com',
            pass: 'vfru cpxq ampp ghse',
        },
    });

    const mailOptions = {
        from: 'etyimezenes8@gmail.com',
        to,
        subject,
        text,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};





router.post('/forgotpassword', async (req, res) => {
    const { email } = req.body
    const resetLink = 'http://localhost:3000/session/reset-password'
    await sendMail(email, 'Parola Sıfırlama', `Parolanızı sıfırlamak için bağlantı: ${resetLink}`);
    res.json({ success: true, message: 'Parola sıfırlama e-postası gönderildi. Lütfen mail kutunuzu kontrol edin.' });
})

router.post('/resetpassword', async (req, res) => {
    const { email, password } = req.body
    if (password.length < 6) {
        return res.json({ success: false, message: 'Parola en az 6 karakter olmalıdır.' });
    } else {
        const passwordHash = await bcrypt.hash(password, 12)
        await UserSchema.findOneAndUpdate({ email }, { password: passwordHash })
            .then(() => {
                res.json({ success: true, message: "Parola sıfırlama işlemi başarılı." })
            })
            .catch(() => {
                res.json({ success: false, message: "Bir hatayla karşılaşıldı!" })
            })
    }
})




module.exports = router


/*


 


*/