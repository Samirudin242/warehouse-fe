import React, { useState } from "react";
import { Modal, Button, Spin } from "antd";
import axios from "axios";
import { SelectedAddress, NearestWarehouse } from "@/types/Order";
import { configUrl } from "@/config/configUrl";
import { formatToRupiah } from "@/app/utils/formatPrice";
import ListOptionSkeleton from "../skeletonLoading/ListOptionSkeleton";

type ShippingProps = {
  isOpen: boolean;
  onClose: () => void;
  selectedAddress?: SelectedAddress;
  selectedWarehouse?: NearestWarehouse;
};

type OptionShipping = {
  service: string;
  description: string;
  cost: Cost[];
};

type Cost = {
  value: number;
  etd: string;
  note: string;
};

function ListShipping({
  isOpen,
  onClose,
  selectedAddress,
  selectedWarehouse,
}: ShippingProps) {
  const [listOptionShipping, setListOptionShipping] =
    useState<OptionShipping[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCourier, setSelectedCourier] = useState<string | null>(null);
  const [selectedOptionCourier, setSelectedOptionCourier] =
    useState<OptionShipping>();

  const handleSelectCourier = async (type: string) => {
    setIsLoading(true);
    const body = {
      origin: selectedWarehouse?.city_id,
      destination: selectedAddress?.cityId,
      weight: 1000,
      courier: type,
    };
    try {
      const { data } = await axios.post(
        `${configUrl.rajaOngkirUrl}/cost`,
        body
      );
      setListOptionShipping(data);
      console.log(data);

      setSelectedCourier(type);
    } catch (error) {
      console.error("Error fetching courier options:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderCourierOptions = () =>
    listOptionShipping?.map((option, index) => (
      <div
        key={index}
        className={`p-4 ${
          selectedOptionCourier?.description === option.description
            ? "border-2 border-blue-500"
            : "border"
        } rounded-lg shadow-sm hover:shadow-md transition cursor-pointer mb-2`}
        onClick={() => setSelectedOptionCourier(option)}
      >
        <div className="flex justify-between items-center">
          <div>
            <div className="text-lg font-medium">{option.service}</div>
            <div className="text-sm text-gray-500">{option.description}</div>
          </div>
          <div className="text-right">
            <div className="text-base font-bold text-green-600">
              {formatToRupiah(option.cost[0].value, true)}
            </div>
            <div className="text-sm text-gray-400">
              ETD: {option.cost[0].etd} days
            </div>
          </div>
        </div>
      </div>
    ));

  return (
    <Modal
      title="Select Shipping Courier"
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={700}
    >
      <div className="space-y-6">
        {/* Courier Selection Section */}
        <div>
          <div className="text-lg font-semibold mb-2">Choose a Courier</div>
          <div className="flex gap-6">
            <div
              onClick={() => handleSelectCourier("jne")}
              className={`w-24 text-center cursor-pointer ${
                selectedCourier === "jne"
                  ? "border-2 border-blue-500"
                  : "border"
              } rounded-lg p-2 hover:shadow-md`}
            >
              <img src="/courier/jne.png" alt="JNE" width={60} height={50} />
              <div className="text-sm font-medium mt-2">JNE</div>
            </div>
            <div
              onClick={() => handleSelectCourier("pos")}
              className={`w-24 text-center cursor-pointer ${
                selectedCourier === "pos"
                  ? "border-2 border-blue-500"
                  : "border"
              } rounded-lg p-2 hover:shadow-md`}
            >
              <img src="/courier/pos.png" alt="POS" width={60} height={50} />
              <div className="text-sm font-medium mt-2">POS</div>
            </div>
            <div
              onClick={() => handleSelectCourier("tiki")}
              className={`w-24 text-center cursor-pointer ${
                selectedCourier === "tiki"
                  ? "border-2 border-blue-500"
                  : "border"
              } rounded-lg p-2 hover:shadow-md`}
            >
              <img src="/courier/tiki.png" alt="TIKI" width={60} height={50} />
              <div className="text-sm font-medium mt-2">TIKI</div>
            </div>
          </div>
        </div>

        {/* Courier Type Options */}
        <div>
          <div className="text-lg font-semibold mb-2">
            Available Shipping Options
          </div>
          {isLoading ? (
            <ListOptionSkeleton />
          ) : listOptionShipping?.length ? (
            renderCourierOptions()
          ) : (
            <div className="text-gray-500 italic">
              Select a courier to view options.
            </div>
          )}
        </div>

        {/* Footer Section */}
        <div className="text-right">
          <Button onClick={onClose} className="mr-2">
            Cancel
          </Button>
          <Button
            type="primary"
            disabled={
              !selectedCourier ||
              !selectedOptionCourier ||
              !listOptionShipping?.length
            }
          >
            Confirm
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default ListShipping;
