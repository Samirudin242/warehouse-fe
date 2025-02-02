import React from "react";
import { Input, Button, Upload } from "antd";
import { EditOutlined, UploadOutlined } from "@ant-design/icons";

type UserInfo = {
  name: string;
  username: string;
  email: string;
  phone: string;
};

type UserInfoEdit = {
  name: boolean;
  username: boolean;
  email: boolean;
  phone: boolean;
};

type PersonalProps = {
  editing: UserInfoEdit;
  formData: UserInfo;
  handleChange: (
    p1: "name" | "email" | "username" | "phone",
    p2: string
  ) => void;
  toggleEdit: (p: "name" | "email" | "username" | "phone") => void;
};

export default function PersonalInformation({
  editing,
  formData,
  handleChange,
  toggleEdit,
}: PersonalProps) {
  return (
    <div className="flex gap-6">
      <div className="w-1/3">
        <Upload>
          <Button icon={<UploadOutlined />}>Select Photo</Button>
        </Upload>
        <p className="text-xs mt-2 text-gray-500">
          Max 10MB, format: JPG, JPEG, PNG
        </p>
        <Button className="w-full mt-4">Change Password</Button>
      </div>

      {/* --- PERSONAL DETAILS --- */}
      <div className="flex-1 space-y-4">
        <div className="flex items-center">
          <span className="w-40 font-semibold">Name</span>
          {editing.name ? (
            <Input
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="w-64"
            />
          ) : (
            <span>{formData.name}</span>
          )}
          <EditOutlined
            className="ml-2 cursor-pointer text-gray-500"
            onClick={() => toggleEdit("name")}
          />
        </div>

        <div className="flex items-center">
          <span className="w-40 font-semibold">Birthdate</span>
          {editing.username ? (
            <Input
              value={formData.username}
              onChange={(e) => handleChange("username", e.target.value)}
              className="w-64"
            />
          ) : (
            <span>{formData.username}</span>
          )}
          <EditOutlined
            className="ml-2 cursor-pointer text-gray-500"
            onClick={() => toggleEdit("username")}
          />
        </div>

        <h3 className="font-bold mt-4">Change Contact</h3>

        <div className="flex items-center">
          <span className="w-40 font-semibold">Email</span>
          {editing.email ? (
            <Input
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="w-64"
            />
          ) : (
            <span>{formData.email}</span>
          )}
          <EditOutlined
            className="ml-2 cursor-pointer text-gray-500"
            onClick={() => toggleEdit("email")}
          />
        </div>

        <div className="flex items-center">
          <span className="w-40 font-semibold">Phone Number</span>
          {editing.phone ? (
            <Input
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              className="w-64"
            />
          ) : (
            <span>{formData.phone}</span>
          )}
          <EditOutlined
            className="ml-2 cursor-pointer text-gray-500"
            onClick={() => toggleEdit("phone")}
          />
        </div>

        <div className="flex items-end  justify-end mt-10">
          <Button>Save</Button>
        </div>
      </div>
    </div>
  );
}
