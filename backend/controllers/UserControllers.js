
const RefreshTokenModel = require("../model/RefreshTokenModel")
const UserModel = require("../model/UserModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer")
require("dotenv").config()

const registerUser = async (req,res) => {

        const { userName, userEmail, userPassword } = req.body

        const user = await UserModel.findOne({userEmail})       
        if(user) return res.status(403).json("Bu E-mail daha önce alınmış...")

        try {

            await UserModel.create({ userName, userEmail, userPassword })
            const newAccessToken = jwt.sign( {userName, userEmail}, process.env.ACCESS_TOKEN_KEY, { expiresIn: "15m" });
            const newRefreshToken = jwt.sign( {userName, userEmail}, process.env.REFRESH_TOKEN_KEY, { expiresIn: "1h" });
            res.cookie("accessToken", newAccessToken, { httpOnly: true, secure: true, sameSite: "strict" });
            res.cookie("refreshToken", newRefreshToken, { httpOnly: true, secure: true, sameSite: "strict" });
            res.status(200).json("Register Başarılı...")
            
        } catch (error) {
            
            console.log("error: ", error)
            res.status(401).json("Register Başarısız. User eklenemedi...")
            
        }
        
}

const loginUser = async (req, res) => {
  const { userEmail, userPassword } = req.body;

  if (!userEmail || !userPassword) {
    return res.status(400).send("Email veya şifre boş geçilemez...");
  }

  try {
    const user = await UserModel.findOne({ userEmail });

    if (!user) {
      return res.status(401).send("Böyle bir kullanıcı yok...");
    }

    const userNameDb = user.userName;
    const userPasswordDb = user.userPassword;
    const passwordIsCorrect = await bcrypt.compare(userPassword, userPasswordDb);
    
    if (passwordIsCorrect) {
      const accessToken = jwt.sign({ userName: userNameDb, userEmail }, process.env.ACCESS_TOKEN_KEY, { expiresIn: "15m" });
      const refreshToken = jwt.sign({ userName: userNameDb, userEmail }, process.env.REFRESH_TOKEN_KEY, { expiresIn: "1h" });

      res.cookie("accessToken", accessToken, { httpOnly: true, secure: true, sameSite: "strict" });
      res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true, sameSite: "strict" });

      return res.status(200).json({ userName: userNameDb, userEmail });
    } else {
      return res.status(401).send("Kullanıcı adı veya parola yanlış...");
    }
  } catch (error) {
    return res.status(500).send("Bir hata oluştu...", error);
  }
  
};


const resetPassword = async (req, res) => {
  const { userEmail } = req.body;

  if (!userEmail) {
    return res.status(400).send("E-posta adresi boş geçilemez...");
  }

  try {
    const user = await UserModel.findOne({ userEmail });

    if (!user) {
      return res.status(404).send("Böyle bir kullanıcı bulunamadı...");
    }

    const newPassword = Math.floor(Math.random() * (999999 - 100000 + 1) + 100000).toString();

    user.userPassword = newPassword;
    await user.save();

    const transporter = nodemailer.createTransport({
      service: 'hotmail',
      auth: {
        user: process.env.MY_MAIL,
        pass: process.env.MY_PASSWORD
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    const mailOptions = {
      from: process.env.MY_MAIL,
      to: userEmail,
      subject: 'MERN POS APP - Şifre Sıfırlama',
      text: `Yeni Şifreniz: ${newPassword}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.status(500).send('E-posta gönderme hatası');
      } else {
        console.log('E-posta gönderildi: ' + info.response);
        return res.status(200).send('E-posta gönderildi');
      }
    });
  } catch (error) {
    return res.status(500).send("Bir hata oluştu...");
  }
};

const changePassword = async (req,res) => {

  const { userEmail, userPassword, userPasswordAgain } = req.body
  if(userPassword !== userPasswordAgain ) return res.status(400).json("Parolalar eşit değil...")

  const userEdit = await UserModel.findOne({userEmail})

  bcrypt.compare(userPassword, userEdit.userPassword, async(error, data) => {
      
          if (error) {
              return res.status(400).send("Şifre hashlenemedi: " + error);
          }
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(userPassword, salt);
          await UserModel.findOneAndUpdate({userEmail},{ userPassword : hashedPassword })
                         .then((data) => res.status(200).send("Şifreniz Güncellendi..."))
                         .catch((error) => res.status(401).send("Şifreniz Güncellenemedi. Tekrar deneyiniz..."))
            
  })
}


const logoutUser = async (req,res) => {
    const refreshToken = req.cookies.refreshToken;
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.status(200).send("User Logged Out..")
}



module.exports={
    registerUser,
    loginUser,
    logoutUser,
    changePassword,
    resetPassword
}