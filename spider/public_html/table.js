// CREATE TABLE
let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('mydb.db');
//db.run('DROP TABLE [IF EXISTS] Patients');
db.run('CREATE TABLE patients 
	id	TEXT NOT NULL,
	SHIMP	INTEGER NOT NULL,
	IMC	INTEGER NOT NULL,
	DHI	INTEGER NOT NULL,
	Visual_Dependence	INTEGER NOT NULL,
	Proprioception	INTEGER NOT NULL,
	Muscular_Strength	INTEGER NOT NULL
');

//ADD VALUES
//let labels = ['SHIMP', 'IMC', 'DHI', 'Dépendance Visuelle', 'Proprioception', 'Force Musculaire'];
//let placeholders = labels.map((label) => '(?)').join(',');
//let sql = 'INSERT INTO (Patients) VALUES' + placeholders;
//console.log(sql);
//db.run(sql, labels, function (err) {
//    if (err) {
//        return console.error(err.message);
//    }
//    console.log('Rows inserted ${this.changes}');
//});
db.close();





