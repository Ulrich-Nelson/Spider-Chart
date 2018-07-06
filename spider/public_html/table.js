// CREATE TABLE
let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('mydb.db');
db.run('DROP TABLE IF EXISTS Patients');
let sql = 'CREATE TABLE Patients (id TEXT NOT NULL,shimp INTEGER NOT NULL,imc INTEGER NOT NULL,dhi INTEGER NOT NULL,visual_dependence INTEGER NOT NULL,proprioception INTEGER NOT NULL, muscular_strength INTEGER NOT NULL)';
db.run(sql);
db.close();


/*,\n\
SHIMP INTEGER NOT NULL,IMC INTEGER NOT NULL,\n\
DHI	INTEGER NOT NULL,\n\
Visual_Dependence	INTEGER NOT NULL,\n\
Proprioception	INTEGER NOT NULL,\n\
 Muscular_Strength	INTEGER NOT NULL)';*/
