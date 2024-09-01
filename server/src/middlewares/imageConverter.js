const tempImageModel = require('../models/tempImageModel');

const convertImageToBase64 = async (req, res, next) => {
    try{
      const result = await tempImageModel.deleteMany({});}
    catch(err){
      console.log(err);
    }
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }
    // Convert the image buffer to a base64 string
    const imageBuffer = await req.file.buffer;
    const base64Image = await imageBuffer.toString('base64');
  
    // Add the base64 image string to tempImageModel
    tempImageModel.create({image: base64Image});
    // tempImageModel.create({image: data});
  
    next();
  };
  
module.exports = convertImageToBase64