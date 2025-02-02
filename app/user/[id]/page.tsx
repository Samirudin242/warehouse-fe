"use client";

import { useEffect, useState } from "react";
import { Tabs } from "antd";
import PersonalInformation from "@/components/user/PersonalInformation";
import { useAppContext } from "@/contexts/useContext";

export default function ProfilePage() {
  const { setLoading } = useAppContext();

  useEffect(() => {
    setLoading(false);
  }, []);

  const [editing, setEditing] = useState({
    name: false,
    username: false,
    email: false,
    phone: false,
  });

  const [formData, setFormData] = useState({
    name: "Samirudin",
    username: "samir",
    email: "samtheyaku@gmail.com",
    phone: "6282347497133",
  });

  const toggleEdit = (field: keyof typeof editing) => {
    setEditing((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <Tabs defaultActiveKey="1">
        {/* --- PERSONAL INFORMATION --- */}
        <Tabs.TabPane tab="Personal Information" key="1">
          <PersonalInformation
            editing={editing}
            formData={formData}
            handleChange={handleChange}
            toggleEdit={toggleEdit}
          />
        </Tabs.TabPane>

        {/* --- ADDRESS LIST --- */}
        <Tabs.TabPane tab="Address List" key="2">
          <p>The address list will be displayed here.</p>
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}
