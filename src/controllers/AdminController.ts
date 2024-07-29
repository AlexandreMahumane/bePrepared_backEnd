import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { db } from "../database";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { TokenConfig } from "../config/TokenConfig";



export class AdminController{
    async create(request: FastifyRequest, reply: FastifyReply){
    const adminSchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string()
    });

    const { name, email, password } = adminSchema.parse(request.body);

    const adminName = await db.admin.findUnique({
        where: {
            name
        }
    });

    if(adminName) return reply.status(409).send("Admin name already exists")

    const adminEmail = await db.admin.findUnique({
        where: {
            email
        }
    });

    if(adminEmail) return reply.status(409).send("Admin email already exists")
    
        const encryptPassword = await bcrypt.hash(password, 10)
        console.log(encryptPassword)

    const saveAdmin = await db.admin.create({
        data: {
            name,
            email,
            password:encryptPassword
        }
    })
        return reply.status(200).send(saveAdmin);
    }

    async login(request: FastifyRequest, reply: FastifyReply){
        const adminSchema = z.object({
            name: z.string().optional(),
            email: z.string().email().optional(),
            password: z.string()
        });

        const { name, email, password } = adminSchema.parse(request.body);

    const admin = await db.admin.findUnique({
        where: {
            name,
            email
        }
    });

    if(!admin) return reply.status(404).send("bad crencials");
    
    if(!(await bcrypt.compare(password, admin.password))) return reply.status(401).send("Invalid password")

        const user = admin.id;
        const token = jwt.sign({expiressIn: TokenConfig.expiressIn,
            id: admin.id}, TokenConfig.secret);
    
    return reply.status(200).send({token, 
        admin: {...admin, password:undefined}})
}

    async list(request: FastifyRequest, reply: FastifyReply){

        reply.send()
    }
}