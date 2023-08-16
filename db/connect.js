const mongoose = require("mongoose");
exports.mongodbConnection = () => {
    mongoose.connect("mongodb+srv://matadeyash1:D8ylKHwBEHeimrJu@cluster0.zjr1qk6.mongodb.net/?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log("Connected to database");
    }).catch((error) => {
        console.log("error occured" + error);
    })
}




