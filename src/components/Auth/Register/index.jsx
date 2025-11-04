import { Button, Card, Form, Input, notification } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  LockOutlined,
  BankOutlined,
} from "@ant-design/icons";
import "./style.scss";
import { getAPI, postAPI } from "../../../utils/fetchAPI";

function Register() {
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const nav = useNavigate();

  const onFinish = async (values) => {
    const {confirmPassword, ...data} = values;
    console.log(data);
    const recruiters = await getAPI(`http://localhost:3001/recruiter`);
    const check = recruiters.find(item => item.email === data.email || item.phone === data.phone);
    if(check){
        api.error({
            message: 'Lỗi!',
            description:
                'Email hoặc số điện thoại đã được đăng ký!',
            duration: 2
        });
    }
    else{
        const register = await postAPI(`http://localhost:3001/recruiter`, data);
        if(register){
            api.success({
                message: 'Thành công!',
                description:
                    'Bạn đã đăng ký tài khoản thành công!',
                duration: 2
            });
            setTimeout(() => {
                nav('/login');
            }, 2000);
        }
        else{
            api.error({
                message: 'Thất bại!',
                description:
                    'Bạn đã đăng ký tài khoản thất bại!',
                duration: 2
            });
        }
    }  
  }

  return (
    <div className="register">
        {contextHolder}
      <Card className="register__form">
        <div>
          <h1 style={{ margin: "12px 0", textAlign: "center" , color: '#1677ff'}}>
            Đăng Ký Tài Khoản
          </h1>
        </div>

        <Form
          form={form}
          name="register"
          size="middle"
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            label="Tên công ty"
            name="companyName"
            rules={[{ required: true, message: "Vui lòng nhập tên công ty!" }]}
          >
            <Input prefix={<BankOutlined style={{color: 'gray'}}/>} placeholder="Nhập tên công ty" />
          </Form.Item>

          <Form.Item
            label="Họ và tên"
            name="fullName"
            rules={[{ required: true, message: "Vui lòng nhập họ và tên!" }]}
          >
            <Input prefix={<UserOutlined style={{color: 'gray'}}/>} placeholder="Nhập họ và tên" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email!" },
              { type: "email", message: "Email không hợp lệ!" },
            ]}
          >
            <Input prefix={<MailOutlined style={{color: 'gray'}}/>} placeholder="example@email.com" />
          </Form.Item>

          <Form.Item
            label="Số điện thoại"
            name="phone"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại!" },
            ]}
          >
            <Input prefix={<PhoneOutlined style={{color: 'gray'}}/>} placeholder="0123456789" />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[
              { required: true, message: "Vui lòng nhập mật khẩu!" },
              { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự!" },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined style={{color: 'gray'}}/>}
              placeholder="Nhập mật khẩu"
            />
          </Form.Item>

          <Form.Item
            label="Xác nhận mật khẩu"
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
                { required: true, message: "Vui lòng xác nhận mật khẩu!" },
                ({ getFieldValue }) => ({
                    validator(_, value) {
                        if(!value || getFieldValue("password") === value){
                            return Promise.resolve();
                        }
                        return Promise.reject(new Error("Mật khẩu xác nhận không khớp!"))
                    }
                })
            ]}
          >
            <Input.Password
              prefix={<LockOutlined style={{color: 'gray'}}/>}
              placeholder="Nhập lại mật khẩu"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Đăng Ký
            </Button>
          </Form.Item>

          <div className="text-center text-gray-600">
            Đã có tài khoản?{" "}
            <NavLink
              href="#"
              className="text-blue-500 hover:text-blue-600 font-semibold"
            >
              Đăng nhập
            </NavLink>
          </div>
        </Form>
      </Card>
    </div>
  );
}

export default Register;
