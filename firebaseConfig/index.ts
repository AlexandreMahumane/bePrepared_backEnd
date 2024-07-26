require('dotenv').config()

export const firebaseConfig = {
    apiKey: process.env.FIRE_BASE_APIKEY,
    authDomain: process.env.FIRE_BASE_AUTHDOMAIN,
    projectId: process.env.FIRE_BASE_PROJECTID,
    storageBucket: process.env.FIRE_BASE_STORAGEBUCKET,
    messagingSenderId: process.env.FIRE_BASE_MESSAGINGSENDERID,
    appId: process.env.FIRE_BASE_APPID
  };


