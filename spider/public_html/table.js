// création de la table
let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('mydb.db');
db.run('CREATE TABLE Patients(name text)');

 /*inserer des valeurs
db.run('INSERT INTO Patients'VALUES(name1),(name2),(name3),(name4),(name5),function(err) {
    if (err){
        returm console.log(err.message);
    }
    console.log('A row has been inserted with rowid ${this.lastID}');
});*/

db.close();



