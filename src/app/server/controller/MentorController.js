const express = require('express')
const router = express()
const { connection } = require('../config/sqlDatabase')

router.post('/create', (req, res) => {
    const { username, title, content, category } = req.body

    connection.query('INSERT INTO edu_table SET ?', { username, title, content, category }, (err, results) => {
        if (err) {
            console.error('Veri eklenirken hata oluştu:', err);
            return res.json({ message: 'veri eklenirken bir hatayla karşılaşıldı!', success: false })

        }
        return res.json({ message: 'veri eklendi', success: true })
    });

})


router.post('/listid', async (req, res) => {
    const { username } = req.body

    connection.query('SELECT * FROM edu_table WHERE username =?', [username], (err, results) => {
        if (err) {
            console.error('Veri listelenirken bir hata oluştu:', err);
            return res.json({ message: 'veri listelenirken bir hatayla karşılaşıldı!', success: false })
        }
        return res.json(results)
    })


})



module.exports = router