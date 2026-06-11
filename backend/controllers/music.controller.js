import express from "express";
import musicModal from "../models/music.model.js";
import { registerUser, loginUser } from '../controllers/controller.js'; 
 import jwt from "jsonwebtoken";
import { uploadFile } from "../services/storage.service.js";
import albumModal from "../models/album.js";

  export  async function createMusic(req,res) { 
    
    const {title} = req.body;
    const file = req.file;

    const result = await uploadFile(file.buffer.toString('base64'))

    const music = await musicModal.create({
        uri: result.url,
        title,
        artist:req.user.id,
    })

    res.status(201).json({
        message:"music created successfully",
        music:{
            id:music._id,
            uri:music.uri,
            title:music.title,
            artist:music.artist,

        }
        
    })

    
}

 export async function createAlbum(req,res) {
        let {title, musics}= req.body;

        const album = await albumModal.create({
            title,
            artist:req.user.id,
            music : musics,
        })

        res.status(201).json({
            message:"album created successfully",
            album:{
                id:album._id,
                title:album.title,
                artist:album.artist,
                music:album.music,
            }
        })
}

 export async function getAllMusic(req,res) {
    
   const music = await musicModal.find()

   res.status(200).json({
    message:"music fetched successfully",
    music: music,

   })

 }

 export async function getAllAlbum(req,res) {
      
    const album = await albumModal.find().populate("artist","username email").populate("music")

    res.status(200).json({
    message:"album fetched successfully",
    album: album,

   })
 }
