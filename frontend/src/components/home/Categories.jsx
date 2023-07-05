import { useState } from 'react';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Table, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_A_CATEGORY, DELETE_THE_CATEGORY, EDIT_THE_CATEGORY } from '../../redux/CategoriesSlice';
import { CLEAR_CATEGORY_FILTER, FILTER_BY_CATEGORY } from '../../redux/ProductsSlice';


const Categories = () => {

  const [ EditCategoryModalOpen, setIsEditCategoryModalOpen ] = useState(false)
  const [ AddCategoryModalOpen, setIsAddCategoryModalOpen ] = useState(false)
  const [ editingCategory, setEditingCategory ] = useState({})
  const ReduxCategories = useSelector((state) => state.categories.categories) || []
  const [ NewCategories, setNewCategories ] = useState([...ReduxCategories] || [])

  const dispatch = useDispatch()

  const AddNewCategory = async (values) => {
      console.log(" AddNewCategory submit çalışıyoooo : ", values)

      await fetch("http://localhost:5000/category/add", {
                    method:"POST",
                    body: JSON.stringify({ categoryName: values.categoryName }),
                    headers: { "Content-type": "application/json; charset=UTF-8" },
                    credentials: "include"
              }).then(() =>{
                    setIsAddCategoryModalOpen(false)
                    setEditingCategory({})
                    dispatch(ADD_A_CATEGORY({category: values}))
                    setNewCategories([...NewCategories, values]);
                    message.success("Yeni Kategori Eklendi...")
              }).catch((error) => {
                    console.log("error: ", error)
                    message.error("Kategori Eklenemedi. Tekrar Deneyiniz ..." )
              })
  }
  
  const editCategory = async (values) => {
        await fetch("http://localhost:5000/category/update" , 
                {
                    method:"PUT",
                    body: JSON.stringify({ categoryId: editingCategory._id, categoryName: values.title}),
                    headers: { "Content-type": "application/json; charset=UTF-8" },
                    credentials: "include"
                }).then((response) =>{
                    setIsEditCategoryModalOpen(false)
                    dispatch(EDIT_THE_CATEGORY({categoryId: editingCategory._id , categoryName:values.title}))
                    setNewCategories(ReduxCategories.map( item => item._id === editingCategory._id  ? 
                                                          {...item , categoryName: values.title} : item))          
                    message.success("Kategori Düzenlendi...")
                    setEditingCategory({})
                }).catch((error) => {
                    message.error("Kategori Düzenlenemedi. Tekrar Deneyiniz ...")
                    console.log("error: ", error)
                })
  }

  const deleteCategory = async (category) => {
    console.log("deleteCategory category parametresi: " , category)

      if(window.confirm(`${category.categoryName} isimli kategoriyi silmek istediğinizden emin misiniz?`)) {

        await fetch("http://localhost:5000/category/delete" ,
                {
                  method:"DELETE",
                  body: JSON.stringify({categoryId: category._id }),
                  headers:{ "Content-type": "application/json; charset=UTF-8" },
                  credentials: "include"
                }).then((response) =>{
                    setIsEditCategoryModalOpen(false)
                    dispatch(DELETE_THE_CATEGORY({categoryId: category._id, categoryName: category.categoryName}))
                    const updatedCategories = ReduxCategories.filter((item) => item._id !== category._id);
                    setNewCategories([...updatedCategories]);
                    message.success("Kategori Silindi...")
                }).catch((error) => {
                    message.error("Kategori Silinemedi. Tekrar Deneyiniz ...")
                    console.log("error: ", error)
                })
      }
  }

  const columns = [
    {
      title: "Kategori İsmi",
      dataIndex: "title",
      render: (_,record) => {
      
            if (record._id === editingCategory._id) {
              return (
                <Form.Item className="mb-0" name="title">
                  <Input defaultValue={editingCategory.categoryName} />
                </Form.Item>
              );
            } else {
              return <p>{record.categoryName}</p>;
            }
      }
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => {
       
            return (
                <div>
                  <Button type="link" onClick={() => setEditingCategory(record)} className="pl-0">
                    Düzenle
                  </Button>
                  <Button type="link" htmlType="submit" className="text-green-500">
                    Kaydet
                  </Button>
                  <Button type="text" className='!text-red-500' onClick={() => deleteCategory(record)} >
                    Sil
                  </Button>
                </div>
            );
      },
    },

  ]

  return (
    <ul className='categories-container xl:scrollbar-hidden lg:scrollbar-hidden md:scrollbar-visible sm:scrollbar-visible xs:scrollbar-visible '>
          <li onClick={() => dispatch(CLEAR_CATEGORY_FILTER())} className='category-item'><span>Tümü</span></li>
          {
            NewCategories.length===0 ? ReduxCategories?.map(category => (
              <li onClick={() => dispatch(FILTER_BY_CATEGORY({category}))} className='category-item' key={category?._id+Math.random()}> <span>{category?.categoryName}</span></li>))
              : NewCategories?.map(category => (
                <li onClick={() => dispatch(FILTER_BY_CATEGORY({category}))} className='category-item' key={category?._id+Math.random()}> <span>{category?.categoryName}</span></li>))
    
          }
          <li onClick={() => setIsEditCategoryModalOpen(true)} className='category-item !bg-orange-900 hover:!bg-orange-700 transition ease-in flex items-center justify-center text-white border-none'>
              <EditOutlined style={{ fontSize: '22px' }} />
          </li>
          <li onClick={() => setIsAddCategoryModalOpen(true)} className='category-item !bg-purple-900 hover:!bg-purple-700 transition ease-in flex items-center justify-center text-white border-none'>
              <PlusOutlined style={{ fontSize: '22px' }} />
          </li>


          {/* EDİT CATEGORY */}
          <Modal title="Kategori Düzenle" footer={false} open={EditCategoryModalOpen} onCancel={()=>setIsEditCategoryModalOpen(false)}>
              <Form onFinish={editCategory}>
                    <Table columns={columns} 
                          dataSource={NewCategories}  
                          rowKey={"_id"} bordered pagination={false}/>
              </Form>
          </Modal>

          {/* ADD CATEGORY */}
          <Modal className='mt-5' title="Kategori Ekle" footer={false} open={AddCategoryModalOpen} onCancel={()=>setIsAddCategoryModalOpen(false)}>
                <Form layout="vertical" onFinish={AddNewCategory}>
                    <Form.Item label="Kategori" name={"categoryName"}
                              rules={[{ required: true, message: "Lütfen Kategori Giriniz..." }]}>
                        <Input placeholder="Kategori Ekleyin.." />
                    </Form.Item>
                    <Form.Item className='flex justify-end'>
                        <Button htmlType='submit' type='primary'> Kategori Ekle</Button>
                    </Form.Item>
                </Form>
          </Modal>        
    </ul>
  )
}

export default Categories