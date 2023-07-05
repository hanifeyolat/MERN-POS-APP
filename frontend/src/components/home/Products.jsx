import { useState } from 'react';
import ProductItem from './ProductItem';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Select, message } from 'antd';
import { ADD_A_PRODUCT } from '../../redux/ProductsSlice';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';


const Products = () => {

  const [AddProductModalOpen ,setIsAddProductModalOpen] = useState(false)
  const categories = useSelector((state) => state.categories.categories)
  const ReduxRefreshToken = useSelector(state => state.user.refreshToken)
  const products = useSelector((state) => {
    if(state.products.category!=="" || state.products.search!==""){
      return state.products.filteredProducts
    }else{
      return state.products.products 
    }
  })

  const navigate = useNavigate()
  const dispatch = useDispatch()
 
  const onFinish = async (values) => {
    console.log("onFinish values: ", values)

      await fetch("http://localhost:5000/product/add", {
                  method:"POST",
                  body: JSON.stringify({...values}),
                  headers: { "Content-type": "application/json; charset=UTF-8" },
                  credentials: "include"
            }).then(() =>{
                  setIsAddProductModalOpen(false)
                  dispatch(ADD_A_PRODUCT({product: values}))
                  message.success("Yeni Ürün Eklendi...")
            }).catch((error) => {
                  console.log("On finish error. Ürün Eklenemedi. : ", error)
                  message.error("Ürün Eklenemedi. Tekrar Deneyiniz ...")
            })

  }

  return (
    <ul className='home-products'>
        {
          products && (
            products?.map((product) => (
              <ProductItem product={product}/>
            ))
          )
        }
      <li className='product-item !bg-orange-900 hover:!bg-orange-700 transition ease-in flex items-center justify-center text-white border-none' onClick={() => navigate("/products")}>
          <EditOutlined style={{ fontSize: '22px' }} />
      </li>
      <li onClick={() => setIsAddProductModalOpen(true)} className='product-item !bg-purple-900 hover:!bg-purple-700 transition ease-in flex items-center justify-center text-white border-none'> 
          <PlusOutlined style={{ fontSize: '22px' }} />
      </li>
        {/* ADD PRODUCT */}
        <Modal className='mt-5' 
               title="Yeni Ürün Ekle" 
               footer={false} open={AddProductModalOpen} 
               onCancel={()=>setIsAddProductModalOpen(false)}>

              <Form layout="vertical" onFinish={onFinish}>
                  <Form.Item label="Ürün Adı"
                            rules={[{ required: true, message: "Lütfen Ürün Adı Giriniz..." }]}
                            name={"productName"}>
                      <Input placeholder="Lütfen Ürün Adı Giriniz..." />
                  </Form.Item>
                  <Form.Item label="Ürün Fiyatı"
                            rules={[{ required: true, message: "Lütfen Ürün Fiyatı Giriniz..." }]}
                            name={"productPrice"}>
                      <Input placeholder="Lütfen Ürün Fiyatı Giriniz..." />
                  </Form.Item>
                  <Form.Item label="Ürün Görseli"
                             rules={[{ required: true, message: "Lütfen Ürün Görseli Giriniz..." }]}
                             name={"productImg"}>
                      <Input placeholder="Lütfen Ürün Görseli Giriniz..." />
                  </Form.Item>
                  <Form.Item name="productCategory" 
                             label="Ürün Kategorisi" 
                             rules={[{ required: true,message: "Lütfen Ürün Kategorisi Seçiniz..." }]}>
                      <Select placeholder="Kategori Seçiniz..." >
                        {
                          categories && (
                            categories?.map(category => (
                              <Select.Option value={category?.categoryName}> {category?.categoryName}</Select.Option>
                            ))
                          )
                        }
                        
                      
                      </Select>
                  </Form.Item>
                  <Form.Item className='flex justify-end'>
                      <Button htmlType='submit' type='primary'> Ürün Ekle</Button>
                  </Form.Item>
              </Form>
        </Modal>
    </ul>
  )
}

export default Products