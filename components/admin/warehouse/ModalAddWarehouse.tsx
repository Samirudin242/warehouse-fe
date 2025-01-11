import React, { useState } from "react";
import { Modal, Form, Input, Button, Select } from "antd";
import { City, Role } from "@/types/city";
import { useCitySelector } from "@/hooks/useCitySelector";

const { Option } = Select;


interface AddWarehouseModalProps {
  isOpen: boolean;
  onCancel: () => void;
  refresh: () => void;
}

export default function ModalAddWarehouse(props: AddWarehouseModalProps) {
  const [form] = Form.useForm();

  const [selectedProvince, setSelectedProvince] = useState<string | undefined>(
    undefined
  );

  const { selectedCity, setSelectedCity, listCity } = useCitySelector({
    provinceId: selectedProvince,
    form,
  });

  const handleFormSubmit = (values: any) => {
    console.log("Form values:", values);
    props.onCancel();
  };

  return (
    <div className="p-4">
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
            name="admin"
            rules={[{ required: true, message: "Please enter the admin name" }]}
          >
            <Input placeholder="Enter admin name" />
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: "Please enter the address" }]}
          >
            <Input.TextArea placeholder="Enter warehouse address" rows={3} />
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
            label="Province"
            name="province"
            rules={[{ required: true, message: "Please enter the province" }]}
          >
            <Input placeholder="Enter province" />
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
      </Modal>
    </div>
  );
}
