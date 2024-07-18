import { FastifyReply, FastifyRequest } from "fastify";
import { generate6DigtsNumber } from "../utils/utils";
import { db } from "../database";
import { z } from "zod";


export class SubscribersController {
    async create(request: FastifyRequest, reply: FastifyReply){
        const subscribersSchema = z.object(
            {
                phone: z.string().regex(/^8[2-7]\d{7}/),
                provinceId: z.string(),
                districtId: z.string()
            }
        )
        const { phone, provinceId, districtId } = subscribersSchema.parse(request.body);
        // checks if a user already exits
        const subscriberExits = await db.subscriber.findUnique({ where: {phone}});
        
        if(subscriberExits){ 
            return reply.status(401).send({error: 'Aleardy exits user'})
        }

        //verifica se o distrito tem relacao com a provincia
        const district = await db.district.findFirst({
            where: {
                id: districtId, 
                provinceId
                    }
                 })
        console.log("district", district)
        if(!district) {
            return reply.status(400).send({error: "District doesn't belong to the province"})
        }

        // save in database
        const saveSubscriber = await db.subscriber.create({ 
            data: {
                phone, 
                districtId,
                provinceId
            } 
            });

        const otp = generate6DigtsNumber();
        console.log(otp);
            console.log(saveSubscriber)
        return reply.status(201).send(
            {
                subscriber:saveSubscriber,
                otp
            }
        )
    }
}