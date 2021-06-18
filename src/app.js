const fs = require('fs')
const express = require('express')
const { getFilename } = require('./util')
const { MongoClient } = require("mongodb")
const bodyParser = require('body-parser')
const uri = process.env.MONGODB_URI

const client = new MongoClient(uri);

const app = express()
app.use(express.urlencoded({limit: '50mb', extended: false, parameterLimit: 100000}))

app.post('/log', async (req, res) => {
    try {
        await client.connect();
        const db = client.db("kaluluDB");

        const col = db.collection("datafiles");

        let file = req.body;
        const p = await col.insertOne(file);
        res.status(200).send();
    } 
    catch (err) {
        console.log(err.stack);
        res.status(500).send({error: err});
    }
    finally {
        await client.close();
    }
})

app.get('/', (req, res) => res.send("<html>\n<body>\nTeste\n</body>\n</html>"))

app.listen(process.env.PORT || 3000, () => {
    console.log('Server is up on port ' + (process.env.PORT || 3000) + '...')
})
