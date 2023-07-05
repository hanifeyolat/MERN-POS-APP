import { Button, Form, Input } from 'antd'



const ChangePassword = () => {

    const onFinish = (values) => {
            console.log("values: ", values)
    }   

    return (
        <div className='flex items-center justify-center w-screen h-screen '>
            <div className='xl:w-2/6 lg:w-2/5 md:w-1/2 w-screen overflow-hidden flex flex-col gap-2 items-center justify-center' >
                <h1 className='text-3xl font-semibold mb-5'>CHANGE PASSWORD</h1>
                <p className='text-2xl font-bold'>Merhaba <span className='text-green-600'> Hanife!</span></p>
                <Form layout="vertical" className='w-full px-10' onFinish={onFinish} >
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

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className='w-full'>
                            Şifreyi Değiştir
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default ChangePassword