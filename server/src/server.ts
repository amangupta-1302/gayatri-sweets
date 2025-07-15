import express from "express"
import dotenv from "dotenv"
import authRouter from "./routes/auth"
import productRouter from "./routes/products"
import cookieParser from "cookie-parser"
import { connectDB } from "./config/db_connection"
import { HTTP_STATUS } from "./utils/statusCodes"
import cors from "cors"

dotenv.config()

const server = express()

// Basic middlewares
server.use(express.json())
server.use(cookieParser())
server.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true
}))

// Health check
server.get("/health", (_, res) => {
    res.status(HTTP_STATUS.OK).json({
        status: 'success',
        message: "Server is running"
    })
})


const PORT = process.env.PORT || 5000

const startServer = async () => {
    try {
        await connectDB()
        server.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`)
        })
    } catch (error) {
        console.error('Failed to start server:', error)
        process.exit(1)
    }
}

startServer()