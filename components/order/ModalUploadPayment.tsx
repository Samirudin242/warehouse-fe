import { useState } from "react";
import { Modal, Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { toast, ToastContainer, Bounce } from "react-toastify";

import Image from "next/image";
import axiosRequest from "@/hooks/useAxios";
import { configUrl } from "@/config/configUrl";
import { mutate } from "swr";

const { Dragger } = Upload;

type PaymentUploadProps = {
  isPaymentModalOpen: boolean;
  setIsPaymentModalOpen: (open: boolean) => void;
  orderId: string;
  refresh: (url: string) => void;
  userId: string;
};

export default function ModalUploadPayment({
  isPaymentModalOpen,
  setIsPaymentModalOpen,
  orderId,
  userId,
  refresh,
}: PaymentUploadProps) {
  const [paymentProof, setPaymentProof] = useState<File | null>(null);
  const [urlPaymentProof, setUrlPaymentProof] = useState<string | null>(null);

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

  const handleUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const { response, error } = await axiosRequest({
      url: `${configUrl.apiUrlWarehouseService}/order/upload-payment/${orderId}`,
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response) {
      setPaymentProof(file);
      setUrlPaymentProof(response?.data);
    } else {
      console.error("Upload error:", error);
    }
  };

  const onSubmitData = async () => {
    try {
      const body = {
        order_id: orderId,
        url_payment: urlPaymentProof,
      };

      const { response, error } = await axiosRequest({
        url: `${configUrl.apiUrlWarehouseService}/order/upload-payment-user`,
        method: "POST",
        body: body,
      });

      if (error) {
        const errorMessage: any = error?.response?.data;
        toast.error(errorMessage?.message, {
          position: "top-center",
        });
        return;
      }

      refresh(`${configUrl.apiUrlWarehouseService}/order/${userId}`);
      toast.success(
        "Successfully upload payment proof, admin will verify your payment soon!",
        {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        }
      );

      setIsPaymentModalOpen(false);
    } catch (error) {
      toast.error("Failed to upload", {
        position: "top-center",
      });
    }
  };

  return (
    <Modal
      title="Upload Payment"
      open={isPaymentModalOpen}
      onCancel={() => setIsPaymentModalOpen(false)}
      width={600}
      onOk={onSubmitData}
    >
      <ToastContainer />
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
          <Dragger
            {...uploadProps}
            customRequest={({ file }) => handleUpload(file as File)}
            className="p-4"
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined className="text-blue-500 text-2xl" />
            </p>
            <p className="ant-upload-text font-medium">
              Click or drag a file here to upload
            </p>
            <p className="ant-upload-hint text-sm text-gray-500">
              Supported formats: JPG, PNG, PDF (Max. 1MB)
            </p>
          </Dragger>
          {paymentProof && (
            <div className="mt-2">
              <Image
                src={URL.createObjectURL(paymentProof)}
                alt="Profile Preview"
                width={100}
                height={100}
                style={{ borderRadius: "50%" }}
              />
            </div>
          )}

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
