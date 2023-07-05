
const ProductModel = require("../model/ProductModel")

const addProduct = async(req,res) => {

    const { productName, productPrice, productImg, productCategory } = req.body
    await ProductModel.create({ productName, productPrice, productImg, productCategory }).then(() => {
                    console.log(`${productName} isimli product eklendi.`)    
                    res.send()
                }).catch((error) => {
                    console.log(`${productName} isimli product eklenemedi. Hata: `, error)  
                })
}

const deleteProduct = async(req,res) => {
    const { productId } = req.body

    await ProductModel.findByIdAndDelete({_id: productId}).then((data) => {
                    console.log(`${productId} isimli product silindi. `)    
                    res.send(data)
                }).catch((error) => {
                    console.log(`${data} isimli product silinemedi. Hata:  ` , error)  
                })
}

const updateProduct = async(req,res) => {
    const { productId, productName, productPrice, productImg, productCategory } = req.body

    await ProductModel.findByIdAndUpdate(productId , 
                    { $set: { productName, productPrice, productImg, productCategory}})
                    .then((data) => {
                    console.log(`${productName} isimli product güncellendi. `)    
                    res.send(data)
                }).catch((error) => {
                    console.log(`${productName} isimli product güncellenemedi. Hata:  ` , error)  
                })
}

const getAllProducts = async(req,res) => { 
    try {
        const data = await ProductModel.find();
        console.log(`Ürünler gönderildi...`);
        res.status(200).send(data);
      } catch (error) {
        console.log(`Ürünler gönderilemedi... Hata: `, error);
        res.status(500).send("Ürünler gönderilemedi...");
      }
}

module.exports={
    addProduct,
    deleteProduct,
    updateProduct,
    getAllProducts
}