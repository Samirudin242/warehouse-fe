import React, { useEffect, useState } from "react";

import { Modal } from "antd";

import { useAppContext } from "@/contexts/useContext";
import { configUrl } from "@/config/configUrl";
import useHookSwr from "@/hooks/useSwr";
import ListAddressSkeleton from "../skeletonLoading/ListAddressSkeleton";
import ModalAddNewAddress from "./ModalAddNewAddress";
import axiosRequest from "@/hooks/useAxios";
import AddressCard from "./AddressCard";

type PropsAddress = {
  isOpen: boolean;
  onClose: () => void;
  setSelectedUserAddress: (obj: any) => void;
  selectedAddressId?: string;
  listWarehouseId: string[];
  setSelectedNearestWarehouse: (obj: any) => void;
};

export default function ListAddress({
  isOpen,
  onClose,
  setSelectedUserAddress,
  selectedAddressId,
  listWarehouseId,
  setSelectedNearestWarehouse,
}: PropsAddress) {
  const { user } = useAppContext();

  const userId = user?.id;

  const [openModal, setOpenModal] = useState<boolean>(false);

  const { data, refresh, error, isLoading } = useHookSwr(
    userId
      ? `${configUrl.apiUrlUserService}/address/list-address/${userId}`
      : null
  );

  useEffect(() => {
    if (userId && !data) {
      refresh(`${configUrl.apiUrlUserService}/address/list-address/${userId}`);
    }
  }, [userId]);

  const handleSelectAddress = async (adr: any) => {
    setSelectedUserAddress(adr);
    const body = {
      user: {
        latitude: adr?.latitude,
        longitude: adr?.longitude,
      },
      warehouse: listWarehouseId,
    };

    const { response } = await axiosRequest({
      url: `${configUrl.apiUrlWarehouseService}/order/nearest-warehouse`,
      method: "POST",
      body,
    });

    if (response?.data) {
      setSelectedNearestWarehouse(response?.data);
    }
  };

  if (isLoading) {
    <ListAddressSkeleton />;
  }

  return (
    <Modal
      title="List Address"
      open={isOpen}
      onCancel={onClose}
      width={700}
      footer={null}
    >
      <AddressCard
        setOpenModal={setOpenModal}
        data={data}
        selectedAddressId={selectedAddressId}
        handleSelectAddress={handleSelectAddress}
      />
      <ModalAddNewAddress
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        refresh={refresh}
      />
    </Modal>
  );
}
