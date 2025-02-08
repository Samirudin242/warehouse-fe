"use client";

import { useState, lazy, Suspense, useEffect } from "react";
import { Table, Tag, Segmented, Input, Button, Modal, Spin, Image } from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  MdOutlinePayment,
  MdLocalShipping,
  MdDoneAll,
  MdCancel,
  MdSearch,
  MdInfoOutline,
} from "react-icons/md";
import { FaFilter } from "react-icons/fa";
import dayjs from "dayjs";
import { OrderUser } from "@/types/Order";
import { configUrl } from "@/config/configUrl";
import useHookSwr from "@/hooks/useSwr";
import SkeletonTable from "@/components/skeletonLoading/TableSkeleton";
import axiosRequest from "@/hooks/useAxios";
import { useAppContext } from "@/contexts/useContext";
import { useCheckRoleAndRedirect } from "@/utils/checkRole";

const ModalOrderDetail = lazy(
  () => import("@/components/order/ModalOrderDetail")
);

const GlobalModal = lazy(() => import("@/components/modal/GlobalModal"));

const PAGE_SIZE = 10;

function OrderManagementPage() {
  const { setLoading } = useAppContext();

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE);
  const [selectedStatus, setSelectedStatus] =
    useState<string>("All Transaction");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<OrderUser | null>();

  //preview image
  const [visible, setVisible] = useState(false);
  const [scaleStep, setScaleStep] = useState(0.5);

  const [openModalApprove, setOpenModalApprove] = useState<boolean>(false);
  const [modalCancel, setModalCancel] = useState<boolean>(false);

  const [bodyShipping, setBodyShipping] = useState<any>();
  const [bodyCancel, setBodyCancel] = useState<any>();
  const [loadingButton, setLoadingButton] = useState<boolean>(false);

  const [visibleImageId, setVisibleImageId] = useState<string | null>(null);

  const { data, refresh, error, isLoading } = useHookSwr(
    `${configUrl.apiUrlWarehouseService}/order`,
    {
      refreshInterval: 3000,
      revalidateIfStale: true,
      revalidateOnFocus: true,
      revalidateOnReconnect: false,
    }
  );

  const dataOrders = data?.content;

  const totalOrders = data?.totalElements || 0;

  useCheckRoleAndRedirect();

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleFilterOrder = (type: string) => {
    refresh(`${configUrl.apiUrlWarehouseService}/order?status=${type}`);
  };

  const handleCancelOrder = async () => {
    const { response, error } = await axiosRequest({
      url: `${configUrl.apiUrlWarehouseService}/order/cancel-order`,
      method: "POST",
      body: bodyCancel,
    });

    if (response) {
      setModalCancel(false);
      refresh(`${configUrl.apiUrlWarehouseService}/order`);
    }
  };

  const handleChangePage = (page: any) => {
    setCurrentPage(page);
    const url = `${configUrl.apiUrlProductService}/product?page=${page}`;
    refresh(url);
  };

  type OrderStatus = "PAYMENT_WAITING" | "SHIPPING" | "COMPLETED" | "CANCELLED";

  const statusConfig: Record<
    OrderStatus,
    { color: string; icon: JSX.Element }
  > = {
    PAYMENT_WAITING: { color: "gold", icon: <MdOutlinePayment /> },
    SHIPPING: { color: "blue", icon: <MdLocalShipping /> },
    COMPLETED: { color: "green", icon: <MdDoneAll /> },
    CANCELLED: { color: "red", icon: <MdCancel /> },
  };

  // const handleCancelOrder = async (orderId: string) => {
  //   Modal.confirm({
  //     title: "Confirm Order Cancellation",
  //     content: "Are you sure you want to cancel this order?",
  //     onOk: async () => {
  //       try {
  //         console.log("Cancelling order:", orderId);
  //       } catch (error) {
  //         console.error("Cancellation failed:", error);
  //       }
  //     },
  //   });
  // };

  const handleOpenModalShipping = (order: OrderUser) => {
    setOpenModalApprove(true);

    const body = {
      user_id: order?.user?.id,
      order_id: order?.id,
      order_date: order?.order_date,
      orders: order?.order_items?.map((o) => {
        return {
          id: o.id,
          order_id: order?.id,
          product_id: o?.product?.id,
          quantity: o?.quantity,
          warehouse_id: o?.warehouse_id,
          price: o?.price,
        };
      }),
    };

    setBodyShipping(body);
  };

  const onSubmitChangeStatusToShipping = async () => {
    try {
      setLoadingButton(true);
      const { response, error } = await axiosRequest({
        url: `${configUrl.apiUrlWarehouseService}/order/shipped-order`,
        method: "POST",
        body: bodyShipping,
      });

      if (response?.data) {
        setOpenModalApprove(false);
        refresh(`${configUrl.apiUrlWarehouseService}/order`);
        setLoadingButton(false);
      }
    } catch (error) {
      setLoadingButton(false);
    }
  };

  const statusFilters = [
    {
      value: "All Transaction",
      label: (
        <div className="flex items-center gap-2">
          <FaFilter className="text-gray-600" />
          <span>All</span>
        </div>
      ),
    },
    {
      value: "PAYMENT_WAITING",
      label: (
        <div className="flex items-center gap-2">
          <MdOutlinePayment className="text-yellow-600" />
          <span>Payment Waiting</span>
        </div>
      ),
    },
    {
      value: "SHIPPING",
      label: (
        <div className="flex items-center gap-2">
          <MdLocalShipping className="text-blue-600" />
          <span>Shipping</span>
        </div>
      ),
    },
    {
      value: "COMPLETED",
      label: (
        <div className="flex items-center gap-2">
          <MdDoneAll className="text-green-600" />
          <span>Completed</span>
        </div>
      ),
    },
    {
      value: "CANCELLED",
      label: (
        <div className="flex items-center gap-2">
          <MdCancel className="text-red-600" />
          <span>Cancelled</span>
        </div>
      ),
    },
  ];

  const columns: ColumnsType<OrderUser> = [
    {
      title: "User",
      dataIndex: "user",
      key: "user",
      width: 250,
      render: (user: { name: string; profile_picture: string }) => (
        <div className="flex items-center space-x-4">
          {user?.profile_picture && (
            <img
              src={user.profile_picture}
              alt="user picture"
              className="w-10 h-10 rounded-md object-cover"
            />
          )}
          <span>{user?.name || "No Name"}</span>
        </div>
      ),
    },
    {
      title: "Date",
      dataIndex: "order_date",
      key: "date",
      render: (date: string) => dayjs(date).format("DD MMM YYYY HH:mm"),
      sorter: (a, b) => dayjs(a.order_date).unix() - dayjs(b.order_date).unix(),
    },
    {
      title: "Total Amount",
      dataIndex: "total_amount",
      key: "total",
      render: (amount: number) => `Rp${amount.toLocaleString()}`,
      sorter: (a, b) => a.total_amount - b.total_amount,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, record: OrderUser) => {
        const config = statusConfig[record.status as OrderStatus];
        return (
          <div>
            <Tag
              color={config.color}
              icon={config.icon}
              className="flex items-center gap-2 w-fit"
            >
              {record.status.replace("_", " ")}
            </Tag>
            {record.payment.payment_proof && (
              <div>
                <button
                  onClick={() => setVisibleImageId(record.id)}
                  className="border mt-2 px-1 rounded bg-green-200 text-green-700"
                >
                  Payment proof
                </button>
                <Image
                  width={200}
                  style={{ display: "none" }}
                  src={record.payment.payment_proof}
                  preview={{
                    visible: visibleImageId === record.id,
                    src: record.payment.payment_proof,
                    scaleStep,
                    onVisibleChange: (value) => {
                      if (!value) setVisibleImageId(null);
                    },
                  }}
                />
              </div>
            )}
          </div>
        );
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record: OrderUser) => (
        <div className="flex gap-2">
          <Button
            icon={<MdInfoOutline />}
            onClick={() => setSelectedOrder(record)}
          >
            Detail
          </Button>
          {record.status === "PAYMENT_WAITING" && (
            <>
              {record.payment?.payment_proof && (
                <Button
                  type="primary"
                  className="bg-green-600"
                  icon={<MdLocalShipping />}
                  onClick={() => handleOpenModalShipping(record)}
                >
                  Shipping
                </Button>
              )}
              <Button
                danger
                icon={<MdCancel />}
                onClick={() => {
                  setBodyCancel({
                    order_id: record.id,
                    order_date: record.order_date,
                  });
                  setModalCancel(true);
                }}
              >
                Cancel
              </Button>
            </>
          )}
        </div>
      ),
    },
  ];

  if (isLoading) {
    return <SkeletonTable />;
  }

  return (
    <div className="text-black">
      <div className="p-6 bg-white rounded-lg shadow-sm">
        <div className="flex flex-col gap-4 mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">
            Order Management
          </h1>

          <div className="flex flex-col md:flex-row gap-4">
            <Input
              placeholder="Search orders..."
              prefix={<MdSearch className="text-gray-400" />}
              onChange={(e) => setSearchQuery(e.target.value)}
              allowClear
              className="max-w-md"
            />

            <Segmented
              options={statusFilters}
              value={selectedStatus}
              onChange={(value) => {
                setSelectedStatus(value as string);
                handleFilterOrder(value as string);
              }}
              className="flex-wrap"
            />
          </div>
        </div>

        <Table
          columns={columns}
          dataSource={dataOrders}
          rowKey="id"
          loading={isLoading}
          pagination={{
            current: currentPage,
            pageSize,
            total: totalOrders,
            showSizeChanger: false,
            onChange: (page) => handleChangePage(page),
          }}
          scroll={{ x: true }}
        />

        {selectedOrder && (
          <Suspense fallback={<Spin />}>
            <ModalOrderDetail
              order={selectedOrder}
              setIsModalOpen={() => setSelectedOrder(null)}
            />
          </Suspense>
        )}

        {openModalApprove && (
          <Suspense fallback={<div></div>}>
            <GlobalModal
              isVisible={openModalApprove}
              icon="shipping"
              content={
                <div>
                  Are you sure change status to{" "}
                  <span className="font-bold">Shipping</span>
                </div>
              }
              onCancel={() => setOpenModalApprove(false)}
              loadingButton={loadingButton}
              onOk={onSubmitChangeStatusToShipping}
            />
          </Suspense>
        )}

        <GlobalModal
          isVisible={modalCancel}
          content={
            <div className="text-black font-bold">
              Are you sure want to cancel the order
            </div>
          }
          onCancel={() => {
            setModalCancel(false);
          }}
          icon={"cancel"}
          onOk={handleCancelOrder}
        />
      </div>
    </div>
  );
}

export default OrderManagementPage;
