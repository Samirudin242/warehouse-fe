import React, { useEffect, useState } from "react";
import AddressCard from "../cart/AddressCard";

import { Button, Modal } from "antd";

import { useAppContext } from "@/contexts/useContext";
import { configUrl } from "@/config/configUrl";
import useHookSwr from "@/hooks/useSwr";
import ListAddressSkeleton from "../skeletonLoading/ListAddressSkeleton";
import axiosRequest from "@/hooks/useAxios";
import ModalAddNewAddress from "../cart/ModalAddNewAddress";

export default function ListAddressUser() {
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
  return (
    <div>
      <AddressCard
        setOpenModal={setOpenModal}
        data={data}
        isHideButtonSelect={true}
      />
      <ModalAddNewAddress
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        refresh={refresh}
      />
    </div>
  );
}
