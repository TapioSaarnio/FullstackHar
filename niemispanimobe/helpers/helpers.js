const util = require('util')
const gc = require('../config/')
const bucket = gc.bucket('npanbucket') // should be your bucket name

const { format } = util

gc.getBuckets().then(x => console.log(x))

/**
 *
 * @param { File } object file object that will be uploaded
 * @description - This function does the following
 * - It uploads a file to the image bucket on Google Cloud
 * - It accepts an object as an argument with the
 *   "originalname" and "buffer" as keys
 */

const uploadImage = (file) => new Promise((resolve, reject) => {

  console.log('blob')
  
  const { originalname, buffer } = file
  
  const blob = bucket.file(originalname.replace(/ /g, "_"))
  console.log('viel1')
  console.log(blob)
  const blobStream = blob.createWriteStream({
    resumable: true
  })
  console.log(blob.name)
  console.log(format(`https://storage.googleapis.com/${bucket.name}/${blob.name}`))
  blobStream.on('finish', () => {
    const publicUrl = format(
      `https://storage.googleapis.com/${bucket.name}/${blob.name}`
    )
    console.log(publicUrl)
    console.log('viel2')
    resolve(publicUrl)
  })
  .on('error', (err) => {
    reject(`Unable to upload image, something went wrong`)
  })
  .end(buffer)
})

module.exports = {uploadImage}

