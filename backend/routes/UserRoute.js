const express = require("express")
const router = express.Router()
const { registerUser, loginUser, logoutUser, changePassword, resetPassword } = require("../controllers/UserControllers")
const { AuthMiddleware } = require("../controllers/AuthMiddleware")
const { refreshTokenMiddleware } = require("../controllers/refreshTokenMiddleware")

router.post("/register", registerUser)
router.post("/login", loginUser)
router.post("/reset-password", resetPassword)

router.post("/logout", AuthMiddleware, logoutUser)
router.put("/change-password", AuthMiddleware, changePassword)

router.post("/refresh", refreshTokenMiddleware)


module.exports = router