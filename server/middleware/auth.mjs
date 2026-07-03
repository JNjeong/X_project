import jwt from "jsonwebtoken"
import {config} from "../config.mjs"
import * as authRepository from "../data/auth.mjs"

const AUTH_ERROR ={message:"인증에러"}

//next 는 사용시 다음미들웨어로 넘어가게 해줌
export const isAuth = async (req,res,next)=>{
    const authHeader = req.get("Authorization")

    console.log("###LOG: ",authHeader)

    if (!authHeader || !authHeader.startsWith("Bearer ")){  
        console.log("###ERROR: 헤더에러")
        return res.status(401).json(AUTH_ERROR)
    }

    const token = authHeader.split(" ")[1]
    jwt.verify(token, config.jwt.secretKey, async (error, decoded)=>{
        if(error){
            console.log("###ERROR: ", "토큰에러")
            return res.status(401).json(AUTH_ERROR)
        }
        // console.log(decoded)
        const user = await authRepository.findById(decoded.id)
        if(!user){
            console.log("###LOG: 해당 아이디 없음")
            return res.status(401).json(AUTH_ERROR)
        }
        console.log("###LOG: user.id: ",user.id)
        console.log("###LOG: user.userid: ",user.userid)
        req.id = user.id
        req.token = token
        next()
    })
}