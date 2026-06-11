import dotenv from 'dotenv';
dotenv.config();

import ImageKit from "imagekit";

const ImageKitClient = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
})

async function uploadFile(file) {
    const result = await ImageKitClient.upload({
       file,
       fileName: "music_" + Date.now(),
       folder: "spotify/music"
    })
    return result;
}

export { uploadFile };