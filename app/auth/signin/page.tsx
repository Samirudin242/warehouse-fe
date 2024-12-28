"use client";

import React from "react";
import Swal from "sweetalert2";
import Cookies from "js-cookie"; // Client-side cookie management
import { toast, Bounce, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import { Col, Form, Image, Input, Button, Row } from "antd";
import { Tlogin } from "@/utils/types/auth";
import { configUrl } from "@/config/config";
import "react-toastify/dist/ReactToastify.css";
// import "./style.module.css";

function page() {
  const router = useRouter();
  const [formLogin] = Form.useForm();

  //   const onFinish = async (values: Tlogin) => {
  //     try {
  //       const response = await fetch(`${configUrl.apiUrl}/auth/login`, {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(values),
  //         credentials: "include",
  //       });

  //       if (response.ok) {
  //         const data = await response.json();
  //         console.log(data, "Success Response");
  //         Cookies.set("accessToken", data.data.accessToekn); //set the cookie
  //         // Success toast message
  //         toast.success("🎉 Login successful!", {
  //           position: "top-center",
  //           autoClose: 1000,
  //           hideProgressBar: false,
  //           closeOnClick: true,
  //           pauseOnHover: true,
  //           draggable: true,
  //           progress: undefined,
  //           theme: "light",
  //           transition: Bounce,
  //         });

  //         setTimeout(() => {
  //           router.push("/");
  //         }, 1000);

  //         // Redirect or handle successful login here
  //       } else {
  //         const errorData = await response.json();
  //         console.error(errorData, "Error Response");

  //         // Error toast message
  //         toast.error("❌ Invalid credentials. Please try again.", {
  //           position: "top-center",
  //           autoClose: 3000,
  //           hideProgressBar: false,
  //           closeOnClick: true,
  //           pauseOnHover: true,
  //           draggable: true,
  //           progress: undefined,
  //           theme: "light",
  //           transition: Bounce,
  //         });
  //       }
  //     } catch (error) {
  //       console.error(error, "Network or Unexpected Error");

  //       // Error toast for network or unexpected errors
  //       toast.error("❌ An unexpected error occurred. Please try again later.", {
  //         position: "top-center",
  //         autoClose: 1000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: "light",
  //         transition: Bounce,
  //       });
  //     }
  //   };

  const handleClickRouter = (e: any) => {
    e.preventDefault();
    const href = e.currentTarget.href;
    router.push(href);
  };

  return (
    <div className="flex items-center h-screen bg-gray-100 text-black">
      <div className="w-4/6 bg-white p-10 rounded-lg shadow-lg mx-auto">
        <ToastContainer /> {/* Ensure this is included */}
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
              //   onFinish={onFinish}
              layout="vertical"
              className="mt-10"
            >
              <Row className="w-full">
                <Col className="w-full">
                  <Form.Item
                    name="username"
                    label="Email address"
                    rules={[
                      {
                        required: true,
                        message: "Please input your email !",
                      },
                      {
                        type: "email",
                        message: "Please input a valid email !",
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

export default page;
