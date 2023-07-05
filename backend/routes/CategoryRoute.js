const express = require("express")
const router = express.Router()
const {addCategory, deleteCategory, updateCategory, getAllCategories} = require("../controllers/CategoryControllers")   
const { AuthMiddleware } = require("../controllers/AuthMiddleware")

router.post("/add", AuthMiddleware, addCategory)
router.delete("/delete", AuthMiddleware, deleteCategory)
router.put("/update", AuthMiddleware, updateCategory)
router.get("/all", AuthMiddleware, getAllCategories)

module.exports = router