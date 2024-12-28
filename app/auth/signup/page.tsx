"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Checkbox, Col, Form, Image, Input, Button, Row, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

function page() {
  const router = useRouter();
  const [form] = Form.useForm();

  const handleClickRouter = (e: any) => {
    e.preventDefault();
    const href = e.currentTarget.href;
    router.push(href);
  };

  const handleUpload = (info: any) => {
    if (info.file.status === "done") {
      // Get this url from response in real world.
      console.log(info.file.response);
    }
  };

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="flex items-center h-screen bg-gray-100 text-black">
      <div className="w-4/6 bg-white p-10 rounded-lg shadow-lg mx-auto">
        <div className="flex justify-between">
          <div className="w-96">
            <div>
              <div>
                <Image
                  width="50px"
                  preview={false}
                  src="/images/self.png"
                  className="rounded-3xl"
                />
              </div>
              <div className="text-2xl">Create an account</div>
              <div>
                Already have an account?{" "}
                <a
                  className="underline cursor-pointer"
                  href="/auth/signin"
                  onClick={handleClickRouter}
                >
                  Log in
                </a>
              </div>
            </div>
            <Form
              layout="vertical"
              className="mt-10"
              form={form}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Row className="flex justify-between">
                <Col>
                  <Form.Item
                    label="First Name"
                    name="firstName"
                    rules={[
                      {
                        required: true,
                        message: "Please input your first name!",
                      },
                    ]}
                  >
                    <Input className="max-w-3xl" />
                  </Form.Item>
                </Col>
                <Col>
                  <Form.Item
                    label="Last Name"
                    name="lastName"
                    rules={[
                      {
                        required: true,
                        message: "Please input your last name!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Row className="w-full">
                <Col className="w-full">
                  <Form.Item
                    label="Email Address"
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: "Please input your email address!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Row className="w-full">
                <Col className="w-full">
                  <Form.Item
                    label="Phone Number"
                    name="phoneNumber"
                    rules={[
                      {
                        required: true,
                        message: "Please input your phone number!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Row className="w-full">
                <Col className="w-full">
                  <Form.Item
                    label="Profile Picture"
                    name="profilePicture"
                    rules={[
                      {
                        required: true,
                        message: "Please upload your profile picture!",
                      },
                    ]}
                  >
                    <Upload
                      name="profile"
                      listType="picture"
                      className="upload-list-inline"
                      onChange={handleUpload}
                    >
                      <Button icon={<UploadOutlined />}>Upload</Button>
                    </Upload>
                  </Form.Item>
                </Col>
              </Row>
              <Row className="flex justify-between">
                <Col>
                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                      {
                        pattern:
                          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                        message:
                          "Password must be at least 8 characters long and include letters, numbers, and symbols.",
                      },
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>
                </Col>
                <Col>
                  <Form.Item
                    label="Confirm Your Password"
                    name="confirmPassword"
                    dependencies={["password"]}
                    rules={[
                      {
                        required: true,
                        message: "Please confirm your password!",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue("password") === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error(
                              "The two passwords that you entered do not match!"
                            )
                          );
                        },
                      }),
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>
                </Col>
              </Row>
              <div>
                <Checkbox>
                  <span className="text-xs text-slate-500">Show password</span>
                </Checkbox>
              </div>
              <Form.Item className="mt-4">
                <Button htmlType="submit">Create an account</Button>
              </Form.Item>
            </Form>
          </div>
          <div className="flex items-center">
            <Image
              width="390px"
              preview={false}
              src="/images/team-brainstorming.png"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
