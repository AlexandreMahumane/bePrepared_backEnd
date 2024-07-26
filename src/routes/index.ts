import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { SubscribersController } from "../controllers/SubscribersController";
import { AuthController } from "../controllers/AuthController";
import { NotificationController } from "../controllers/NotificationController";
import { AdminController } from "../controllers/AdminController";
import { AlertsController } from "../controllers/AlertsController";
import { AuthHook } from "../hooks/Auth";

const subscribersController = new SubscribersController();
const authController = new AuthController();
const notificationController = new NotificationController();
const adminController = new AdminController();
const alertsController = new AlertsController();
export const  routes = async (fastify: FastifyInstance) =>{


    fastify.post('/subscribers', 
       (request, reply)=> subscribersController.create(request,reply))
    

    fastify.post('/auth/subscribers/otp', (request, reply)=> authController.authOtp(request, reply))
    fastify.post('/auth/subscribers', (request, reply)=> authController.loginSubscriber(request, reply))
    fastify.put('/auth/subscribers', (request, reply)=> authController.updateSubscriber(request, reply))

    fastify.post('/notifications', (request, reply)=> notificationController.create(request, reply))
    fastify.get('/notifications/:phone', (request, reply)=> notificationController.showNotification(request, reply))

    fastify.post('/admin', (request, reply)=> adminController.create(request, reply) )
    fastify.post('/login/admin', (request, reply)=> adminController.login(request, reply) )
    
    
    fastify.post('/alerts',{preHandler: AuthHook} ,(request, reply)=> alertsController.create(request, reply) )
    fastify.get('/alerts',(request, reply)=> alertsController.list(request, reply) )
}