const {register} = require ("../services/registerService");
require('dotenv').config();
const {checkIfPresent,insertImage} = require ("../services/registerService");
const path = require('path');
const AWS = require('aws-sdk'); ;
var jwt = require('jsonwebtoken');
const { S3Client } = require("@aws-sdk/client-s3");
const { Readable } = require('stream');
const { PutObjectCommand } = require("@aws-sdk/client-s3");
const { Upload } = require('@aws-sdk/lib-storage');
const fs = require('fs')
const region = process.env.REGION;
const accessKeyId = process.env.ACCESSKEYID;
const secretAccessKey = process.env.SECRETACCESSKEY;
const s3Client = new S3Client({
    region,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });
  
const multer = require('multer')
var imageStorage = multer.diskStorage({
    destination: "C:\\Users\\Lenovo\\Desktop\\Advances in Computer Science\\HealthMidtermProject\\client\\myapp\\src\\Assets\\UserImages",
    filename: (req, file, cb) => {
        cb(null, file.filename + '_' + Date.now() + path.extname(file.originalname))
    }
});
const imageUpload = multer({
    storage: imageStorage,
    limits: {
        fileSize: 10000000 // 1000000 Bytes = 1 MB
    },
    // fileFilter(req, file, cb) {
    //     if (!file.originalname.match(/\.(png|jpg|JPEG)$/)) {
    //         // upload only png and jpg format
    //         return cb(new Error('Please upload a Image'))
    //     }
    //     cb(undefined, true)
    // }
})

const registerController = async(req,res)=>{
    const {user} = req.body;
    if(!user){
        return res.status(401).json({message: "missing data"});
    }
    const result = await register(user);
    if(result.status === 200){ 
       
        const token = jwt.sign({user_id:result?.user?.user_id}, process.env.SECRET_KEY)
        return res.status(200).json({message: result.message, user: result.user, token: token})
    }
}

const checkUser = async(req,res)=>{
    const{user} = req.body;
    const result = await checkIfPresent(user);

        return res.status(200).json({message: result.message, user: result.user})
    
}



const imageUploader = async (req, res) => {

    const timestamp = Date.now(); 
    const key = req.body.email + '_' + timestamp; 
    const fileStream = fs.createReadStream(req.file ? req.file.path : "C:\\Users\\Lenovo\\Desktop\\Advances in Computer Science\\HealthMidtermProject\\api\\assets\\images\\anon.jpg");

    const upload = new Upload({
        client: s3Client,
        params: {
            Bucket: "patchcare",
            Key: key,
            Body: fileStream,
        },
    });

    try {
        await upload.done(); // Perform the upload

        // Now that the image is uploaded, you can call insertImage
        const result = await insertImage(key, req.body.email);

        res.status(200).json({ message: "Image uploaded successfully", user: result.user });
    } catch (error) {
        console.error("Error uploading image:", error);
        res.status(500).json({ message: "Image upload failed" });
    }
}






module.exports={
    registerController,
    checkUser,
    imageUploader,
}

module.exports.imageUpload = imageUpload;