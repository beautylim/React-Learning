import React, { useState } from 'react';
import './index.scss'
import { Card, Form, Input, message, Button } from 'antd'
import { useAppDispatch } from '../../store/hook';
import { request } from '../../utils';
import { fetchToken } from '../../store/modules/tokenStore';
import { useNavigate } from 'react-router-dom';
import { captchaSentMessage, loginSuccessMessage } from '../../utils/messages';

interface LoginFormValues {
  mobile: string;
  captcha: string;
}

message.config({
  top: 100,
  duration: 3,
  maxCount: 1,
});

const Login: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm<LoginFormValues>();
  const [loading, setLoading] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(0);
  const [isSending, setIsSending] = useState<boolean>(false);

  // 倒计时逻辑
  const startCountdown = (seconds: number = 60) => {
    setCountdown(seconds);
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };


  const fetchCaptcha = async (mobile: string) => {
    const res = await request.post("auth/code?phoneNumber=" + mobile)
    console.log(res)
  }
  // 获取验证码
  const handleGetCaptcha = async () => {
    try {
      // 先校验手机号
      const mobile = form.getFieldValue('mobile');

      setIsSending(true);
      // 模拟发送验证码请求
      await fetchCaptcha(mobile)
      await new Promise((resolve) => setTimeout(resolve, 1000));
      captchaSentMessage(messageApi, mobile)
      // 开始倒计时
      startCountdown(60);
    } catch (error) {
      // 校验失败或请求失败
      if (error instanceof Error) {
        message.warning('请先输入正确的手机号');
      }
    } finally {
      setIsSending(false);
    }
  };
  const dispatch = useAppDispatch()

  const navigate = useNavigate()
  // 处理登录
  const onFinish = async (values: LoginFormValues) => {
    setLoading(true);
    try {
      console.log('登录参数:', values);
      // 模拟登录请求

      const mobile = values.mobile;
      const captcha = values.captcha;
      await dispatch(fetchToken({ username: mobile, telCode: captcha, loginType: "phoneCode" }))
      // 跳转逻辑...
      loginSuccessMessage(messageApi, mobile)
      await new Promise((resolve) => setTimeout(resolve, 1500));
      navigate("/")
    } catch (error) {
      message.error('登录失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      {contextHolder}
      <Card className="login-container">
        <span className='logo'>欢迎登录</span>
        {/* 登录表单 */}
        <Form form={form}
          validateTrigger="onBlur" onFinish={onFinish}>
          <Form.Item
            name="mobile"
            rules={[{ required: true, message: '请输入手机号!' },
            { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号' }]}
          >
            <Input size="large" placeholder="请输入手机号" />

          </Form.Item>
          <Form.Item
            name="captcha"
            rules={[{ required: true, message: '请输入验证码!' },
            { len: 6, message: '验证码为6位数字' }
            ]}
          >
            <div style={{ display: 'flex', gap: '10px' }}>
              <Input
                size="large"
                placeholder="请输入验证码"
                maxLength={6}
                style={{ flex: 1 }}
              />
              <Button
                size="large"
                onClick={handleGetCaptcha}
                disabled={countdown > 0 || isSending}
                loading={isSending}
                style={{ minWidth: '120px' }}
              >
                {countdown > 0 ? `${countdown}s后重发` : '获取验证码'}
              </Button>
            </div>
          </Form.Item>
          <Form.Item>
            <Button type="primary" loading={loading}
              htmlType="submit" size="large" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div >
  )
}

export default Login