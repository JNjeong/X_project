import express from "express"
import {config} from "./config.mjs"
import { connectDB } from "./db/database.mjs"

const app = express()
app.use(express.json())






connectDB().then(()=>{
    app.listen(config.host.port, ()=>{
        console.log("###LOG: DB/Web server running...")
    })
}).catch(console.error)