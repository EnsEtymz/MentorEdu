const express = require('express');
const { connection } = require('../config/sqlDatabase');
const router = express();


router.get('/videolistall', async (req, res) => {
    connection.query('SELECT * FROM edu_table', (err, results) => {
        if (err) {
            console.error('Veri listelenirken bir hata oluştu:', err);
            return res.json({ message: 'veri listelenirken bir hatayla karşılaşıldı!', success: false })
        }
        return res.json(results)
    })
})


router.post('/increaseClick', async (req, res) => {
    const { id_edu } = req.body;

    // Burada videoId, tıklanan kartın benzersiz bir kimliği olmalı
    // Örneğin, videolar tablosundaki bir PRIMARY KEY
    const query = 'UPDATE edu_table SET click = click + 1 WHERE id_edu = ?';

    await connection.query(query, [id_edu], (error, results) => {
        if (error) {
            console.error('Click artırma hatası:', error);
            res.status(500).json({ error: 'Click artırma sırasında bir hata oluştu' });
            return;
        }

        res.status(200).json({ success: true, id_edu: id_edu });
    });
})


router.get('/top6videos', async (req, res) => {
    await connection.query('SELECT * FROM edu_table ORDER BY click DESC LIMIT 6', (err, results) => {
        if (err) {
            return res.json({ message: 'Hata Oluştu!' })
        }
        return res.json(results)
    })
})


module.exports = router;
