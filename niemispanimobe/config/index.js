const Cloud = require('@google-cloud/storage')
const path = require('path')
//const serviceKey = path.join(__dirname, './sonic-progress-302121-68d724d7d3ef.json')
//console.log({serviceKey})

const { Storage } = Cloud
const storage = new Storage({
  keyFilename: process.env.SERVICEKEY,
  projectId: 'sonic-progress-302121',
})

module.exports = storage
