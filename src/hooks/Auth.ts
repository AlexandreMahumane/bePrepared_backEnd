import { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import { jwt } from 'jsonwebtoken'
import { z } from "zod";
import { TokenConfig } from "../config/TokenConfig.ts";

export function AuthHook(request: FastifyRequest, reply: FastifyReply, done: (error?: FastifyError) => void){
    const [,token] =z.string().parse(request.headers.authorization);

    try { 
        const payload = jwt.verify(token, TokenConfig.secret)
    } catch (error) {
        
    }

}