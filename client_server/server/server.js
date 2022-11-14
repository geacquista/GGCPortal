const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')

app.use(cors());
app.use(express.json())

// this will change when we use cloud
const db = mysql.createConnection({
    user: "root",
    host:"localhost",
    password: "ThisPassword2?",
    database: "OrderWarehouseGGC"
});

app.post('/create', (req, res) => {
    const name = req.body.name //get info from front end
    const price = req.body.price
    const type = req.body.type

    db.query('INSERT INTO orders (name, price, type) VALUES (?,?,?)', 
    [name, price, type], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send("Values inserted");
        }
    })
});
app.listen(3001, ()=> {
    console.log("yay, server running")
})