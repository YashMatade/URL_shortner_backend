const config = require("../config");

const urlModel = require("../models/URLshort");

exports.listShortUrl = async (req, res) => {
    try {
        const shorturls = await urlModel.find({}).sort({ createdAt: -1 });

        if (shorturls.length === 0) {
            res.status(200).json({ err: 300, msg: "No list found" });
        } else {
            res.status(200).json({ err: 200, msg: "list found", data: shorturls });
        }
    } catch (error) {
        res.status(500).json({ err: 500, msg: error.toString() })
    }
}

exports.getUrl = async (req, res) => {
    const { shortUrl } = req.params;
    let shorturls = await urlModel.findOne({ urlCode: shortUrl });

    if (!shorturls) return res.status(200).send({ err: 300, msg: "invalid url" });
    let updatedLink = await urlModel.findByIdAndUpdate(
        shorturls._id,
        { $inc: { clickCount: 1 } },
        { new: true }
    );
    console.log(updatedLink);
    res.redirect(updatedLink.longUrl);
}

exports.createUrl = async (req, res) => {
    const { longUrl } = req.body;
    const urlcode = generateUrl();

    const baseurl = config.BASEURL;
    let urlShort = new urlModel({
        longUrl: longUrl,
        urlCode: urlcode,
        shortUrl: baseurl + "u/" + urlcode
    });

    urlShort = await urlShort.save()
    res.status(200).json({ err: 200, msg: "success", data: urlShort });
}

function generateUrl() {
    var rndResult = "";
    var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;

    for (var i = 0; i < 5; i++) {
        rndResult += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        );
    }
    return rndResult;
}