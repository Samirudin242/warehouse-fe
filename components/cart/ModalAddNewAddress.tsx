import React, { useState } from "react";
import { Modal, Form, Input, Select, Upload, Button, Image } from "antd";

import { provinces } from "@/data/provinces";
import { useAppContext } from "@/contexts/useContext";
import { useCitySelector } from "@/hooks/useCitySelector";
import axiosRequest from "@/hooks/useAxios";
import { configUrl } from "@/config/configUrl";
import GoogleMapPicker from "../location/GoogleMapPicker";
import TextArea from "antd/es/input/TextArea";

const { Option } = Select;

type PropsAddress = {
  isOpen: boolean;
  onClose: () => void;
  refresh: () => void;
};

function ModalAddNewAddress({ isOpen, onClose, refresh }: PropsAddress) {
  const { user } = useAppContext();

  const userId = user?.id;
  const [form] = Form.useForm();

  const [selectedProvince, setSelectedProvince] = useState<string | undefined>(
    undefined
  );

  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const { selectedCity, setSelectedCity, listCity } = useCitySelector({
    provinceId: selectedProvince,
    form,
  });

  const handleLocationSelect = (lat: number, lng: number) => {
    setSelectedLocation({ lat, lng });
  };

  const handleProvinceChange = (value: string) => {
    setSelectedProvince(value);
    setSelectedCity(undefined);
    form.setFieldsValue({ city: undefined });
  };

  const handleSubmit = async (values: any) => {
    const body = {
      address: values?.address,
      province: provinces.find(
        (province) => province.province_id === selectedProvince
      )?.province,
      city: selectedCity?.city_name,
      province_id: values.province,
      city_id: values.city,
      postal_code: selectedCity?.postal_code,
      user_id: userId,
      phone_number: values?.phone_number,
      latitude: selectedLocation?.lat,
      longitude: selectedLocation?.lng,
    };

    const { response, error } = await axiosRequest({
      url: `${configUrl.apiUrlUserService}/address`,
      method: "POST",
      body,
    });
    if (response) {
      refresh();
      onClose();
    }
  };

  return (
    <Modal
      title="Add New Address"
      open={isOpen}
      onCancel={() => {
        form.resetFields();
        onClose();
      }}
      footer={null}
      width={700}
    >
      <GoogleMapPicker onLocationSelect={handleLocationSelect} form={form} />
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className="mt-3"
      >
        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: "Please input address" }]}
        >
          <TextArea
            disabled={!selectedLocation?.lat || !selectedLocation.lng}
            placeholder="Enter address"
          />
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
        <Form.Item
          label="Phone Number"
          name="phone_number"
          rules={[{ required: true, message: "Please enter phone number" }]}
        >
          <Input placeholder="Enter phone number" />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default ModalAddNewAddress;
