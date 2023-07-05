import { Button, Form, Input, Select, message } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { BsFillCaretRightFill } from 'react-icons/bs'
import { CLEAR_CURRENT_BILL, SAVE_BILL, backendCreateBill } from '../../redux/BillSlice'
import { useNavigate } from 'react-router-dom'
import { CLEAR_CART } from '../../redux/CartSlice'

const BillAddress = () => {

    const tax = useSelector((state) => state.cart.tax) 
    const subTotal = useSelector((state) => state.cart.subTotal) 
    const cartItems = useSelector((state) => state.cart.cartItems) 
    const cartTotal = useSelector((state) => state.cart.cartTotal) 
    const ReduxUsername = useSelector((state) => state.user.currentUser.userName) 
    const ReduxUserEmail = useSelector((state) => state.user.currentUser.userEmail) 

    const dispatch = useDispatch()
    const navigate = useNavigate()
    
   const createBill = async (values) => {
    console.log("values: ", values)
       const bill = {
           cartItems: [...cartItems],
           cartTotal,
           tax: Number((cartTotal*tax/100).toFixed(2)) ,
           subTotal,
           userName: ReduxUsername,
           userEmail: ReduxUserEmail,
           ...values
        }
        console.log("bill: ", bill)

        dispatch(backendCreateBill(bill)).then((res) => {
            dispatch(CLEAR_CART())
            dispatch(CLEAR_CURRENT_BILL())
            dispatch(SAVE_BILL({bill: res.meta.arg}))
            navigate("/bills")
            message.success("Sipariş Oluşturuldu...")  
            console.log("res: ", res)
        }).catch(error => {
            console.log("error: ", error)
        })

    }

  return (
    <div className='flex  gap-5 mx-auto my-5 w-full h-full'>
        <Form layout="vertical" className='flex xl:flex-row lg:flex-row  md:flex-row flex-col gap-2 w-full md:pb-28 sm:pb-28 xs:pb-28 xl:h-[600px] lg:h-[600px] h-auto' onFinish={createBill} >
                <div className='flex flex-col xl:w-2/5 lg:w-2/5 md:xl:w-2/5 w-full bg-white border-[#eee] border-[1px] p-3 rounded-lg relative'>
                    <h1 className='text-xl font-bold mb-5'>Sipariş Detayları</h1>
                    <div className='w-full flex flex-col gap-2 pr-4 pb-9 overflow-y-auto '>
                        {
                            cartItems.map((item) => (
                                <div className='flex justify-between items-center gap-2 w-full text-md border-[#eee] border-[1px] py-2 px-4 rounded-md ' key={(Math.random()*100).toString()+"asd"}>
                                    <div className='flex-1 text-start'> 
                                        <div className='flex gap-2 items-center'>
                                            <BsFillCaretRightFill className='mr-1'/>
                                            <p>{item.productName}</p>
                                        </div>
                                    </div>
                                    <p className='flex-1 text-center'>
                                        ${item.productPrice} x {item.productQuantity}
                                    </p>
                                    <p className='flex-1 self-end text-blue text-end'>
                                        ${Number(item.productPrice)*Number(item.productQuantity)}
                                    </p>
                                </div>
                            ))
                        }
                    </div>   
                    <div style={{fontSize: "14px"}} className='absolute bottom-0 left-0 w-full bg-white border-t-[#eee] border-t-[2px] text-lg p-4 flex flex-col'  >
                        <div className='flex gap-2 items-center justify-between w-full'>
                            <p>Cart Total</p>
                            <p>${cartTotal}</p>
                        </div>   
                        <div className='flex gap-2 items-center justify-between w-full'>
                            <p>Tax %{tax}</p>
                            <p>+ ${(cartTotal*tax/100).toFixed(2)}</p>
                        </div>   
                        <div className='flex gap-2 items-center justify-between w-full !text-lg font-semibold text-blue-600'>
                            <p>Subtotal</p>
                            <p>${subTotal.toFixed(2)}</p>
                        </div>  
                    </div>
                </div>
                <div className='flex flex-col xl:w-3/5 lg:w-3/5 md:xl:w-3/5 w-full bg-white border-[#eee] border-[1px] p-3 rounded-lg'>
                        <h1 className='text-xl font-bold mb-5'>Sipariş Bilgileri </h1>
                        <Form.Item className='-mt-2' label="Teslim Alan:"
                                    rules={[{ required: true, message: "Lütfen Ürün Adı Giriniz..." }]}
                                    name={"teslimAlan"}>
                            <Input placeholder="Lütfen Kişi Adı Giriniz..." />
                        </Form.Item>
                        <Form.Item className='-mt-2' label="Adress"
                                    rules={[{ required: true, message: "Lütfen Adres Giriniz..." }]}
                                    name={"address"}>
                            <Input placeholder="Lütfen Adres Giriniz..." />
                        </Form.Item>
                        <Form.Item className='-mt-2' label="Şehir" name={"city"}
                                    rules={[{ required: true, 
                                              message: "Lütfen Şehir Giriniz..." }]} >
                            <Input placeholder="Lütfen Şehir Giriniz..." />
                        </Form.Item>
                        <Form.Item className='-mt-2' label="Teslimat Ülkesi" name={"country"}
                                    rules={[{ required: true, 
                                              message: "Lütfen Teslimat Ülkesi Giriniz..." }]}>
                            <Input placeholder="Lütfen Ülke Giriniz..." />
                        </Form.Item>
                        <Form.Item className='-mt-2' label="Ödeme Yöntemi"
                                    rules={[{ required: true, 
                                              message: "Lütfen Ödeme Yöntemi Giriniz..." }]}
                                    name={"paymentMode"}>
                            <Select>
                                <Select.Option value={"Kredi Kartı"}>Kredi Kartı </Select.Option>
                                <Select.Option value={"Nakit"}>Nakit </Select.Option>
                            </Select>
                        </Form.Item>
                       
                        <Form.Item className='flex justify-end -mt-2'>
                            <Button htmlType='submit' type='primary'> Şipariş oluştur</Button>
                        </Form.Item>
                </div>
        </Form>
    </div>
  )
}

export default BillAddress