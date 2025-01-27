import React from "react";
import GoogleMapPicker from "@/components/location/GoogleMapPicker";
import { Modal, FormInstance } from "antd";

type MapPickerProps = {
  onLocationSelect: (lat: number, lng: number, address: string) => void;
  form: FormInstance<any>;
  isOpen: boolean;
  onClose: () => void;
};

export default function ModalSelectAddress({
  onLocationSelect,
  form,
  isOpen,
  onClose,
}: MapPickerProps) {
  return (
    <Modal open={isOpen} onCancel={onClose} footer={null}>
      <GoogleMapPicker onLocationSelect={onLocationSelect} form={form} />
    </Modal>
  );
}
