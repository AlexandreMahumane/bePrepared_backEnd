import Fastify from "fastify";
import { routes } from "./routes";


const fastify = Fastify({logger: true});

fastify.register(routes);

fastify.listen({port: 8080}).then(()=>{
    console.log('server starter')
});