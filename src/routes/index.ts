import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { SubscribersController } from "../controllers/SubscribersController";

const subscribersController = new SubscribersController();
export const  routes = async (fastify: FastifyInstance) =>{


    fastify.post('/subscribers', 
       (request, reply)=> subscribersController.create(request,reply))
}