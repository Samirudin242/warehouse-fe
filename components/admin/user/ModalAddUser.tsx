import React from "react";
import { Modal, Form, Input, Select } from "antd";

const { Option } = Select;

interface AddUserModalProps {
  isOpen: boolean;
  onSubmit: (values: any) => void;
  onCancel: () => void;
  roles?: { id: string; name: string }[];
}

const AddUserModal: React.FC<AddUserModalProps> = ({
  isOpen,
  onSubmit,
  onCancel,
  roles,
}) => {
  const [form] = Form.useForm();

  return (
    <Modal
      title="Add New User"
      open={isOpen}
      onOk={() => form.submit()}
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      okText="Add User"
      cancelText="Cancel"
      width={800} // Makes the modal wider
    >
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
          label="Profile Picture URL"
          name="profile_picture"
          rules={[{ required: true, message: "Please enter the URL" }]}
        >
          <Input placeholder="Enter profile picture URL" />
        </Form.Item>
        <Form.Item
          label="Role"
          name="role_id"
          rules={[{ required: true, message: "Please select a role" }]}
        >
          <Select placeholder="Select role">
            {roles?.map((role) => (
              <Option key={role.id} value={role.id}>
                {role.name}
              </Option>
            ))}
          </Select>
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
          rules={[{ required: true, message: "Please enter province" }]}
        >
          <Input placeholder="Enter province" />
        </Form.Item>
        <Form.Item
          label="City"
          name="city"
          rules={[{ required: true, message: "Please enter city" }]}
        >
          <Input placeholder="Enter city" />
        </Form.Item>
        <Form.Item
          label="Province ID"
          name="province_id"
          rules={[{ required: true, message: "Please enter province ID" }]}
        >
          <Input placeholder="Enter province ID" />
        </Form.Item>
        <Form.Item
          label="City ID"
          name="city_id"
          rules={[{ required: true, message: "Please enter city ID" }]}
        >
          <Input placeholder="Enter city ID" />
        </Form.Item>
        <Form.Item
          label="Postal Code"
          name="postal_code"
          rules={[{ required: true, message: "Please enter postal code" }]}
        >
          <Input placeholder="Enter postal code" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddUserModal;
