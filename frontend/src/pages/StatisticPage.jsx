
import { Area } from '@ant-design/plots';
import StatisticCard from '../components/statistic/StatisticCard';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const StatisticPage = () => {

  const ReduxUserName = useSelector(state => state.user.currentUser.userName)
  const ReduxProducts = useSelector(state => state.products.products)
  const ReduxBills = useSelector(state => state.bills.bills)
  const ReduxCategories = useSelector(state => state.categories.categories)

  const [ UserTotal, setUserTotal ] = useState(0);
  const [ data, setData ] = useState([]);

  useEffect(() =>{
    console.log("ReduxBills: ", ReduxBills)
    let newTotal=0
    ReduxBills.map( bill => newTotal += bill.subTotal )
    setUserTotal(newTotal)
  },[ReduxBills])


  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch('https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };
  const areaConfig = {
    data,
    xField: 'Date',
    yField: 'scales',
    xAxis: {
      range: [0, 1],
      tickCount: 5,
    },
    areaStyle: () => {
      return {
        fill: 'l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff',
      };
    },
  };


  return (
    <div>
        <h1 className='text-xl font-bold text-center w-full mb-2'>İstatistikler</h1>
        <h1 className='text-md font-medium text-center w-full mb-2'>Merhaba, <span className='text-green-600 font-bold'>{ReduxUserName}!</span></h1>
        <div className='xl:grid xl:grid-cols-4 lg:grid lg:grid-cols-4 md:grid md:grid-cols-2 sm:grid sm:grid-cols-2 xs:flex xs:flex-col  gap-4'> 
          <StatisticCard img={"images/user.png"} title={"Toplam Kategori"} desc={ReduxCategories?.length}/>
          <StatisticCard img={"images/money.png"} title={"Toplam Kazanç"} desc={`$ ${UserTotal.toFixed(2)}`}/>
          <StatisticCard img={"images/sale.png"} title={"Toplam Sipariş"} desc={ReduxBills?.length}/>
          <StatisticCard img={"images/product.png"} title={"Toplam Ürün"} desc={ReduxProducts?.length}/>
        </div>

        <div className='flex gap-5 w-full xl:pb-24 lg:pb-24 md:pb-24 sm:pb-24 xs:pb-24 mt-10 '>
           <div className='xl:w-1/2 lg:w-1/2 md:w-1/2 sm:w-full xs:w-full h-60'>
              <Area {...areaConfig} />
           </div>
        </div>
    </div>
  )
}

export default StatisticPage