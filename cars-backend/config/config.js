require('dotenv').config();

const config = Object.freeze({
    

    port: process.env.PORT || 8000,
    databaseURI: process.env.MONGODB_URI || "mongodb+srv://7atim1000:NqtXqB98qt5boWMc@cluster0.auagj1v.mongodb.net/cars",     
    //"mongodb+srv://7atim1000:NqtXqB98qt5boWMc@cluster0.auagj1v.mongodb.net/cars"
    // "mongodb+srv://7atim1000:N5MaGpAPNesKjbzs@cluster0.gu2ahqo.mongodb.net/hotel"
    nodeEnv : process.env.NODE_ENV || "development",
    

    accessTokenSecret : process.env.JWT_SECRET,


   // RAZORPAY_KEY_ID:RAZORPYSECRET,
   //
   //  RAZORPAY_KEY_SECRET:RAZORPYSECRET

});

module.exports = config ;