import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Input, Modal, Select, Space, Table, message } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { CURRENT_RECORD, DELETE_THE_PRODUCT, EDIT_THE_PRODUCT } from '../redux/ProductsSlice';

const ProductsPage = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const searchInput = useRef(null)

  const ReduxProducts = useSelector(state => state.products.products)
  const ReduxCategories = useSelector(state => state.categories.categories)
  const ReduxCurrentRecord = useSelector(state => state.products.currentRecord)
  
  const [ searchText, setSearchText ] = useState('')
  const [ searchedColumn, setSearchedColumn ] = useState('')
  const [ isModalOpen, setIsModalOpen ] = useState(false)
  const [ NewProducts, setNewProducts ] = useState(ReduxProducts)


  useEffect(() => {
    setNewProducts(ReduxProducts);
  }, [ReduxProducts, ReduxCurrentRecord]);

  
  const handleProductUpdate = useCallback(
    (updatedProduct) => {
      const updatedProducts = ReduxProducts.map((product) =>
        product._id === updatedProduct._id ? updatedProduct : product
      );
      setNewProducts(updatedProducts);
    },
    [ReduxProducts]
  );
  

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: 'Ürün Görseli',
      dataIndex: 'productImg',
      key: 'productImg',
      width: '10%',
      render: (text,record) => {
        return <img src={record.productImg} alt={record.productImg} className="w-14 h-14 object-cover" />;
      },
    },
    {
      title: 'Ürün Adı',
      dataIndex: 'productName',
      key: 'productName',
      width: '20%',
      ...getColumnSearchProps('productName'),
    },
    {
      title: 'Kategori',
      dataIndex: 'productCategory',
      key: 'productCategory',
      width: '20%',
      ...getColumnSearchProps('productCategory'),
    },
    {
      title: 'Fiyat',
      dataIndex: 'productPrice',
      key: 'productPrice',
      width: '20%',
      ...getColumnSearchProps('productPrice'),
      render: (text) => {
        return <p>${text}</p>;
      },
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'actions',
      width: '10%',
      render:(_,record)=>{

              const { _id, productName } = record
              const OpenEditModal = () => {
                  setIsModalOpen(true)
                  dispatch(CURRENT_RECORD({record}))
              }
              
              const RemoveProduct = async () => {

                if(window.confirm(`${productName} isimli kategoriyi silmek istediğinizden emin misiniz?`)) {
                      await fetch("http://localhost:5000/product/delete" ,
                              {
                                    method:"DELETE",
                                    body: JSON.stringify({ productId: _id }),
                                    headers:{ "Content-type": "application/json; charset=UTF-8" },
                                    credentials: "include"
                              }).then((response) =>{
                                    dispatch(DELETE_THE_PRODUCT({ productId: _id }))
                                    setNewProducts(ReduxProducts.filter( item => item._id !== _id))
                                    message.success("Ürün Silindi...")
                              }).catch((error) => {
                                    message.error("Ürün Silinemedi. Tekrar Deneyiniz ...")
                                    console.log("error: ", error)
                              })
                      }
              }

            return(
              <div className='text-base font-normal flex'>
                  <Button onClick={() => RemoveProduct()} 
                          type="link" className='text-red-500'>Sil</Button>
                  <Button onClick={() => OpenEditModal()} 
                          type="link" className='text-green-500'>Düzenle</Button>
              </div>
            )
      }
    },
  ];

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = async (values) => {
 
      const { productName, productPrice, productImg, productCategory } = values
      const product = ReduxProducts.find(item => item.productImg === values.productImg);
      const _id = product ? product._id : undefined

      await fetch("http://localhost:5000/product/update",
            {
                  method:"PUT",
                  body: JSON.stringify({ productId : _id, productName, productPrice, productImg, productCategory }),
                  headers:{ "Content-type": "application/json; charset=UTF-8" },
                  credentials: "include"
            }).then(() =>{
                  
                  dispatch(EDIT_THE_PRODUCT({ _id, productName, productPrice, productImg, productCategory}))
                  handleProductUpdate({ _id, productName, productPrice, productImg, productCategory });
                  setIsModalOpen(false)
                  dispatch(CURRENT_RECORD({record: null}))
                  message.success("Ürün Güncellendi...")
            }).catch((error) => {
                  message.error("Ürün Güncellenemedi. Tekrar Deneyiniz ...")
                  console.log("error: ", error)
            })
      
  }
  const ModalClose = () => {
      setIsModalOpen(false)
      dispatch(CURRENT_RECORD({record:{}}))
  }

  return (
    <div className='flex flex-col '>

      <h1 className='text-xl font-bold text-center w-full mb-4'>Products</h1>

      <Table columns={columns} pagination={false} scroll={{ y: 350 , x:1200 }}
             dataSource={NewProducts.length===0 ? ReduxProducts : NewProducts }  />

      <Modal style={{ fontSize: '14px' }} className='text-base' title="Ürünü Düzenle" open={isModalOpen} footer={false}     onCancel={ModalClose}>
        
          <Form className='h-[375px]' layout={"vertical"} onFinish={onFinish} 
                fields={[ { name: ["productName"], value: ReduxCurrentRecord?.productName },
                          { name: ["productPrice"], value: ReduxCurrentRecord?.productPrice },
                          { name: ["productImg"], value: ReduxCurrentRecord?.productImg },
                          { name: ["productCategory"], value: ReduxCurrentRecord?.productCategory } ]}>
               <Form.Item label="Ürün Adı:" name={"productName"} style={{ fontSize: '14px' }}>
                  <Input value={ReduxCurrentRecord?.productName} placeholder="Lütfen Ürün Adı Giriniz..." />
              </Form.Item>
              <Form.Item label="Ürün Fiyatı" name={"productPrice"} style={{ fontSize: '14px' }} >
                  <Input value={ReduxCurrentRecord?.productPrice} placeholder="Lütfen Ürün Fiyatı Giriniz..." />
              </Form.Item>
              <Form.Item label="Ürün Görseli" name={"productImg"} style={{ fontSize: '14px' }} >
                  <Input value={ReduxCurrentRecord?.productImg} placeholder="Lütfen Görsel Urlsi Giriniz..."/>
              </Form.Item>
              <Form.Item label="Ürün Kategorisi" name={"productCategory"} >
                  <Select value={ReduxCurrentRecord?.productCategory}>
                       { 
                          ReduxCategories.map( category => (
                              <Select.Option style={{ fontSize: '14px' }} value={category.categoryName}>
                                  {category.categoryName}
                              </Select.Option> )) 
                       }       
                  </Select>
              </Form.Item>
              <Form.Item className='float-right ' >
                  <Button htmlType='submit' style={{ fontSize: '14px' }} type="primary">Ürünü Kaydet</Button>
              </Form.Item>
         </Form>
      </Modal>

    </div>
  )
}

export default ProductsPage