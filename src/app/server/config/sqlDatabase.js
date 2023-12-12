// config/sqlDatabase.js

const mysql = require('mysql');

// MySQL bağlantı bilgileri
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'mentoredu',
});

// MySQL bağlantısını aç
const sqlDatabase = () => {
    connection.connect((err) => {
        if (err) {
            console.error('MySQL bağlantısı başarısız:', err);
            throw err;
        }
        console.log('MySQL bağlantısı başarıyla sağlandı.');
    });


};

module.exports = {
    sqlDatabase,
    connection,
};
