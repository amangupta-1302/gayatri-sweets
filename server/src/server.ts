import express from "express"
import dotenv from "dotenv"

const server = express()
dotenv.config()

const PORT = process.env.PORT

server.listen(PORT, () => {
    console.log("Server listen on PORT :" , PORT)
})