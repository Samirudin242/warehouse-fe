import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Button, Select } from "antd";
import { toast, ToastContainer } from "react-toastify";
import { provinces } from "@/data/provinces";
import { useCitySelector } from "@/hooks/useCitySelector";
import { useAppContext } from "@/contexts/useContext";
import axiosRequest from "@/hooks/useAxios";
import { configUrl } from "@/config/configUrl";
import GlobalModal from "@/components/modal/GlobalModal";
const { Option } = Select;

interface AddWarehouseModalProps {
  isOpen: boolean;
  onCancel: () => void;
  refresh: () => void;
}

type User = {
  id: String;
  name: String;
};

export default function ModalAddWarehouse(props: AddWarehouseModalProps) {
  const [form] = Form.useForm();

  const { roles } = useAppContext();

  const roleIdWarehouseAdmin = roles.find(
    (role) => role.role_name == "WAREHOUSE_ADMIN"
  )?.id;

  const [body, setBody] = useState<any>({});

  const [listUser, setListUser] = useState<User[]>();

  const [openGlobalModal, setOpenGlobalModal] = useState<boolean>(false);

  const [selectedProvince, setSelectedProvince] = useState<string | undefined>(
    undefined
  );

  const { selectedCity, setSelectedCity, listCity } = useCitySelector({
    provinceId: selectedProvince,
    form,
  });

  useEffect(() => {
    const fetch = async () => {
      try {
        const { response, error } = await axiosRequest({
          url: `${configUrl.apiUrlUserService}/user?role=${roleIdWarehouseAdmin}`,
          method: "GET",
        });
        if (response) {
          const user = response?.data?.content.map((u: any) => {
            return {
              id: u.id,
              name: u.name,
            };
          });
          setListUser(user);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetch();
  }, []);

  const handleFormSubmit = (values: any) => {
    const data = {
      name: values.name,
      admin_id: values.admin_id,
      province_id: values.province_id,
      city_id: values.city_id,
      address: values.address,
      postal_code: values.postal_code,
    };
    setOpenGlobalModal(true);
    setBody(data);
  };

  const onSubmitData = async () => {
    try {
      // Hit the API
      const { response, error } = await axiosRequest({
        url: `${configUrl.apiUrlWarehouseService}/warehouse`,
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

      props.refresh();
      toast.success("User successfully registered!", {
        position: "top-center",
      });
      setOpenGlobalModal(false);
      props.onCancel();
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to register user. Please try again.", {
        position: "top-center",
      });
    }
  };

  return (
    <div className="p-4">
      <ToastContainer />
      <Modal
        title="Add Warehouse"
        open={props.isOpen}
        onCancel={props.onCancel}
        footer={null}
        className="rounded-lg"
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFormSubmit}
          className="space-y-4"
        >
          <Form.Item
            label="Warehouse Name"
            name="name"
            rules={[
              { required: true, message: "Please enter the warehouse name" },
            ]}
          >
            <Input placeholder="Enter warehouse name" />
          </Form.Item>

          <Form.Item
            label="Admin"
            name="admin_id"
            rules={[{ required: true, message: "Please enter the admin name" }]}
          >
            <Select>
              {listUser?.map((user, idx) => (
                <Option key={idx} value={user.id}>
                  {user.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: "Please enter the address" }]}
          >
            <Input.TextArea placeholder="Enter warehouse address" rows={3} />
          </Form.Item>
          <Form.Item
            label="Province"
            name="province_id"
            rules={[
              {
                required: true,
                message: "Please select your province!",
              },
            ]}
          >
            <Select
              onChange={(e) => {
                setSelectedProvince(e);
              }}
            >
              {provinces?.map((province) => (
                <Option key={province.province_id} value={province.province_id}>
                  {province.province}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="City"
            name="city_id"
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
          <Form.Item className="text-right">
            <Button type="default" onClick={props.onCancel} className="mr-2">
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              className="bg-blue-500 hover:bg-blue-600 border-none"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
        {openGlobalModal && (
          <GlobalModal
            isVisible={openGlobalModal}
            title="Confirmation"
            content="Are you sure you want to create warehouse?"
            onOk={onSubmitData}
            onCancel={() => setOpenGlobalModal(false)}
            icon="warehouse"
          />
        )}
      </Modal>
    </div>
  );
}
