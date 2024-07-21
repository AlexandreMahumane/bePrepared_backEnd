import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { redis } from "../database/redis";
import { db } from "../database";
import { generate6DigtsNumber } from "../utils/utils";

export class AuthController{
    async authOtp(request: FastifyRequest, reply: FastifyReply){
        const authSchema = z.object({
            otp: z.number(),
            deviceId: z.string()
        });

        const { otp, deviceId } = authSchema.parse(request.body);
        
        
        // search the number
        const phone = await redis.get(`otp_${otp}`);
        console.log(phone)


        // check if there are
        if(!phone) {
            return reply.status(401).send({error: 'invalid otp'});
        }

        //update user
        const subscriber = await db.subscriber.update({
            data: {
                deviceId,
                verified: true
            },
            where: {
                phone
            },
            include: {
                district: true
            }
        })

        await redis.delete(`otp_${otp}`)
        return reply.send(subscriber);
    }

    async loginSubscriber(request: FastifyRequest, reply: FastifyReply){
        const subscriberSchema = z.object({
            phone: z.string().regex(/^8[2-7]\d{7}/)
        })

        //check if there are
        const { phone } = subscriberSchema.parse(request.body)

        const subscriberPhone =await db.subscriber.findUnique({
            where: {
                phone
            }
        });

        if(!subscriberPhone){
            return reply.status(404).send('invalid phone')
        }
        const otp = generate6DigtsNumber();
        console.log(otp);
        await redis.set(`otp_${otp}`, phone, 60 * 3);
        return reply.status(204).send();

    }

    async updateSubscriber(request: FastifyRequest, reply: FastifyReply){
        const deviceId = z.string().parse(request.headers.authorization);

        const subscriberSchema = z.object({
            provinceId: z.string().optional(),
            districtId: z.string().optional()
        });

        const { provinceId, districtId } = subscriberSchema.parse(request.body);

        const subscriber = await db.subscriber.findFirst({
            where: {
                deviceId,
                verified: true
            }
        });

        if(!subscriber) return reply.status(401).send("Authentication error")

        const district = await db.district.findFirst({
            where: {
                id: districtId,
                    provinceId
            }
        });

        if(!district) return reply.status(400).send("District doesn't belong to the province")

            console.log(deviceId)
        const updateSubscriber = await db.subscriber.update({
            data: {
                provinceId,
                districtId
            },
            where: {
                deviceId
            }
        })
        console.log(deviceId)
        return reply.send(updateSubscriber)
    }
}