import Fastify from "fastify";
import { routes } from "./routes";
import "./database/redis";
import { initializeApp } from 'firebase-admin/app';
import { firebaseConfig } from "../firebaseConfig";
require('dotenv').config()


const fastify = Fastify({logger: true});

const app = initializeApp(firebaseConfig);
fastify.register(routes);

fastify.listen({port: 8080}).then(()=>{
    console.log('server starter')
});