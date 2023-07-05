const express = require("express")
const router = express.Router()
const { AuthMiddleware } = require("../controllers/AuthMiddleware")
const { addProduct, 
        deleteProduct,
        updateProduct,
        getAllProducts } = require("../controllers/ProductControllers")

router.post("/add", AuthMiddleware, addProduct)
router.delete("/delete", AuthMiddleware, deleteProduct)
router.put("/update", AuthMiddleware, updateProduct)
router.get("/all",AuthMiddleware, getAllProducts)

module.exports = router