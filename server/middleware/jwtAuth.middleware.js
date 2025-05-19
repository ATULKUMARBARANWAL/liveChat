import jwt from 'jsonwebtoken';

const jwtSecret=process.env.JWT_SECRET || 'default_jsonwebtoken_secret';

const jwtAuth=(req,res,next)=>{
const headers=req.headers.authorization;
if(!headers || !headers.startsWith('Bearer'))
{
return res.status(401).json({message:"Unauthorized Token"})
}
const token=headers.split(' ')[1];
if(!token)
{
return res.status(401).json({message:"Unauthorized Token"})
}
try{
const decode=jwt.verify(token,jwtSecret);
req.user=decode;
next();
}
catch(err)
{
    console.log(err.message);
    return res.status(401).json({message:"Unauthorized Token"})
}
}