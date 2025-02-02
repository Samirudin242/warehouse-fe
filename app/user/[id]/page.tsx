"use client";

import { useEffect, useState } from "react";
import { Tabs } from "antd";
import PersonalInformation from "@/components/user/PersonalInformation";
import { useAppContext } from "@/contexts/useContext";
import { configUrl } from "@/config/configUrl";
import useHookSwr from "@/hooks/useSwr";
import axiosRequest from "@/hooks/useAxios";

export default function ProfilePage() {
  const { setLoading, roles, user } = useAppContext();

  const userId = user?.id;
  console.log(userId, "USER ID");
  const { isLoading, data, error, refresh } = useHookSwr(
    userId ? `${configUrl.apiUrlUserService}/user/${userId}` : null
  );

  const [editing, setEditing] = useState({
    name: false,
    username: false,
    email: false,
    phone: false,
    profilePicture: false,
  });

  const [formData, setFormData] = useState({
    name: data?.name,
    username: data?.user_name,
    email: data?.email,
    phone: data?.phone_number,
    profilePicture: data?.profile_picture,
  });

  useEffect(() => {
    setLoading(false);
    if (userId) {
      refresh(`${configUrl.apiUrlUserService}/user/${userId}`);
    }
  }, [userId]);

  useEffect(() => {
    setFormData({
      name: data?.name || "",
      username: data?.user_name || "",
      email: data?.email || "",
      phone: data?.phone_number || "",
      profilePicture: data?.profile_picture || "",
    });
  }, [data]);

  const toggleEdit = (field: keyof typeof editing) => {
    setEditing((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
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
      setFormData((prev) => ({
        ...prev,
        profilePicture: response?.data?.url,
      }));
    } else {
      console.error("Upload error:", error);
    }
  };

  const handleSaveUser = async () => {
    const body = {
      id: user.id,
      name: formData.name,
      user_name: formData.username,
      email: formData.email,
      profile_url: formData?.profilePicture,
      phone_number: formData?.phone,
      role_id: roles?.find((r) => r.role_name === "CUSTOMER")?.id,
    };
    try {
      const { response } = await axiosRequest({
        url: `${configUrl.apiUrlUserService}/user/${user?.id}`,
        method: "PUT",
        body,
      });
      if (response) {
        setEditing({
          name: false,
          username: false,
          email: false,
          phone: false,
          profilePicture: false,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Personal Information" key="1">
          <PersonalInformation
            editing={editing}
            formData={formData}
            handleChange={handleChange}
            toggleEdit={toggleEdit}
            handleSaveUser={handleSaveUser}
            handleUpload={handleUpload}
          />
        </Tabs.TabPane>

        <Tabs.TabPane tab="Address List" key="2">
          <p>The address list will be displayed here.</p>
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}
