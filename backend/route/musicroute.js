import express from 'express';
import { createMusic , createAlbum , getAllMusic , getAllAlbum} from '../controllers/music.controller.js';
import multer from 'multer';
import {authArtist, authUser} from '../middleware/auth.middleware.js';

const upload = multer({
    storage : multer.memoryStorage()
})

const musicRouter = express.Router();


musicRouter.post("/upload",authArtist,upload.single("music"),createMusic);

musicRouter.post("/album",authArtist,createAlbum);

musicRouter.get("/viewall",authUser, getAllMusic);

musicRouter.get("/viewallalbum",authUser, getAllAlbum);

export default musicRouter;