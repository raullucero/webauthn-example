import { useState } from 'react';
import Link from 'next/link';
import { Button, Input, Typography, Form } from 'antd';

const { Title } = Typography;

const Login = ({ changeView }) => {
  const [form] = Form.useForm();
  const [username, setUsername] = useState('');

  const handleSubmit = () => {};
  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="w-96 text-center shadow-xl px-10 py-8 bg-white">
        <Title level={2}>Hello there</Title>
        <Form
          form={form}
          layout="vertical"
          initialValues={{ username: username }}
          onValuesChange={(values) => console.log(values)}
          size="large"
        >
          <Form.Item label="Username" name="username">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Login
            </Button>
          </Form.Item>

          <Link href="/signup">
            <Typography.Link>Sign up here</Typography.Link>
          </Link>
        </Form>
      </div>
    </div>
  );
};

export default Login;
