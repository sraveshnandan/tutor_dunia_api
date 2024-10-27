import mongoose from "mongoose"
import { MONGO_URI } from "../config/credientials"

const connectDataBase = async (cb: () => void) => {
    try {
        const dbres = await mongoose.connect(MONGO_URI!);
        console.log(`Database connected to: ${dbres.connection.host}`)
        cb()
    } catch (error: any) {
        return console.error(`Unable to connect to the database due to : ${error.message}`)
    }
}


export { connectDataBase }