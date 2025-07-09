import mongoose from "mongoose";
/*
    Database connection details to mongo-db 
*/
export const connectDB = async () : Promise<void>  => {
    try {
        const conn = await mongoose.connect(process.env.CONNECTION_STRING as string)
        console.log("Connected to MongoDB database : ", conn.connection.host)
    }
    catch (err) {
        console.error("Error while connecting to database :", err)
        process.exit(1)
    }
}