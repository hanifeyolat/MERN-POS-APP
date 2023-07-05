const BillModel = require("../model/BillModel")

const getAllBills = async (req,res) => {

    try {
        const data = await BillModel.find();
        console.log("Faturalar Gönderildi...")
        res.status(200).send(data);
      } catch (error) {
        res.status(500).send(`Faturalar gönderilemedi...`);
      }
}

const createBill = async (req,res) => {

    const { userEmail, userName, cartItems, cartTotal, tax, subTotal, paymentMode,
            teslimAlan, address, city, country } = req.body

    await BillModel.create({ userEmail, userName, cartItems, cartTotal, tax, subTotal, paymentMode,
                             teslimAlan, address, city, country }
                        ).then(() => {    
                            res.status(200).send(`Yeni Fatura Oluşturuldu...`)
                        }).catch((error) => {
                            res.status(500).send(`Yeni Fatura Oluşturulamadı...`)
                        })

}


module.exports = { createBill, getAllBills }