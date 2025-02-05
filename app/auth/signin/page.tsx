"use client";

import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { toast, Bounce, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import { Col, Form, Image, Input, Button, Row } from "antd";
import axiosRequest from "@/hooks/useAxios";
import { configUrl } from "@/config/configUrl";
import "react-toastify/dist/ReactToastify.css";
import { useAppContext } from "@/contexts/useContext";
import GoogleLoginButton from "@/components/auth/GoogleLoginButton";

interface IFormLogin {
  usernameEmail: string;
  password: string;
}

function SignInPage() {
  const router = useRouter();
  const [formLogin] = Form.useForm();
  const { lastUrl, setLoading } = useAppContext();

  useEffect(() => {
    setLoading(false);
  }, []);

  const onFinish = async (values: IFormLogin) => {
    try {
      const { response, error } = await axiosRequest({
        url: `${configUrl.apiUrlUserService}/auth/login`,
        method: "POST",
        body: {
          usernameEmail: values.usernameEmail,
          password: values.password,
        },
      });

      console.log(response?.data?.isSuccess, "Response");
      if (response?.data?.isSuccess) {
        Cookies.set("accessToken", response?.data.accessToken);
        // Success toast message
        toast.success("🎉 Login successful!", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });

        setTimeout(() => {
          router.push(lastUrl);
        }, 1000);
      } else {
        // Error toast message
        toast.error("❌ Invalid credentials. Please try again.", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    } catch (error) {
      // Error toast for network or unexpected errors
      toast.error("❌ An unexpected error occurred. Please try again later.", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  const handleClickRouter = (e: any) => {
    setLoading(true);
    e.preventDefault();
    const href = e.currentTarget.href;
    router.push(href);
  };

  return (
    <div className="flex items-center h-screen bg-gray-100 text-black">
      <div className="w-4/6 bg-white p-10 rounded-lg shadow-lg mx-auto">
        <ToastContainer />
        <div className="flex justify-between">
          <div className="flex items-center">
            <Image
              width={450}
              height={400}
              preview={false}
              src="/images/online-shopping.png"
            />
          </div>
          <div className="w-96">
            <div className="text-center">
              <div className="text-2xl">Log in</div>
              <div>To access your account</div>
            </div>
            <Form
              form={formLogin}
              onFinish={onFinish}
              layout="vertical"
              className="mt-10"
            >
              <Row className="w-full">
                <Col className="w-full">
                  <Form.Item
                    name="usernameEmail"
                    label="Email address or Username"
                    rules={[
                      {
                        required: true,
                        message: "Please input your email !",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Row className="w-full -mt-1">
                <Col className="w-full">
                  <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password !",
                      },
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>
                </Col>
                <div className="underline -mt-1 text-slate-500 text-center cursor-pointer">
                  I forget my password
                </div>
              </Row>
              <Form.Item className="mt-4 flex justify-center items-center">
                <Button htmlType="submit">Login</Button>
              </Form.Item>
            </Form>
            <div className="w-full mb-3 -mt-3flex items-center justify-center content-center place-items-center">
              <div>
                <GoogleLoginButton />
              </div>
            </div>
            <div className="flex flex-col items-center justify-center text-center">
              <div className="text-sm">Don't have an account?</div>
              <div className="mt-3">
                <a href="/auth/signup" onClick={handleClickRouter}>
                  <Button htmlType="submit">Create an account</Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;
