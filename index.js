require("dotenv").config()

const express = require('express')
const app = express()
const cors = require("cors")
const cookieParser = require("cookie-parser")

const port = process.env.PORT || 3000

const routes = require("./routes/main")
const passwordRoutes = require("./routes/password")

// update express settings
app.use(express.urlencoded({ extended: false })); // parse application/x-www-form-urlendcoded
app.use(express.json()); // parse application/json
app.use(cookieParser())
app.use(cors({ credentials: true, origin: process.env.CORS_ORIGIN}))

// require passport auth
require("./auth/auth")

// setup routes
app.use("/", routes)
app.use("/", passwordRoutes)

// Catch all other routes
app.use((request, response) => {
    response.status(404).json({message: '404 - Not Found', status: 404})
})

// Catch errors
app.use((error, request, response, next) => {
    console.log(error)
    response.status(error.status || 500).json({error: error.message, status: 500})
})

app.listen(port, () => {
    console.log(`server is running on port: ${port}`)
})
