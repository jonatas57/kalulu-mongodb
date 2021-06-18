const fs = require('fs')
const express = require('express')
const { getFilename } = require('./util')
const { MongoClient } = require("mongodb")
const bodyParser = require('body-parser')
const uri = process.env.MONGODB_URI

const client = new MongoClient(uri);

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.urlencoded({limit: 102400}))

app.post('/log', async (req, res) => {
  console.log("Post OK");
  res.status(200).send();
//    try {
//        await client.connect();
//        const db = client.db("kaluluDB");
//
//        const col = db.collection("datafiles");
//
//        let file = req.body;
//        const p = await col.insertOne(file);
//    } 
//    catch (err) {
//        console.log(err.stack);
//    }
//    finally {
//        await client.close();
//    }
})

app.get('/', (req, res) => res.send("<html>\n<body>\nTeste\n</body>\n</html>"))

app.listen(process.env.PORT || 3000, () => {
    console.log('Server is up on port 3000...')
})
