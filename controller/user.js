const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const SECRET_KEY = "ygicywejihsebiubgwcoeiuahovitbaugoiyg";


exports.signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        let existingUser = await User.findOne({
            email
        });
        if (existingUser) {
            res.status(200).json({ err: 300, msg: "User already exists" });
        } else {
            let newUser = await new User({ name, email, password }).save();
            res.status(200).json({ err: 200, msg: "New user created successfully", data: newUser });
        }
    } catch (error) {
        res.status(500).json({ err: 500, msg: error.toString() })
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        let userExists = await User.findOne({
            email, password
        })
        if (!userExists) {
            res.status(200).json({ err: 300, msg: "user does not exists please sign up" })
        } else {
            const token = jwt.sign({ _id: userExists._id }, SECRET_KEY, {
                expiresIn: '24h',
            });
            res.status(200).json({ err: 200, msg: "Logged in successfully", data: userExists, token });
        }
    } catch (error) {
        res.status(500).json({ err: 500, msg: error.toString() })
    }
}

// exports.forgotPass = async (req, res) => {
//     try {
//         const { email } = req.body;
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(200).json({ err: 300, msg: 'User not found' });
//         }
//         const resetToken = randomString(20)
//         user.resetToken = resetToken;
//         await user.save();
//         const transporter = nodemailer.createTransport({
//             host: 'smtp.ethereal.email',
//             port: 587,
//             auth: {
//                 user: 'austyn.buckridge5@ethereal.email',
//                 pass: 'mr4heN1qfdKd8kt8Fj'
//             }
//         });
//         const mailOptions = {
//             from: EMAIL_USERNAME,
//             to: email,
//             subject: 'Password Reset',
//             html: `
//               <p>You have requested a password reset for your account.</p>
//               <p>Click <a href="http://localhost:3000/reset-password/${resetToken}"> here </a> to reset your password.</p>
//             `,
//         };

//         transporter.sendMail(mailOptions, (error, info) => {
//             if (error) {
//                 console.error(error);
//                 return res.status(500).json({ msg: 'Failed to send email' });
//             } else {
//                 console.log('Email sent: ' + info.response);
//                 res.status(200).json({ err: 200, msg: 'Please check your email' });
//             }
//         });

//     } catch (error) {
//         res.status(500).json({ err: 500, msg: err.toString() })
//     }
// }

// exports.resetPass = async (req, res) => {
//     try {
//         const { token, newPassword } = req.body;
//         const user = await User.findOne({ token });
//         if (!user) {
//             return res.status(200).json({ err: 300, msg: 'This link is invalid' });
//         }
//         const hashedPassword = await bcrypt.hash(newPassword, 10);
//         user.password = hashedPassword;
//         user.resetToken = null;
//         await user.save();
//         res.status(200).json({ err: 200, msg: 'Password reset successfully' });
//     } catch (error) {
//         res.status(500).json({ err: 500, msg: error.toString() });
//     }
// };