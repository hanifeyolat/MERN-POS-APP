
const RefreshTokenModel = require("../model/RefreshTokenModel")
const jwt = require("jsonwebtoken")
require("dotenv").config()


const refreshTokenMiddleware = async (req, res) => {

        //take the refresh token from the user
        const refreshToken = req.body.token
  
        //send error if there is no token or it's invalid
        if (!refreshToken) return res.status(401).json("You are not authenticated!")

        await RefreshTokenModel.deleteOne({ refreshToken})
                               .then(() => console.log("refresh token databaseden silindi..."))
                               .catch((error) => console.log("refresh token databaseden silinemedi... " + error))

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY, async (err, user) => {

                err && console.log(err);
              
                req.user=user

                const newAccessToken = jwt.sign({ userName: user.userName,
                                                  userEmail: user.userEmail }, process.env.ACCESS_TOKEN_KEY, {expiresIn: "15m"});
                const newRefreshToken = jwt.sign({ userName: user.userName,
                                                   userEmail: user.userEmail }, process.env.REFRESH_TOKEN_KEY);

                console.log("user: ", user)
                console.log("eski refresh token: ", refreshToken)
                console.log("yeni refresh token: ", newRefreshToken)
            
                await RefreshTokenModel.create({ refreshToken: newRefreshToken})
                                      .then(() => console.log("refresh token güncellendi..."))
                                      .catch((error) => console.log("refresh token güncellenemedi... " + error))

                res.status(200).json({ userName: user.userName,
                                       userEmail: user.userEmail, 
                                       accessToken: newAccessToken,
                                       refreshToken: newRefreshToken });
        })
}

module.exports = { refreshTokenMiddleware }
