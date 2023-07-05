import { Button, Carousel, Form, Input } from 'antd';
import { Link } from 'react-router-dom';
import CarouselItem from './CarouselItem';


const ResetPassword = () => {

  const onFinish = async (values) => {
    await fetch("http://localhost:5000/user/reset-password", {
      method: "POST",
      body: JSON.stringify({ userEmail: values.email }),
      headers: { 
        "Content-type": "application/json; charset=UTF-8",
      },
      credentials: "include" 
    }).then((data) => {
      console.log("Mail gönderildi....");

    }).catch((error) => {
      console.log("Mail gönderilemedi : ", error);
    });
  }

 

  return (
    <div className='flex w-screen h-screen '>
        <div className='xl:w-2/6 lg:w-2/5 md:w-1/2 w-screen overflow-hidden flex flex-col gap-2 items-center justify-center relative' >
            <h1 className='text-3xl font-semibold mb-5'>RESET PASSWORD</h1>
            <Form layout="vertical" className='w-full px-10' onFinish={onFinish} >
                    <Form.Item
                        label="Lütfen email adresinizi giriniz!"
                        name="email"
                        rules={[{ required: true, message: 'Email alanı boş geçilemez!' }]} >
                         <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className='w-full'>
                           Mail Gönder
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

export default ResetPassword