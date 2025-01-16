import React, { useState } from "react";
import { Modal, Form, Input, Select, Upload, Button, Image } from "antd";
import { toast, ToastContainer } from "react-toastify";
import { UploadOutlined } from "@ant-design/icons";
import { configUrl } from "@/config/configUrl";
import { provinces } from "@/data/provinces";
import axiosRequest from "@/hooks/useAxios";
import GlobalModal from "@/components/modal/GlobalModal";
import { useCitySelector } from "@/hooks/useCitySelector";
const { Option } = Select;

interface AddUserModalProps {
  isOpen: boolean;
  onCancel: () => void;
  roles: { id: string; role_name: string }[];
  refresh: () => void;
}

const AddUserModal: React.FC<AddUserModalProps> = ({
  isOpen,
  onCancel,
  roles,
  refresh,
}) => {
  const [form] = Form.useForm();

  const [body, setBody] = useState<any>({});

  const [selectedProvince, setSelectedProvince] = useState<string | undefined>(
    undefined
  );

  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [urlProfilePicture, setUrlProfilePicture] = useState<string | null>(
    null
  );

  const [openGlobalModal, setOpenGlobalModal] = useState<boolean>(false);

  const { selectedCity, setSelectedCity, listCity } = useCitySelector({
    provinceId: selectedProvince,
    form,
  });

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

  const onSubmit = async (values: any) => {
    setOpenGlobalModal(true);
    const body = {
      name: values.name,
      user_name: values.user_name,
      email: values.email,
      profile_picture: urlProfilePicture,
      role_id: roles?.find((role) => role.role_name === "WAREHOUSE_ADMIN")?.id,
      phone_number: values.phone_number,
      address: values.address,
      province_id: values.province,
      city_id: values.city,
      postal_code: selectedCity?.postal_code,
      is_verified: true,
      city: selectedCity?.city_name,
      province: provinces.find(
        (province) => province.province_id === selectedProvince
      )?.province,
      password: values.password,
    };

    setBody(body);
  };

  const onSubmitData = async () => {
    try {
      // Hit the API
      const { response, error } = await axiosRequest({
        url: `${configUrl.apiUrlUserService}/auth/register`,
        method: "POST",
        body: body,
      });

      if (error?.response?.data) {
        const errorMessage: any = error?.response?.data;
        toast.error(errorMessage?.message, {
          position: "top-center",
        });
        return;
      }

      refresh();
      toast.success("User successfully registered!", {
        position: "top-center",
      });
      setOpenGlobalModal(false);
      onCancel();
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to register user. Please try again.", {
        position: "top-center",
      });
    }
  };

  return (
    <Modal
      title="New Warehouse Admin"
      open={isOpen}
      onOk={() => form.submit()}
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      okText="Add User"
      cancelText="Cancel"
      width={800}
    >
      <ToastContainer />
      <Form
        form={form}
        layout="vertical"
        onFinish={onSubmit}
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter the name" }]}
        >
          <Input placeholder="Enter name" />
        </Form.Item>
        <Form.Item
          label="Username"
          name="user_name"
          rules={[{ required: true, message: "Please enter the username" }]}
        >
          <Input placeholder="Enter username" />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please enter the email" },
            { type: "email", message: "Please enter a valid email" },
          ]}
        >
          <Input placeholder="Enter email" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Phone Number"
          name="phone_number"
          rules={[{ required: true, message: "Please enter phone number" }]}
        >
          <Input placeholder="Enter phone number" />
        </Form.Item>
        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: "Please enter address" }]}
        >
          <Input placeholder="Enter address" />
        </Form.Item>
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
              <Option key={province.province_id} value={province.province_id}>
                {province.province}
              </Option>
            ))}
          </Select>
        </Form.Item>
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
              const city = listCity.find((city) => city.city_id === value);
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
        <Form.Item
          label="Postal Code"
          name="postal_code"
          rules={[{ required: true, message: "Please enter postal code" }]}
        >
          <Input disabled placeholder="Enter postal code" />
        </Form.Item>
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
      </Form>
      <GlobalModal
        isVisible={openGlobalModal}
        title="Confirmation"
        content="Are you sure you want to create an account?"
        onOk={onSubmitData}
        onCancel={() => setOpenGlobalModal(false)}
      />
    </Modal>
  );
};

export default AddUserModal;
