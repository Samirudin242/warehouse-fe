"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import Cookies from "js-cookie";

import { Col, Form, Image, Input, Button, Row, Upload, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { provinces } from "@/data/provinces";
import { City, Role } from "@/types/city";
import { configUrl } from "@/config/configUrl";
import GlobalModal from "@/components/modal/GlobalModal";
import axiosRequest from "@/hooks/useAxios";
import { useAppContext } from "@/contexts/useContext";
import TextArea from "antd/es/input/TextArea";
import ModalSelectAddress from "@/components/admin/warehouse/ModalSelectAddress";
const { Option } = Select;

function page() {
  const router = useRouter();
  const [form] = Form.useForm();
  const { lastUrl } = useAppContext();

  const [openGlobalModal, setOpenGlobalModal] = useState<boolean>(false);

  const [body, setBody] = useState<any>({});

  const [selectedProvince, setSelectedProvince] = useState<string | undefined>(
    undefined
  );

  const [listCity, setListCity] = useState<City[]>([]);
  const [listRoles, setListRoles] = useState<Role[]>([]);
  const [selectedCity, setSelectedCity] = useState<City | undefined>(undefined);

  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [urlProfilePicture, setUrlProfilePicture] = useState<string | null>(
    null
  );

  const [openModalMap, setOpenModalMap] = useState<boolean>(false);

  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  useEffect(() => {
    const fetchRoles = async () => {
      const { response } = await axiosRequest({
        url: `${configUrl.apiUrlUserService}/auth/get-roles`,
      });
      console.log("response", response?.data);
      setListRoles(response?.data);
    };

    fetchRoles();
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      const fetchCities = async () => {
        const { response } = await axiosRequest({
          url: `${configUrl.rajaOngkirUrl}/city/?provinceId=${selectedProvince}`,
          withCredentials: false,
        });

        setSelectedCity(undefined);
        form.setFieldsValue({ city: undefined });

        setListCity(response?.data);
      };

      fetchCities();
    }
  }, [selectedProvince]);

  const handleProvinceChange = (value: string) => {
    setSelectedProvince(value);
    setSelectedCity(undefined);
    form.setFieldsValue({ city: undefined });
  };

  const handleUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const { response, error } = await axiosRequest({
      url: `${configUrl.apiUrlUserService}/auth/profile-photo`,
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response) {
      setProfilePicture(file);
      setUrlProfilePicture(response?.data?.url);
    } else {
      console.error("Upload error:", error);
    }
  };

  const handleClickRouter = (e: any) => {
    e.preventDefault();
    const href = e.currentTarget.href;
    router.push(href);
  };

  const handleLocationSelect = (lat: number, lng: number) => {
    setSelectedLocation({ lat, lng });
  };

  const onFinish = async (values: any) => {
    setOpenGlobalModal(true);
    const body = {
      name: values.name,
      user_name: values.user_name,
      email: values.email,
      profile_picture: urlProfilePicture,
      role_id: listRoles.find((role) => role.role_name === "CUSTOMER")?.id,
      phone_number: values.phone_number,
      address: values.address,
      province: selectedCity?.province,
      city: selectedCity?.city_name,
      province_id: selectedCity?.province_id,
      city_id: selectedCity?.city_id,
      postal_code: selectedCity?.postal_code,
      is_verified: false,
      password: values.password,
      latitude: selectedLocation?.lat,
      longitude: selectedLocation?.lng,
    };

    setBody(body);
  };

  const onSubmitData = async () => {
    try {
      // Hit the API
      console.log("Body:", body);
      const { response, error } = await axiosRequest({
        url: `${configUrl.apiUrlUserService}/auth/register`,
        method: "POST",
        body: body,
      });

      console.log("error", error?.response?.data);

      console.log("Response:", response?.data);

      if (error?.response?.data) {
        const errorMessage: any = error?.response?.data;
        toast.error(errorMessage?.message, {
          position: "top-center",
        });
        return;
      }

      Cookies.set("accessToken", response?.data.accessToken);

      // Show success notification
      toast.success("User successfully registered!", {
        position: "top-center",
      });
      router.push(lastUrl || "/");
      setOpenGlobalModal(false);
    } catch (error) {
      console.error("Error:", error);

      toast.error("Failed to register user. Please try again.", {
        position: "top-center",
      });
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="flex items-center bg-gray-100 text-black overflow-auto">
      <div className="w-4/6 bg-white px-7 py-2  rounded-lg shadow-lg mx-auto">
        <ToastContainer />
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
                    label="Name"
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: "Please input your name!",
                      },
                    ]}
                  >
                    <Input className="max-w-3xl" />
                  </Form.Item>
                </Col>
                <Col>
                  <Form.Item
                    label="User Name"
                    name="user_name"
                    rules={[
                      {
                        required: true,
                        message: "Please input your user name!",
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
              <Row className="w-full">
                <Col className="w-full">
                  <Form.Item
                    label="Phone Number"
                    name="phone_number"
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
                    label={
                      <div className="flex gap-2">
                        <div>Address</div>
                        <Button onClick={() => setOpenModalMap(true)}>
                          Pick address from map
                        </Button>
                      </div>
                    }
                    name="address"
                    rules={[
                      {
                        required: true,
                        message: "Please input your address!",
                      },
                    ]}
                  >
                    <TextArea
                      disabled={!selectedLocation?.lat || !selectedLocation.lng}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row className="w-full">
                <Col className="w-full">
                  <Form.Item
                    label="Province"
                    name="province"
                    rules={[
                      {
                        required: true,
                        message: "Please select your province!",
                      },
                    ]}
                  >
                    <Select onChange={handleProvinceChange}>
                      {provinces?.map((province) => (
                        <Option
                          key={province.province_id}
                          value={province.province_id}
                        >
                          {province.province}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row className="w-full">
                <Col className="w-full">
                  <Form.Item
                    label="City"
                    name="city"
                    rules={[
                      {
                        required: true,
                        message: "Please input your city!",
                      },
                    ]}
                  >
                    <Select
                      onChange={(value) => {
                        const city = listCity.find(
                          (city) => city.city_id === value
                        );
                        setSelectedCity(city);
                        form.setFieldsValue({
                          postal_code: city?.postal_code,
                        });
                      }}
                    >
                      {listCity?.map((city) => (
                        <Option key={city.city_id} value={city.city_id}>
                          {city.city_name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row className="w-full">
                <Col className="w-full">
                  <Form.Item label="Postal Code" name="postal_code">
                    <Input disabled />
                  </Form.Item>
                </Col>
              </Row>
              {/* Other form fields remain unchanged */}
              <Row className="w-full">
                <Col className="w-full">
                  <Form.Item label="Profile Picture" name="profile_picture">
                    <Upload
                      customRequest={({ file }) => handleUpload(file as File)}
                      showUploadList={false}
                      accept=".jpg,.png"
                    >
                      <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                    {profilePicture && (
                      <div className="mt-2">
                        <Image
                          src={URL.createObjectURL(profilePicture)}
                          alt="Profile Preview"
                          width={100}
                          height={100}
                          style={{ borderRadius: "50%" }}
                        />
                      </div>
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item className="mt-4">
                <Button htmlType="submit">Create an account</Button>
              </Form.Item>
            </Form>
          </div>
          <div className="flex items-center">
            <Image width={500} preview={false} src="/images/easy-shop.png" />
          </div>
        </div>
      </div>
      <GlobalModal
        isVisible={openGlobalModal}
        title="Confirmation"
        content="Are you sure you want to create an account?"
        onOk={onSubmitData}
        onCancel={() => setOpenGlobalModal(false)}
      />
      <ModalSelectAddress
        form={form}
        onLocationSelect={handleLocationSelect}
        isOpen={openModalMap}
        onClose={() => setOpenModalMap(false)}
      />
    </div>
  );
}

export default page;
