const path = require('path')

const receivedPath = path.join(__dirname, '..', 'received')

const getFilename = function() {
    const date_str = new Date().toISOString()
    const time_ns = process.hrtime()[1]
    const filename = date_str + '' + time_ns + '.json'
    const fullname = path.join(receivedPath, filename)

    return fullname
};

module.exports = { getFilename }
