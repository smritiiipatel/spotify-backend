import jwt from "jsonwebtoken";

 export async function authArtist(req,res,next) {
    
     const token = req.headers.authorization?.split(" ")[1];
        if(!token){
            return res.status(401).json({message:"unauthorized accessed"});
        }
    
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRETKEY)
    
           if(decoded.role !== 'artist'){
            return res.status(403).json({message:"frobidden"});
           }
            req.user = decoded;

            next();
           
        }catch(error){
            console.log(error);
            res.status(401).json({message:"unauthorized access"})
        }
}

export async function authUser(req,res,next) {
    const token = req.headers.authorization?.split(" ")[1];
        if(!token){
            return res.status(401).json({message:"unauthorized accessed"});
        }
    
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRETKEY)
    
           if(decoded.role !== 'user' && decoded.role !== 'artist' ){
            return res.status(403).json({message:"frobidden"});
           }
            req.user = decoded;

            next();
           
        }catch(error){
            console.log(error);
            res.status(401).json({message:"unauthorized access"})
        }
}
