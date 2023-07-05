const express = require("express")
const router = express.Router()
const { createBill, getAllBills } = require("../controllers/BillControllers")
const { AuthMiddleware } = require("../controllers/AuthMiddleware")

router.get("/all", getAllBills)
router.post("/create", createBill)

module.exports = router