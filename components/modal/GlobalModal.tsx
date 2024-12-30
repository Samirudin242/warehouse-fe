import React from "react";
import { Modal } from "antd";
import Image from "next/image";

interface GlobalModalProps {
  isVisible: boolean;
  title?: string;
  content?: React.ReactNode;
  onOk?: () => void;
  onCancel?: () => void;
  okText?: string;
  cancelText?: string;
  type?: "confirm" | "info" | "success" | "error" | "warning";
}

const GlobalModal: React.FC<GlobalModalProps> = ({
  isVisible,
  title = "Confirmation",
  content = "Are you sure?",
  onOk,
  onCancel,
  okText = "Confirm",
  cancelText = "Cancel",
}) => {
  return (
    <Modal
      title={title}
      open={isVisible}
      onOk={onOk}
      onCancel={onCancel}
      okText={okText}
      cancelText={cancelText}
      centered // Ensures the modal is centered on the screen
      footer={null} // We'll use custom footer with Tailwind
    >
      <div className="flex flex-col items-center justify-center border-t border-gray-200 pt-4">
        <Image
          src="/images/self.png"
          height={200}
          width={200}
          alt="image self"
        />
        <div className="mt-4 text-center text-2xl">{content}</div>
        <div className="mt-4 flex justify-center gap-4">
          <button
            onClick={onOk}
            className="bg-blue-400 text-white py-2 px-6 rounded-lg hover:bg-blue-500 focus:outline-none"
          >
            {okText}
          </button>
          <button
            onClick={onCancel}
            className="bg-red-400 text-white py-2 px-6 rounded-lg hover:bg-red-500 focus:outline-none"
          >
            {cancelText}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default GlobalModal;
