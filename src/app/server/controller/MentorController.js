const express = require('express')
const router = express()
const { connection } = require('../config/sqlDatabase')
const path = require('path')

router.post('/create', (req, res) => {
    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({ message: 'Dosya seçilmedi', success: false });
        }

        const { username, title, content, category } = req.body;
        const uploadedFile = req.files.file;
        const filePath = `uploads/${uploadedFile.name}`;

        uploadedFile.mv(path.resolve(__dirname, `../../../../public/${filePath}`), (err) => {
            if (err) {
                console.error('Dosya kaydedilemedi:', err);
                return res.status(500).json({ message: 'Dosya kaydedilemedi', success: false });
            }

            // Dosya başarıyla yüklendi, veritabanına kaydedebilirsiniz
            connection.query('INSERT INTO edu_table SET ?', { username, title, content, category, image_url: `/uploads/${uploadedFile.name}` }, (dbErr, results) => {
                if (dbErr) {
                    console.error('Veri eklenirken hata oluştu:', dbErr);
                    return res.status(500).json({ message: 'Veri eklenirken bir hata oluştu!', success: false });
                }

                return res.json({ message: 'Veri eklendi', success: true });
            });
        });
    } catch (error) {
        console.error('Hata:', error);
        res.status(500).json({ message: 'Bir hata oluştu', success: false });
    }
});





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





router.get('/getById/:id', async (req, res) => {
    const id_edu = req.params.id;
    connection.query('SELECT * FROM edu_table WHERE id_edu=?', [id_edu], (err, result) => {
        if (err) {
            return res.json({ message: 'veri listelenirken bir hatayla karşılaşıldı!', success: false })
        }
        return res.json(result)
    })

})

router.get('/removeById/:id', async (req, res) => {
    const id_edu = req.params.id;
    connection.query('DELETE FROM edu_table WHERE id_edu=?', [id_edu], (err, result) => {
        if (err) {
            return res.json({ message: 'veri listelenirken bir hatayla karşılaşıldı!', success: false })
        }
        return res.json({ message: 'Başarıyla Silindi.', success: true })

    })

})


module.exports = router