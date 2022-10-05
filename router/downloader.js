// Basic Router Configuration
const express = require('express')
const router = express.Router()

// Load your other module here
const request = require('request')
const fs = require('fs')
const path = require("path")

const download = async function(uri, filename, callback) {
    await request.head(uri, (err, res, body) => {
        console.log(err, body)
        console.log('content-type:', res.headers['content-type'])
        console.log('content-length:', res.headers['content-length'])
        let pth = path.join(__dirname, "..", 'statics', 'imgs')
        request(uri).pipe(fs.createWriteStream(`${pth}/${filename}`)).on('close', callback)
    })
}
// Here will be your request handling
router.get("/", async function(req, res) {
    let image_url = req.query.url
    let fname = image_url.split("/").pop()
    await download(image_url, fname, () => {
        let pth = path.join(__dirname, "..", 'statics', 'imgs')
        res.download(`${pth}/${fname}`, async () => {
            // await fs.unlink(`${pth}/${fname}`)
            console.log("Downloaded", fname)
        })
    })
})

module.exports = router