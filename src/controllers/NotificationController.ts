import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { db } from "../database";

export class NotificationController{


    async create(request: FastifyRequest, reply: FastifyReply){
    const deviceId = z.string().parse(request.headers.authorization);
    const notificationSchema = z.object({
        message: z.string()
    })

    const { message } = notificationSchema.parse(request.body)

    const subscriber = await db.subscriber.findUnique({
        where: {
            deviceId,
            verified: true
        }
    });

    if(!subscriber) return reply.status(401).send("authentication")

    const sendMessage = await db.notification.create({
        data: {
            message,
            subscriberId: subscriber.id
        }
    });
    return reply.status(200).send(sendMessage)


}

async showNotification(request: FastifyRequest, reply: FastifyReply){

    const deviceId = z.string().parse(request.headers.authorization);
    const paramsSchema = z.object({
        phone: z.string()
    })
    
    
    const { phone } = paramsSchema.parse(request.params)

    const subscriber = await db.subscriber.findUnique({
        where:{
            phone,
            verified: true,
            deviceId: deviceId
        }
    })
    
    if(!subscriber) return reply.status(404).send("invalid phone")

    const notifications = await db.notification.findMany({
        where: {
            subscriberId: subscriber.id
        }
    })

    return reply.status(200).send(notifications)

    
}

}

