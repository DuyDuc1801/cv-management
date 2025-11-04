import { Button, Card, Checkbox, Form, Input } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons"
import './style.scss'
import { getAPI } from "../../../utils/fetchAPI";
import { useNavigate } from "react-router-dom";

function Login() {
    const nav = useNavigate();
    const onFinish = async (values) => {
        console.log(values);
        const recruiters = await getAPI(`http://localhost:3001/recruiter`);
        const check = recruiters.find(item => item.email === values.email && item.password === values.password);
        if(check){
            console.log("login is ok");
            nav("/admin");
        }
        else{
            console.log("login is fail");
        }
    } 

  return (
    <>
        <div className="login">
            <Card className="login__card">
                <h1 style={{textAlign: 'center', color: '#1677ff'}}>ĐĂNG NHẬP</h1>
                <Form
                    name="login"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    autoComplete="off"
                    layout="vertical"
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: "Please input your username!" }]}
                    >
                        <Input prefix={<MailOutlined style={{color: 'gray'}}/>} placeholder="example@email.com"/>
                    </Form.Item>

                    <Form.Item
                        label="Mật khẩu"
                        name="password"
                        rules={[{ required: true, message: "Please input your password!" }]}
                    >
                        <Input.Password prefix={<LockOutlined style={{color: 'gray'}}/>} placeholder="Nhập mật khẩu"/>
                    </Form.Item>

                    <Form.Item name="remember" valuePropName="checked" label={null}>
                        <Checkbox>Ghi nhớ tài khoản</Checkbox>
                    </Form.Item>

                    <Form.Item label={null}>
                        <Button type="primary" htmlType="submit">
                            Đăng nhập
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    </>
  );
}

export default Login;
