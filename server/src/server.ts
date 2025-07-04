import express , {Request , Response , Router} from "express"
import dotenv from "dotenv"
import authRouter from "./routes/auth"
import productRouter from "./routes/products"
import cookieParser from "cookie-parser"
import { connectDB } from "./config/db_connection"
import { HTTP_STATUS } from "./utils/statusCodes"

dotenv.config()

const server = express()

//middlewares
server.use(express.json())
server.use(cookieParser())

server.get("/health", (req:Request, res: Response) : void => {
    res.status(HTTP_STATUS.OK).json({
        message:"Server is running"
    })
})


//API routes
server.use("/auth", authRouter)
server.use("/products", productRouter)

const PORT = process.env.PORT

server.listen(PORT, () => {
    console.log("Server listen on PORT :", PORT)
    connectDB()
})