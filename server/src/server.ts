import express , {Request , Response , Router} from "express"
import dotenv from "dotenv"
import auth from "./routes/auth"
import products from "./routes/products"
import cookieParser from "cookie-parser"
import { connectDB } from "./config/db_connection"


dotenv.config()

const server = express()

//middlewares
server.use(express.json())
server.use(cookieParser())

server.get("/health", (req:Request, res: Response) : void => {
    res.status(200).json({
        message:"Server is running"
    })
})


//API routes
server.use("/auth", auth)
server.use("/products", products)



const PORT = process.env.PORT

server.listen(PORT, () => {
    console.log("Server listen on PORT :", PORT)
    connectDB()
})