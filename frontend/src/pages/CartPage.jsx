import { MinusCircleOutlined, PlusCircleOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, Modal, Select, Space, Table, message } from 'antd';
import { useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { useDispatch, useSelector } from 'react-redux';
import { CLEAR_CART, DECREASE_QUANTITY, INCREASE_QUANTITY, REMOVE_FROM_CART } from '../redux/CartSlice';
import { CLEAR_CURRENT_BILL, SAVE_BILL } from '../redux/BillSlice';
import { Navigate, useNavigate } from 'react-router-dom';
import create from '@ant-design/icons/lib/components/IconFont';

const data = [
  {
    key: '1',
    id:"adasdasd",
    img: "https://i.lezzet.com.tr/images-xxlarge-secondary/elma-nasil-yenir-221135ca-f383-474c-a4f5-ad02a45db978.jpg",
    name: 'Elma',
    category: "Meyve",
    price: 12,
    mount: 2,
    totalPrice: 24
  },
  {
    key: '2',
    id:"adasdasd",
    img: "https://i.lezzet.com.tr/images-xxlarge-secondary/elma-nasil-yenir-221135ca-f383-474c-a4f5-ad02a45db978.jpg",
    name: 'Elma 2',
    category: "Meyve",
    price: 12,
    mount: 2,
    totalPrice: 24
  },
  {
    key: '3',
    id:"adasdasd",
    img: "https://i.lezzet.com.tr/images-xxlarge-secondary/elma-nasil-yenir-221135ca-f383-474c-a4f5-ad02a45db978.jpg",
    name: 'Elma 3',
    category: "Meyve",
    price: 12,
    mount: 2,
    totalPrice: 24
  },
  {
    key: '4',
    id:"adasdasd",
    img: "https://i.lezzet.com.tr/images-xxlarge-secondary/elma-nasil-yenir-221135ca-f383-474c-a4f5-ad02a45db978.jpg",
    name: 'Elma',
    category: "Meyve",
    price: 12,
    mount: 2,
    totalPrice: 24
  },
 

];


const CartPage = () => {

  const searchInput = useRef(null);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch()

  const ReduxCartItems = useSelector(state => state.cart.cartItems)
  const ReduxCartTotal = useSelector(state => state.cart.cartTotal)
  const ReduxCartTax = useSelector(state => state.cart.tax)
  const ReduxSubTotal = useSelector(state => state.cart.subTotal)
  const ReduxUserName = useSelector(state => state.user.currentUser.userName)
  const ReduxUserEmail = useSelector(state => state.user.currentUser.userEmail) 

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
            padding: 0,
          }}
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
        return <img src={record.productImg} alt={text} className="w-14 h-14 object-cover" />;
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
      title: 'Ürün Fiyatı',
      dataIndex: 'productPrice',
      key: 'productPrice',
      width: '10%',
      sorter: (a, b) => a.productPrice - b.productPrice,
      sortDirections: ['descend', 'ascend'],
      render: (text,record) => {
        return (
          <div className='flex items-center gap-2 '>
            <p> ${record.productPrice} </p>
          </div>
        )
      }
    },
    {
      title: 'Ürün Adeti',
      dataIndex: 'productQuantity',
      key: 'productQuantity',
      width: '10%',
      sorter: (a, b) => a.productQuantity - b.productQuantity,
      sortDirections: ['descend', 'ascend'],
      render: (text,record) => {
        return (
          <div className='flex items-center gap-2 '>
              <PlusCircleOutlined onClick={() => dispatch(INCREASE_QUANTITY({product:record}))} 
                                  className='bg-blue-600 hover:bg-blue-400 transition ease-in p-[5px] rounded-full text-white cursor-pointer' />
                    <p> {record.productQuantity} </p>
              <MinusCircleOutlined onClick={() => dispatch(DECREASE_QUANTITY({product:record}))} 
                                  className='bg-blue-600 hover:bg-blue-400 transition ease-in p-[5px] rounded-full text-white cursor-pointer' />
          </div>
        )
      }
    },
    {
      title: 'Toplam Fiyatı',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      width: '10%',
      render: (text,record) => {
        return (
          <div className='flex items-center gap-2 '>
            <p> ${record.productPrice*record.productQuantity} </p>
          </div>
        )
      }
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'actions',
      width: '10%',
      render:(_,record)=>{
        return <Button onClick={() => dispatch(REMOVE_FROM_CART({product:record}))} 
                       type="link" className='text-red-500 font-bold'>Sil</Button>
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

  const onFinish = (values) => {
      console.log("values: ", values)
      const bill = {
          cartItems: [...ReduxCartItems],
          cartTotal: ReduxCartTotal,
          tax: (ReduxCartTotal*ReduxCartTax/100).toFixed(2) ,
          subTotal: ReduxSubTotal,
          userName: ReduxUserName,
          userEmail: ReduxUserEmail,
          createdAt: new Date().now(),
          ...values,
      }
      console.log("bill: " , bill )
      setIsModalOpen(false)
      dispatch(CLEAR_CART())
      dispatch(SAVE_BILL({bill}))
      dispatch(CLEAR_CURRENT_BILL())
      message.success("Sipariş Oluşturuldu...")     
      navigate("/bills")
  }

  return (
    <div className='flex flex-col '>

      <h1 className='text-xl font-bold text-center w-full mb-4'>Sepet</h1>

      <Table columns={columns} pagination={false} scroll={{ y: 250 , x:1200 }}
             dataSource={ReduxCartItems.length === 0 ? null : ReduxCartItems}  />

      <Card className='w-60 px-4 my-4 flex flex-col gap-4 justify-end self-end'>
          <div className='w-full flex items-center justify-between'>
            <p> Ara Toplam</p> 
            <p> ₺{ReduxCartTotal}</p> 
          </div>
          <div className='w-full flex items-center justify-between pt-2'>
            <p>KDV %{ReduxCartTax}</p> 
            <p> + ₺{(ReduxCartTotal*ReduxCartTax/100).toFixed(2)}</p> 
          </div>
          <div className='w-full flex items-center justify-between pt-2'>
            <b>Genel Toplam</b> 
            <b> ₺ {ReduxSubTotal.toFixed(2)}</b> 
          </div>
          <div className='flex justify-end pt-2'>
              <Button type="primary" onClick={showModal}>
                    Sipariş Oluştur
              </Button>
          </div>
      </Card>

      <Modal title="Sipariş Bilgileri" open={isModalOpen} footer={false} onCancel={() => setIsModalOpen(false)}>
          <Form layout={"vertical"} onFinish={onFinish}>
               <Form.Item label="Teslim Alan:"
                          rules={[{ required: true, message: "Lütfen Ürün Adı Giriniz..." }]}
                          name={"teslimAlan"}>
                  <Input placeholder="Lütfen Kişi Adı Giriniz..." />
              </Form.Item>
              <Form.Item label="Adress"
                          rules={[{ required: true, message: "Lütfen Ürün Fiyatı Giriniz..." }]}
                          name={"address"}>
                  <Input placeholder="Lütfen Adres Giriniz..." />
              </Form.Item>
              <Form.Item label="Şehir" name={"city"}
                          rules={[{ required: true, 
                                    message: "Lütfen Şehir Giriniz..." }]} >
                  <Input placeholder="Lütfen Şehir Giriniz..." />
              </Form.Item>
              <Form.Item label="Teslimat Ülkesi" name={"country"}
                          rules={[{ required: true, 
                                    message: "Lütfen Teslimat Ülkesi Giriniz..." }]}>
                  <Input placeholder="Lütfen Ülke Giriniz..." />
              </Form.Item>
              <Form.Item label="Ödeme Yöntemi"
                          rules={[{ required: true, 
                                    message: "Lütfen Ödeme Yöntemi Giriniz..." }]}
                          name={"paymentMode"}>
                  <Select>
                      <Select.Option value={"Kredi Kartı"}>Kredi Kartı </Select.Option>
                      <Select.Option value={"Nakit"}>Nakit </Select.Option>
                  </Select>
              </Form.Item>
              
             <Card className='w-full mt-3 flex flex-col justify-end self-end'>
                <div className='w-full flex items-center justify-between'>
                  <p> Ara Toplam</p> 
                  <p> ₺{ReduxCartTotal}</p> 
                </div>
                <div className='w-full flex items-center justify-between pt-2'>
                  <p>KDV %{ReduxCartTax}</p> 
                  <p> + ₺{(ReduxCartTotal*ReduxCartTax/100).toFixed(2)}</p> 
                </div>
                <div className='w-full flex items-center justify-between pt-2'>
                  <b>Genel Toplam</b> 
                  <b> ₺ {ReduxSubTotal.toFixed(2)}</b> 
                </div>
                <Form.Item className='flex justify-end -mb-2 mt-2 '>
                    <Button type="primary" htmlType='submit' className='flex justify-end'>
                          Sipariş Oluştur
                    </Button>
                </Form.Item>
            </Card>
         </Form>
        
      </Modal>

    </div>
  )
};
export default CartPage;