import { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import  jwt  from 'jsonwebtoken'
import { z } from "zod";
import { TokenConfig } from "../config/TokenConfig";


export function AuthHook(request: FastifyRequest, reply: FastifyReply, done: (error?: FastifyError) => void){
    console.log("filter")
    const [,token] =z.string().parse(request.headers.authorization).split(' ');

    console.log(token, TokenConfig.secret)
    try { 
        const payload = jwt.verify(token, TokenConfig.secret)
        console.log(payload)
        console.log("filter done")
        done()
    } catch (error) {
        console.log(error)
        return reply.status(401).send("Authentication failed")
    }
    

}