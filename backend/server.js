const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken")
const { AuthMiddleware } = require("./controllers/AuthMiddleware.js")
require("dotenv").config()

const app = express()

const UserRoutes = require("./routes/UserRoute")
const CategoryRoutes = require("./routes/CategoryRoute")
const ProductRoutes = require("./routes/ProductRoute")
const BillRoutes = require("./routes/BillRoute")
const RefreshTokenModel = require("./model/RefreshTokenModel.js")

app.use(cors({ origin: true, credentials: true }));
app.use(express.json())
app.use(cookieParser())

app.use("/user", UserRoutes)
app.use("/category", CategoryRoutes)
app.use("/product", ProductRoutes)
app.use("/bill", BillRoutes)


const UpdateTokensMiddleware = async (req, res, next) => {
    const { accessToken, refreshToken } = req.cookies;
  
    if (!isValidToken(accessToken) || !isValidToken(refreshToken)) {
     
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY, (err, user) => {
          if (err) {
            console.log("UpdateTokensMiddleware JWT VERIFY ERROR: ", err);
            return res.status(401).json("UpdateTokensMiddleware JWT VERIFY ERROR");
          }
  
          // Yeni access token ve refresh token oluştur
          const newAccessToken = jwt.sign(user, process.env.ACCESS_TOKEN_KEY, { expiresIn: "15m" });
          const newRefreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_KEY, { expiresIn: "1h" });
  
          // Yeni tokenları cookielerde sakla
          res.cookie("accessToken", newAccessToken, { httpOnly: true, secure: true, sameSite: "strict" });
          res.cookie("refreshToken", newRefreshToken, { httpOnly: true, secure: true, sameSite: "strict" });
  
          next();
        });
   
    } else {
      next();
    }
  };
  
  app.use(UpdateTokensMiddleware);


mongoose.connect("mongodb+srv://hanifeyolat25:hanife123@cluster0.giayvpf.mongodb.net/?retryWrites=true&w=majority")
        .then(() => console.log("Connected to mongoDB"))
        .catch((error) => console.log("Unsuccessful Connect to mongoDB, error: ", error))

const port=5000
app.listen(port, () => {
    console.log(`Server ${port} portunda çalışıyor...`)
})
