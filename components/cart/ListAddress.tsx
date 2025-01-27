import React, { useEffect, useState } from "react";

import { Button, Modal } from "antd";

import { useAppContext } from "@/contexts/useContext";
import { configUrl } from "@/config/configUrl";
import useHookSwr from "@/hooks/useSwr";
import ListAddressSkeleton from "../skeletonLoading/ListAddressSkeleton";
import ModalAddNewAddress from "./ModalAddNewAddress";
import axiosRequest from "@/hooks/useAxios";

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

    console.log(body);

    const { response } = await axiosRequest({
      url: `${configUrl.apiUrlWarehouseService}/order/nearest-warehouse`,
      method: "POST",
      body,
    });

    if (response?.data) {
      setSelectedNearestWarehouse(response?.data);
    }

    console.log(response?.data);
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
      <div className="border-t border-gray-200 pt-4">
        <div className="mt-2 mb-3">
          <Button onClick={() => setOpenModal(true)}>Add New Address</Button>
        </div>
        {data?.length ? (
          <div>
            {data?.map((adr: any) => {
              return (
                <div
                  className={`flex border p-2 rounded-md mb-3 ${
                    selectedAddressId == adr?.id ? "bg-gray-200" : ""
                  } `}
                >
                  <div className="">
                    <div className="font-bold">{adr?.name}</div>
                    <div className="font-thin">{adr?.phone_number}</div>
                    <div>
                      {adr?.address}, {adr?.city}, {adr?.province}{" "}
                      {adr?.postal_code}
                    </div>
                  </div>
                  <div className="ml-auto">
                    <Button onClick={() => handleSelectAddress(adr)}>
                      Pilih
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <ListAddressSkeleton />
        )}
      </div>
      <ModalAddNewAddress
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        refresh={refresh}
      />
    </Modal>
  );
}
