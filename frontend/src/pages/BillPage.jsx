import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SET_CURRENT_BILL } from '../redux/BillSlice';
import { fetchBills } from "../redux/BillSlice";
import Highlighter from 'react-highlight-words';
import PrintBill from '../components/bills/PrintBill';

const BillPage = () => {

  const dispatch = useDispatch()
  const searchInput = useRef(null)

  const ReduxBills = useSelector((state) => state.bills.bills);
  const ReduxUserEmail = useSelector((state) => state.user.currentUser.userEmail);
  const [ searchedColumn, setSearchedColumn ] = useState('');
  const [ isModalOpen, setIsModalOpen ] = useState(false);
  const [ searchText, setSearchText ] = useState('');
  const [ userBills, setUserBills] = useState('');


 
  useEffect(() => {
    dispatch(fetchBills())
  }, [dispatch]);

   
  useEffect(() => {
    const FilteredBills= ReduxBills.filter(item => item.userEmail===ReduxUserEmail)
    setUserBills([...FilteredBills])
  }, [dispatch,ReduxBills,ReduxUserEmail]);

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
        <div style={{ padding: 8,}}
            onKeyDown={(e) => e.stopPropagation()}>
            <Input ref={searchInput}
                  placeholder={`Search ${dataIndex}`}
                  value={selectedKeys[0]}
                  onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                  onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                  style={{
                      marginBottom: 8,
                      display: 'block',
                  }} />
            <Space>
            <Button type="primary"
                    onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    icon={<SearchOutlined />}
                    size="small"
                    style={{
                      width: 90,
                    }} >
              Search
            </Button>
            <Button onClick={() => clearFilters && handleReset(clearFilters)}
                    size="small"
                    style={{
                      width: 90,
                    }} >
              Reset
            </Button>
            <Button type="link"
                    size="small"
                    onClick={() => {
                      confirm({
                        closeDropdown: false,
                      });
                      setSearchText(selectedKeys[0]);
                      setSearchedColumn(dataIndex);
                    }} >
              Filter
            </Button>
            <Button type="link"
                    size="small"
                    onClick={() => {
                      close();
                    }} >
              close
            </Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered) => (
        <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined,}}/>
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
          <Highlighter highlightStyle={{
                          backgroundColor: '#ffc069',
                          padding: 0,}}
                      searchWords={[searchText]}
                      autoEscape
                      textToHighlight={text ? text.toString() : ''}/>) : (text),
  });

  const columns = [
    {
      title: 'Sipariş Veren',
      dataIndex: 'userName',
      key: 'userName',
      width: '10%',
      ...getColumnSearchProps('userName'),
    },
    {
      title: 'Email Adresi',
      dataIndex: 'userEmail',
      key: 'userEmail',
      width: '15%',
      ...getColumnSearchProps('userEmail'),
    },
    {
      title: 'Teslim Alan:',
      dataIndex: 'teslimAlan',
      key: 'teslimAlan',
      width: '15%',
      ...getColumnSearchProps('teslimAlan'),
    },
    {
      title: 'Oluşturma Tarihi',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: '15%',
      sorter: (a, b) => a.createdAt - b.createdAt,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Ödeme Yöntemi',
      dataIndex: 'paymentMode',
      key: 'paymentMode',
      width: '15%',
      ...getColumnSearchProps('paymentMode'),
    },
    {
      title: 'Toplam Fiyatı',
      dataIndex: 'subTotal',
      key: 'subTotal',
      width: '10%',
      sorter: (a, b) => a.subTotal - b.subTotal,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'actions',
      width: '10%',
      render:(_,record)=>{
        const { address, cartItems, cartTotal, city, contry, paymentMode, subTotal,
          tax, teslimAlan, userEmail, userName } = record ?? {}
        const bill = { address, cartItems, cartTotal, city, contry, paymentMode, subTotal,
          tax, teslimAlan, userEmail, userName }
        return <Button type="link" 
                       className='text-red-500 font-bold' 
                       onClick={() => ShowPrintBill(bill)}>
                    Yazdır
                </Button>
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
     console.log(values)
     setIsModalOpen(false);
  } 
  
  const ShowPrintBill = (bill) => {
     console.log("ShowPrintBill bill: ", bill)
     setIsModalOpen(true);
     dispatch(SET_CURRENT_BILL({bill}))
  }
    
  return (
    <div className='flex flex-col '>
      <h1 className='text-xl font-bold text-center w-full mb-4'>Faturalar</h1>
      <Table bordered columns={columns} dataSource={userBills} pagination={false} scroll={{ x: 500, y: 300 }} />
      <PrintBill isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
    </div>
  )
};


export default BillPage;