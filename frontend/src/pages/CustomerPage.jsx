import { Button, Form, Input, message } from 'antd';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const data = [
  {
    key: '1',
    id:"adasdasd",
    customerName: "Hanife Yolat",
    phoneNumber: 5301129864,
    address: "Cebeci Mahallesi",
  },
  {
    key: '1',
    id:"adasdasd",
    customerName: "Hanife Yolat",
    phoneNumber: 5301129864,
    address: "Cebeci Mahallesi",
  },
  {
    key: '1',
    id:"adasdasd",
    customerName: "Hanife Yolat",
    phoneNumber: 5301129864,
    address: "Cebeci Mahallesi",
  }, 
 
]


const CustomerPage = () => {

  const navigate = useNavigate()
  const [ error, setErrorMessage ] = useState(null)
  const ReduxCurrentUser = useSelector(state => state.user.currentUser)

  const onFinish = async (values) => {
      console.log("values: ", values)
      setErrorMessage(null)
      const { userPassword, userPasswordAgain} = values
      if(userPassword !== userPasswordAgain) {
        setErrorMessage("Parolalar eşit değil!")
        return 
      }
          await fetch("http://localhost:5000/user/change-password", {
                          method:"PUT",
                          body: JSON.stringify( {
                            userEmail: ReduxCurrentUser.userEmail,
                            userPassword,
                            userPasswordAgain,
                         }),
                         headers: { 
                            "Content-type": "application/json; charset=UTF-8",
                         },
                         credentials: "include"
                         })
                         .then((data) => {
                            console.log("onFinish data: ", data)
                            message.success("Şifreniz başarıyla güncellendi...")
                            navigate("/home")
                         }).catch((error) => {
                            console.log("onFinish error: ", error)
                         })

  }   

  return (
    <div className='w-full h-full'>
        <h1 className='text-xl font-semibold'>Profilim</h1>
        <p className='text-md mb-5'>Merhaba, <span className='text-green-600'> {ReduxCurrentUser.userName}! </span> Şifreni değiştir</p>
        

        <Form layout="vertical" className='w-[400px] md:w-[400px] sm:w-[300px] xs:w-full' onFinish={onFinish} >
            <Form.Item
                label="Yeni Parolanız:"
                name="userPassword"
                rules={[{ required: true, message: 'Parola alanı boş geçilemez!' }]}>
                <Input.Password />
            </Form.Item>
                    
            <Form.Item
                label="Yeni Parolanız (Tekrar):"
                name="userPasswordAgain"
                rules={[{ required: true, message: 'Parola alanı boş geçilemez!' }]} >
                  <Input.Password />
            </Form.Item>
            <p className='text-xs mb-5 text-red-500'>{error}</p>
            <Form.Item>
                <Button type="primary" htmlType="submit" className='w-full'>
                    Şifreyi Değiştir
                </Button>
            </Form.Item>
        </Form>
        
    </div>
  )
}

export default CustomerPage