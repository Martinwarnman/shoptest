const express = require('express')
const sqlite3 = require('sqlite3').verbose();
const app = express()
const port = 3000

app.use(express.static('public'))

app.get('/', (req, res) => res.send('Hello World!'))


app.get('/getProducts' ,function (req, res){
    let sql = 'SELECT * FROM products';
    let db = new sqlite3.Database('./web.db', (err) => {
        if (err) {
          console.error(err.message);
        }
        console.log('Connected to the chinook database.');
      });
      
      db.serialize(() => {
        db.all(sql, (err, row) => {
          if (err) {
            console.error(err.message);
          }
          //console.log(row.id + "\t" + row.name);
          res.json(row)
        });
      });
       

      db.close((err) => {
        if (err) {
          console.error(err.message);
        }
        console.log('Close the database connection.');
      });
       // res.send("error")
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`))

