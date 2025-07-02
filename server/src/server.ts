import express , { Router , Request , Response} from "express"
import dotenv from "dotenv"
import  auth  from "./routes/auth"
import products from "./routes/products"
import { connectDB } from "./config/db_connection"


const server = express()
dotenv.config()
server.use(express.json())
const router :Router = express.Router()

const PORT = process.env.PORT


server.use(router)
server.use("/auth", auth)
server.use("/products", products)


router.get("/health", (req:Request, res: Response) : void => {
    res.status(200).json({
        message:"Server is running"
    })
})
server.listen(PORT, () => {
    console.log("Server listen on PORT :", PORT)
    connectDB()
})