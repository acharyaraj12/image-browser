// Basic Router Configuration
const express = require('express')
const router = express.Router()

// Load your other module here

// Here will be your request handling
router.get("/", (res, req) => req.render("index"))

module.exports = router