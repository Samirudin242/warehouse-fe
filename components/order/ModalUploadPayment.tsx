import { useState } from "react";
import { Modal, Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { formatToRupiah } from "@/app/utils/formatPrice";
import moment from "moment";
import { OrderUser } from "@/types/Order";
import Image from "next/image";

const { Dragger } = Upload;

type PaymentUploadProps = {
  isPaymentModalOpen: boolean;
  setIsPaymentModalOpen: (open: boolean) => void;
};

export default function ModalUploadPayment({
  isPaymentModalOpen,
  setIsPaymentModalOpen,
}: PaymentUploadProps) {
  const bankAccounts = [
    { name: "BCA", number: "1234567890", logo: "/bank/bca.png" },
    { name: "Mandiri", number: "0987654321", logo: "/bank/mandiri.png" },
    { name: "BRI", number: "1122334455", logo: "/bank/bri.png" },
    { name: "BNI", number: "5566778899", logo: "/bank/bni.png" },
  ];

  const uploadProps = {
    name: "file",
    multiple: false,
    accept: "image/*,.pdf",
    beforeUpload: (file: File) => {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error("File must smaller than 2MB!");
      }
      return isLt2M;
    },
  };

  return (
    <Modal
      title="Upload Payment"
      open={isPaymentModalOpen}
      onCancel={() => setIsPaymentModalOpen(false)}
      //   footer={null}
      width={600}
    >
      <div className="space-y-6">
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4">Banking Information</h3>
          <div className="space-y-4">
            {bankAccounts.map((bank) => (
              <div
                key={bank.name}
                className="flex items-center p-3 bg-white rounded-lg shadow-sm"
              >
                <Image
                  src={bank.logo}
                  alt={bank.name}
                  width={48}
                  height={48}
                  className="object-contain"
                />
                <div className="ml-4">
                  <div className="font-medium text-gray-800">{bank.name}</div>
                  <div className="text-sm text-gray-600">{bank.number}</div>
                  <div className="text-xs text-gray-400">A/N Samirudin</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t pt-4">
          <Dragger {...uploadProps} className="p-4">
            <p className="ant-upload-drag-icon">
              <InboxOutlined className="text-blue-500 text-2xl" />
            </p>
            <p className="ant-upload-text font-medium">
              Click or drag a file here to upload
            </p>
            <p className="ant-upload-hint text-sm text-gray-500">
              Supported formats: JPG, PNG, PDF (Max. 2MB)
            </p>
          </Dragger>

          <div className="mt-4 text-sm text-gray-500">
            <p>Make sure the transfer proof shows:</p>
            <ul className="list-disc pl-5 mt-1">
              <li>Sender's name</li>
              <li>Transfer amount</li>
              <li>Transfer date</li>
            </ul>
          </div>
        </div>
      </div>
    </Modal>
  );
}
