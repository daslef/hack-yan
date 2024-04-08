import React from "react";
import { useLogin } from "@refinedev/core";
import { Form, Input, Button, Spin } from 'antd';
import { GoogleOutlined, FacebookOutlined, TwitterOutlined, GithubOutlined } from '@ant-design/icons';
import "./login.css"; 

export const Login = () => {
  const { mutate, isLoading } = useLogin();

  const onSubmit = (values) => {
    mutate(values);
  };

  return (
    <div className="login-container" style={{ maxWidth: '300px', margin: 'auto', marginTop: '50px', padding: '20px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', borderRadius: '8px', background: '#fff' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '24px' }}>Авторизация</h1>
      <p style={{ textAlign: 'center', marginBottom: '30px' }}>Корпоративное приложение для событий и покупки мерча</p>
      <Form onFinish={onSubmit} layout="vertical">
        <Form.Item>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ flex: 1, textAlign: 'center' }}>
              <GoogleOutlined style={{ fontSize: '40px', color: '#db4437', cursor: 'pointer' }} onClick={() => alert('Google вход')} />
              <p>Google</p>
            </div>
            <div style={{ flex: 1, textAlign: 'center' }}>
              <FacebookOutlined style={{ fontSize: '40px', color: '#3b5998', cursor: 'pointer' }} onClick={() => alert('Facebook вход')} />
              <p>Facebook</p>
            </div>
            <div style={{ flex: 1, textAlign: 'center' }}>
              <TwitterOutlined style={{ fontSize: '40px', color: '#1da1f2', cursor: 'pointer' }} onClick={() => alert('Twitter вход')} />
              <p>Twitter</p>
            </div>
            <div style={{ flex: 1, textAlign: 'center' }}>
              <GithubOutlined style={{ fontSize: '40px', color: '#333', cursor: 'pointer' }} onClick={() => alert('GitHub вход')} />
              <p>GitHub</p>
            </div>
          </div>
        </Form.Item>
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Пожалуйста, введите ваш email!' }]}
        >
          <Input placeholder="почта" className="custom-input" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Пожалуйста, введите ваш пароль!' }]}
        >
          <Input.Password placeholder="пароль" className="custom-input" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" disabled={isLoading} block className="login-form-button">
            {isLoading ? <Spin /> : 'Подтвердить'}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;








