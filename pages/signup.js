import { useState } from 'react';
import { Button, Input, Typography, Form } from 'antd';
import { register } from 'lib/webauthn';

const { Title } = Typography;

const SignUp = () => {
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    console.log(values);
    register(values);
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="w-96 text-center shadow-xl px-10 py-8 bg-white">
        <Title level={2}>Register</Title>
        <Form
          form={form}
          layout="vertical"
          initialValues={{ username: '', name: '' }}
          size="large"
          onFinish={handleSubmit}
        >
          <Form.Item label="Username" name="username">
            <Input />
          </Form.Item>
          <Form.Item label="Name" name="name">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default SignUp;
