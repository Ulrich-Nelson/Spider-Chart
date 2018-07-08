/* global __dirname */

var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
let sqlite3 = require("sqlite3");

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

function query(callback) {
    let db = new sqlite3.Database("ubalance.db");

    db.all("SELECT * FROM Patients;", [], (e, rows) => {
        console.log(e);
        let norm = [rows[0].shimp, rows[0].imc, rows[0].dhi, rows[0].visual_dependence, rows[0].proprioception];
        let targets = [];
        for (let i = 1; i < rows.length; i++) {
            // WARNING: not sure that norm is rows[0] because of internal SQLite storage
            let coefficients = [rows[i].shimp / rows[0].shimp, rows[i].imc / rows[0].imc, rows[i].dhi / rows[0].dhi, rows[i].visual_dependence / rows[0].visual_dependence, rows[i].proprioception / rows[0].proprioception];
            let target = {coefficients: coefficients, name: rows[i].id};
            targets.push(target);
        }
        callback(targets);
    });

    db.close();
}

app.post("/get_data", function (req, res) {
    res.writeHead(200, {'Content-Type': "application/json"});
    query(function (targets) {
        let data = {
            labels: ['SHIMP', 'IMC', 'DHI', 'Visual Dependence', 'Proprioception', 'Muscular Strength'],
            targets: targets,
            interiorRatios: [0.25, 0.50, 0.75]
        };
        res.write(JSON.stringify(data));
        res.end();
    });
    console.log("Data sent");
});

app.listen(process.env.PORT || 5000);

console.log("Server started port 5000");
