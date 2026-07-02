import express from "express"
import {config} from "./config.mjs"
import { connectDB } from "./db/database.mjs"
import postsRouter from "./router/posts.mjs"
import authRouter from "./router/auth.mjs"


const app = express()
app.use(express.json())
app.use("/post", postsRouter)
app.use("/auth", authRouter)
app.use((req,res)=>{
    res.sendStatus(404)
})




connectDB().then(()=>{
    app.listen(config.host.port, ()=>{
        console.log("###LOG: DB/Web server running...")
    })
}).catch(console.error)