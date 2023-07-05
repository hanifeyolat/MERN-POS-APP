import { Button, Carousel, Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import CarouselItem from './CarouselItem';
import { REGISTER_USER } from '../../redux/UserSlice';
import { useDispatch } from 'react-redux';

const Login = () => {
 
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const userLogin = async (values) => {

    console.log("values: ", values)
    try {
      const response = await fetch("http://localhost:5000/user/login", {
        method: "POST",
        body: JSON.stringify({ userEmail: values.email, userPassword:values.password }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        credentials: "include",
      });
  
      if (!response.ok) {
        throw new Error("HTTP error " + response.status);
      }
  
      const data = await response.json();
      console.log("userLogin fetch data : ", data);
      dispatch(REGISTER_USER({ userName: data.userName, userEmail: data.userEmail }));
      message.success(`Hoşgeldiniz ${data.userName}`);
      navigate("/home");
    } catch (error) {
      console.log("userLogin fetch error : ", error);
    }
  };
  
 

  return (
    <div className='flex w-screen h-screen '>
        <div className='xl:w-2/6 lg:w-2/5 md:w-1/2 w-screen overflow-hidden flex flex-col gap-2 items-center justify-center relative px-10' >
            <h1 className='text-3xl font-semibold mb-5'>LOGIN</h1>
            <Form layout="vertical" className='w-full ' onFinish={userLogin}>
                    <Form.Item
                        label="Email:"
                        name="email"
                        rules={[{ required: true, message: 'Email alanı boş geçilemez!' }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item
                          label="Şifre:"
                          name="password"
                          rules={[{ required: true, message: 'Şifre alanı boş geçilemez!' }]} >
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
                    <div className='flex gap-3 w-full text-center items-center justify-center'>
                        <Link to="/reset-password" className='text-blue-600 font-normal'>Şifreni mi Unuttun?</Link>
                    </div>
            </Form>
         
            <div className='flex justify-center items-center w-full text-center mt-2'>
                <div className='flex gap-1 items-center justify-center mx-auto w-full'>
                  <p> Hesabınız yok mu? </p>
                <Link to="/register" className='text-blue-600 font-semibold'>Hemen Kaydol!</Link></div>
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

export default Login