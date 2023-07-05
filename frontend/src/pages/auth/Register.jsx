import { Button, Carousel, Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { REGISTER_USER } from '../../redux/UserSlice';
import { useDispatch, useSelector } from "react-redux";
import CarouselItem from './CarouselItem';


const Register = () => {

  const dispatch=useDispatch()
  const navigate=useNavigate()
  const ReduxRefreshToken = useSelector(state => state.user.refreshToken)
   
  const userRegister = async (values) => {

    await fetch("http://localhost:5000/user/register", {
            method: "POST",
            body: JSON.stringify({ userName: values.userName, userEmail: values.userEmail, userPassword: values.userPassword }),
            headers: { 
              "Content-type": "application/json; charset=UTF-8",
            },
            credentials: "include" 
          }).then((data) => {

            console.log("userRegister fetch data : ", data)
            dispatch(REGISTER_USER({ userName: values.userName, userEmail: values.userEmail}))
            message.success(`Hoşgeldiniz ${values.userName}`)
            navigate("/home")

          }).catch((error) => {
            console.log("userRegister fetch error : ", error)
          })

  }

  return (
    <div className='flex w-screen h-screen '>
          <div className='xl:w-2/6 lg:w-2/5 md:w-1/2 w-screen overflow-hidden flex flex-col gap-2 items-center justify-center relative px-10' >
              <h1 className='text-3xl font-semibold mb-10'>REGISTER</h1>
              <Form layout="vertical" className='w-full ' onFinish={userRegister}>
                      <Form.Item
                          label="Kullanıcı Adı:"
                          name="userName"
                          rules={[{ required: true, message: 'Kullanıcı adı boş geçilemez!' }]}>
                        <Input />
                      </Form.Item>
                            
                      <Form.Item
                          label="Email"
                          name="userEmail"
                          rules={[{ required: true, message: 'Email alanı boş geçilemez!' }]} >
                          <Input />
                      </Form.Item>

                      <Form.Item
                          label="Şifre"
                          name="userPassword"
                          rules={[{ required: true, message: 'Şifre alanı boş geçilemez!' }]} >
                          <Input.Password />
                      </Form.Item>

                      <Form.Item
                          label="Şifre Tekrar:"
                          name="userPasswordAgain"
                          rules={[{ required: true, message: 'Şifre tekrar alanı boş geçilemez!' }]} >
                          <Input.Password />
                      </Form.Item>

                      {/* <Form.Item name="remember" valuePropName="checked" >
                          <Checkbox>Remember me</Checkbox>
                      </Form.Item> */}

                      <Form.Item>
                          <Button type="primary" htmlType="submit" className='w-full'>
                              Submit
                          </Button>
                      </Form.Item>
              </Form>
              <div className='flex justify-center items-center w-full text-center mt-2'>
                  <div className='flex items-center justify-center gap-3 w-full mx-auto text-center'>
                      <p> Hesabınız var mı? </p>
                      <Link to="/login" className='text-blue-600 font-semibold'>Hemen Giriş Yapın!</Link>
                  </div>
              </div>
          </div>
          <div className="xl:w-4/6 lg:w-3/5 md:w-1/2 md:flex hidden bg-[#6c63ff] h-full">
            <div className="w-full h-full flex items-center">
              <div className="w-full">
                <Carousel className="!h-full px-6" autoplay>
                  <CarouselItem
                    img="/images/responsive.svg"
                    title="Responsive"
                    desc="Tüm Cihaz Boyutlarıyla Uyumluluk"
                  />
                  <CarouselItem
                    img="/images/statistic.svg"
                    title="İstatistikler"
                    desc="Geniş Tutulan İstatistikler"
                  />
                  <CarouselItem
                    img="/images/customer.svg"
                    title="Müşteri Memnuniyeti"
                    desc="Deneyim Sonunda Üründen Memnun Müşteriler"
                  />
                  <CarouselItem
                    img="/images/admin.svg"
                    title="Yönetici Paneli"
                    desc="Tek Yerden Yönetim"
                  />
                </Carousel>
              </div>
            </div>
          </div>
    </div>
  )
}

export default Register