const fs = require('fs')
const express = require('express')
const { getFilename } = require('./util')

const app = express()
app.use(express.urlencoded({ extended: true }))

app.post('/log', async (req, res) => {
    fs.writeFile(getFilename(), JSON.stringify(req.body), (err) => {
        if (err) {
            res.status('500').send({error: err});
        } else {
            res.status(200).send()
        }
        
    })
})

app.get('/', (req, res) => res.send("<html>\n<body>\nTeste\n</body>\n</html>"))

app.listen(process.env.PORT || 3000, () => {
    console.log('Server is up on port 3000...')
})
