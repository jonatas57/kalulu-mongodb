const fs = require('fs')
const express = require('express')
const { getFilename } = require('./util')
const { MongoClient } = require("mongodb")
const bodyParser = require('body-parser')
const uri = process.env.MONGODB_URI

const client = new MongoClient(uri, { useUnifiedTopology: true }, { useNewUrlParser: true }, { connectTimeoutMS: 30000 }, { keepAlive: 1 });
(async () => await client.connect())();

const app = express()
app.use(express.urlencoded({limit: '50mb', extended: false, parameterLimit: 100000}))

app.post('/log', async (req, res) => {
    try {
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
})

app.get('/', (req, res) => res.send("<html>\n<body>\nTeste\n</body>\n</html>"))

app.listen(process.env.PORT || 3000, () => {
    console.log('Server is up on port ' + (process.env.PORT || 3000) + '...')
})

const cleanup = (event) => {
  client.close();
}

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
