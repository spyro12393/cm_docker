const {exec} = require('child_process');
const bodyParser = require("body-parser");
const express = require('express');
const router = express.Router();

const app = express();
const port = 3000;

let fs = require('fs');
let obj = JSON.parse(fs.readFileSync('./config.json', 'utf-8'));

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/execScipts', (req, res) => {
    let result = [];
    let script = exec('sh ./scripts.sh', (error, stdout, stderr) => {
        result.push(stdout);
        result.push("test")
        if(error!==null){
            result.push(`exec error: ${error}`);
        }
        res.send(result);
    });
    
});

app.post('/', (req, res) => {
    let test = req.body;
    console.log(test);
    res.send("You have posted.");
});

/* 
    // Input type Json.
    {
        "innoDB": "[dbname]",
        "columnStore": "[dbname]",
        "tablename": "[tablename]"",
        "conditions": "[where a='TEST']" //optional
    }
*/
app.post('/ConvertTableToColumnStore', function(req, res){
    let result = [];
    let conditions = "";
    if(req.body.conditions){
        conditions = " " + req.body.conditions;
    }
    let cmd = "mariadb -q -e 'select * from " + req.body.innoDB + conditions + ";' -N " + req.body.tablename + " | cpimport -s '\\t' " + req.body.tablename + " " + req.body.columnStore;
    console.log('exec cmd: ', cmd);
    let script = exec(cmd, (error, stdout, stderr) => {
        result.push(stdout);
        result.push("[Error]: ", stderr);
        if(error!==null){
            result.push(`exec error: ${error}`);
        }
        res.send(result);
    });
});

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});
