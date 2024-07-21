import { FastifyReply, FastifyRequest } from "fastify";

export class AlertsController{
    async create(request: FastifyRequest, reply: FastifyReply){
        
    return reply.send();
}
}