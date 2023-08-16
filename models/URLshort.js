const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UrlSchema = new Schema({
    urlCode: {
        type: String,
    },
    longUrl: {
        type: String,
        required: true,
    },
    shortUrl: {
        type: String,
        unique: true,
    },
    clickCount: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });

module.exports = mongoose.model("url", UrlSchema);