const mysql = require('mysql2/promise');

// const connection = mysql.createPool({
//     host: 'localhost',
//     user: 'demoprojects',
//     // user:'root',
//     // password:'',
//     // database:'goa',
//     password: '#demoProjects#$4@',
//     database: 'goagamesclub',
//     port: 8000
// });

//for local testing 
// const connection = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     password: '',  // XAMPP's default root password is blank
//     database: '1xbet',

//     port: 3306
// });


const connection = mysql.createPool({
        host: '127.0.0.1',
        user: 'root',
        password: 'Lokesh@123',
        database: 'gamedb',
        port: 3306
    });
    

module.exports = connection;
