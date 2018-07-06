let express = require("express");
let cors = require("cors");
let bodyParser = require('body-parser');
 
let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
 
app.use(cors());
app.post("/", function (req, res) {
    let title = req.body.title;
    let message = req.body.message;
    res.writeHead(200, {'Content-Type': "application/json"});
    res.end(JSON.stringify({result: (title + message).toString().toUpperCase()}));
});
 
app.listen(process.env.PORT || 4000);
 
console.log("Server started port 4000");