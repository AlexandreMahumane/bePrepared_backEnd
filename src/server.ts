import Fastify from "fastify";
import { routes } from "./routes";
import "./database/redis";


const fastify = Fastify({logger: true});

fastify.register(routes);

fastify.listen({port: 8080}).then(()=>{
    console.log('server starter')
});