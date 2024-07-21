import { createClient, RedisClientType } from 'redis';


class Redis{
    #client: RedisClientType;
    constructor(){
        createClient({password:'Krawkpp1'})
            .on('error', (error)=> {console.log("Redis client error", error);
                // throw new Error(error);
            })
            .connect()
            .then(client => {
                this.#client = client;
                console.log("successufully connected to redis!")
            })
    }


    async set(key: string, value: string | number, duration: number){
        await this.#client.set(key, value, {
            EX: duration
        });
    }

    async get(key: string) {
        const value = await this.#client.get(key)
        return value;
    }

    async delete(key: string){
        await this.#client.del(key)
    }
}

export const redis = new Redis();