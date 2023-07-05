const jwt = require("jsonwebtoken");
require("dotenv").config();

const AuthMiddleware = (req, res, next) => {
  const token = req.cookies.refreshToken;

  if (!token) {
    return res.status(401).json({ message: "Yetkilendirme hatası: Token bulunamadı" });
  }

  jwt.verify(token, process.env.REFRESH_TOKEN_KEY, (error, decoded) => {
    if (error) {
      console.log("AuthMiddleware JWT VERIFY ERROR: ", error);
      return res.status(401).json({ message: "Geçersiz token" });
    }

    req.user = decoded;
    next();
  });
};
module.exports = { AuthMiddleware };