import Fastify from "fastify";


const fastify = Fastify({logger: true})

fastify.get('/', async (request, reply) => {
    return {hello:'world'};
})

const start = async  () =>{
    try {
        fastify.listen({port: 8080});
        console.log('server starter')
    } catch (error) {
        fastify.log.error(error);
        process.exit(1);
    }
}

start()