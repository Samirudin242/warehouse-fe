import React from "react";

import { Button } from "antd";

import ListAddressSkeleton from "../skeletonLoading/ListAddressSkeleton";

type AddressCardProps = {
  setOpenModal: (p: boolean) => void;
  data: any;
  selectedAddressId?: string;
  isHideButtonSelect?: boolean;
  handleSelectAddress?: (adr: any) => void;
};

export default function AddressCard({
  setOpenModal,
  data,
  selectedAddressId,
  isHideButtonSelect,
  handleSelectAddress,
}: AddressCardProps) {
  return (
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
                {!isHideButtonSelect && (
                  <div className="ml-auto">
                    <Button
                      onClick={() =>
                        handleSelectAddress && handleSelectAddress(adr)
                      }
                    >
                      Pilih
                    </Button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <ListAddressSkeleton />
      )}
    </div>
  );
}
