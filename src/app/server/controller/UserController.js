const express = require('express')
const router = express()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const { connection } = require('../config/sqlDatabase')



// Kullanıcı Kayıt (Register) İşlemi
router.post('/register', async (req, res) => {

    try {
        const { email, username, password, role } = req.body
        const passwordHash = await bcrypt.hash(password, 12)
        const emailCheck = 'SELECT COUNT(*) as count from user_table WHERE email=?';

        connection.query(emailCheck, [email], (err, result) => {
            if (err) {
                return res.json({ message: 'Email check işlemi esnasında hata oluştu.', success: false })
            }

            const emailCount = result[0].count;

            if (emailCount > 0) {

                return res.json({ message: 'Bu e-posta adresi zaten kullanımda.', success: false });
            }
            else {
                const registerQuery = 'INSERT INTO user_table (email, username, password, role) VaLUES (?, ?, ?, ?)'

                connection.query(registerQuery, [email, username, passwordHash, role], (err, registerResult) => {
                    if (err) {
                        return res.json({ message: 'Kayıt oluştururken bir sorunla karşılaşıldı', err, success: false })
                    }
                    const newUserId = registerResult.insertId;
                    const userToken = jwt.sign({ id: newUserId }, process.env.SECRET_KEY, { expiresIn: '1h' })
                    return res.json({
                        message: 'Kayıt işlemi başarılı', success: true, newUser: { _id: newUserId, email, username, role }, userToken
                    })
                })
            }
        })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})



//Kullanıcı Giriş (Login) İşlemi
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const emailCheck = 'SELECT * from user_table WHERE email=?';

        connection.query(emailCheck, [email], async (err, result) => {
            if (err) {
                return res.json({ message: 'Email check işlemi esnasında hata oluştu.', success: false });
            }

            if (!result[0]) {
                return res.json({ message: 'Email bulunamadı.', success: false });
            }

            const comparePassword = await bcrypt.compare(password, result[0].password);

            if (!comparePassword) {
                return res.status(500).json({ message: "Parola yanlış!!", success: false });
            }

            const userToken = jwt.sign({ id: result[0]._id }, process.env.SECRET_KEY, { expiresIn: '1h' });

            return res.status(201).json({
                success: true,
                message: "Giriş Başarılı",
                user: result[0],
                userToken
            });
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



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
    const passwordHash = await bcrypt.hash(password, 12)

    if (password.length < 6) {
        res.json({ message: 'Parola 6 haneden küçük olamaz.', success: false })
    } else {

        const resetQuery = 'UPDATE user_table SET password=? WHERE email=?'
        connection.query(resetQuery, [email, passwordHash], (err, result) => {
            if (err) {
                return res.json({ message: 'Parola güncelleme esnasında bir hata oluştu', success: false })
            }
            return res.json({ message: 'Parola değiştirme işlemi başarılı.', success: true })
        })
    }
})




module.exports = router


/*


 


*/