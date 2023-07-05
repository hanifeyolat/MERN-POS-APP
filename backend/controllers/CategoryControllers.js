
const CategoryModel = require("../model/CategoryModel")

const addCategory = async(req,res) => {

    const { categoryName } = req.body
    await CategoryModel.create({categoryName})
                       .then((data) => {
                            console.log(`${data} isimli category eklendi. `)    
                            res.status(200).send(data)
                        }).catch((error) => {
                            console.log(`${categoryName} isimli category eklenemedi. Hata:  ` , error)  
                            res.status(500).send(`${categoryName} isimli category eklenemedi.`)
                        })
}

const deleteCategory = async(req,res) => {
    try {
        await CategoryModel.findByIdAndDelete({_id: req.body.categoryId})
        res.status(200).send(`Kategori silindi.`)  
    } catch (error) {
        console.log(`Kategori silinemedi. Hata:  ` , error) 
        res.status(500).send("Kategori silinemedi.. ")
    }
}

const updateCategory = async(req,res) => {

    const {categoryId, categoryName} = req.body
    await CategoryModel.findByIdAndUpdate( {_id: categoryId}, { categoryName })
                        .then((data) => { 
                            res.status(200).send(data)
                        }).catch((error) => {
                            console.log(`${categoryName} isimli category güncellenemedi. Hata:  ` , error)  
                            res.status(500).send(`${categoryName} isimli kategori güncellenemedi..`)
                        })

}

const getAllCategories = async(req,res) => { 

    await CategoryModel.find().then((data) => {
                                    console.log("Kategoriler Gönderildi...")
                                    res.status(200).send(data)
                                }).catch((error) => {
                                    console.log(`Kategoriler Bulunamadı. Hata:  `,error)  
                                })

}

module.exports = {  addCategory,
                    deleteCategory,
                    updateCategory,
                    getAllCategories  }