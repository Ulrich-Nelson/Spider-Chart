let sqlite3 = require("sqlite3");

let db = new sqlite3.Database("ubalance.db");

let data = [
    ["'norm'", 0.92, 21, 100, 3.25, 1.625], // normative data, dhi norm=100
//    ["'dupont'", 0.51, 23.4, 84, 10, 2.5],
    ["'durand'", 0.26, 19, 34, 2.1, 1.9],
//    ["'dupond'", 0.41, 37, 46, 5.2, 3.2],
//    ["'durant'", 1.1, 27, 54, 10.5, 1],
    ["'dubois'", 0.92, 31, 20, 4.8, 0.9],
//    ["'jean'", 0.23, 25, 64, 20, 3.1]
];

function chain(i, done) {
    db.run("INSERT INTO Patients (id, shimp, imc, dhi, visual_dependence, proprioception) VALUES (" + data[i].join(",") + ");", {}, function (e) {
        console.log(e);
        if (i + 1 < data.length) {
            chain(i + 1, done);
        } else {
            done();
        }
    });
}

try {
    db.run("DROP TABLE IF EXISTS Patients;", {}, function (e) {
        console.log(e);
        db.run("CREATE TABLE Patients (id TEXT NOT NULL PRIMARY KEY, shimp REAL NOT NULL, imc REAL NOT NULL, dhi REAL NOT NULL, visual_dependence REAL NOT NULL, proprioception REAL NOT NULL);", {}, function (e) {
            console.log(e);
            chain(0, function () {
                db.all("SELECT * FROM Patients;", [], (e, rows) => {
                    console.log(e);
                    // WARNING: not sure that norm is rows[0] because of internal SQLite storage
                    let norm = [rows[0].shimp, rows[0].imc, rows[0].dhi, rows[0].visual_dependence, rows[0].proprioception];
                    console.log(norm);
                    let targets = [];
                    for (let i = 1; i < rows.length; i++) {
                        let coefficients = [rows[i].shimp / rows[0].shimp, rows[i].imc / rows[0].imc, rows[i].dhi / rows[0].dhi, rows[i].visual_dependence / rows[0].visual_dependence, rows[i].proprioception / rows[0].proprioception];
                        let target = {coefficients: coefficients, name: rows[i].id};
                        targets.push(target);
                    }
                    console.log(targets);
                });
            });
        });
    });
} catch (e) {
    console.log(e);
}

db.close();
