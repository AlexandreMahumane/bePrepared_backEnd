require('dotenv').config()

export const TokenConfig = {
    secret: process.env.TOKEN_SECRET,
    expiressIn: "3d"
}