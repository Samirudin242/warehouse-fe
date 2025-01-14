import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Button, Select } from "antd";
import _startCase from "lodash/startCase";
import _toLower from "lodash/toLower";
import useHookSwr from "@/hooks/useSwr";
import { configUrl } from "@/config/configUrl";

const { TextArea } = Input;
const { Option } = Select;

type Size = {
  id: string;
  size: string;
};

type brand = {
  id: string;
  brand: string;
};

type Color = {
  id: string;
  name: string;
};

type Category = {
  id: string;
  parentId: string;
  name: string;
  slug: string;
};

interface ModalAddProductProps {
  isOpen: boolean;
  content?: React.ReactNode;
  onOk?: () => void;
  onCancel?: () => void;
}

const ModalAddProduct = (props: ModalAddProductProps) => {
  const [form] = Form.useForm();

  //List master data
  const { data: dataCategory } = useHookSwr(
    `${configUrl.apiUrlProductService}/product/products-category`
  );

  const { data: dataBrand } = useHookSwr(
    `${configUrl.apiUrlProductService}/product/products-brand`
  );

  const { data: dataSize } = useHookSwr(
    `${configUrl.apiUrlProductService}/product/products-size`
  );

  const { data: dataColor } = useHookSwr(
    `${configUrl.apiUrlProductService}/product/products-color`
  );

  const { data: dataWarehouse, refresh: refreshWarehouse } = useHookSwr(
    `${configUrl.apiUrlWarehouseService}/warehouse?name=`
  );

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const [selectedParent, setSelectedParent] = useState<string | null>(null);
  const [selectedChild, setSelectedChild] = useState<string | null>(null);
  const [selectedSubChild, setSelectedSubChild] = useState<string | null>(null);

  const handleParentChange = (value: string) => {
    setSelectedParent(value);
    setSelectedChild(null);
    setSelectedSubChild(null);
  };

  const handleChildChange = (value: string) => {
    setSelectedChild(value);
    setSelectedSubChild(null);
  };

  const handleSubChildChange = (value: string) => {
    setSelectedSubChild(value);
  };

  const handleSearchWarehouse = (query: string) => {
    const url = `http://localhost:8080/warehouse?name=${query}`;
    refreshWarehouse(url);
  };

  const parentCategories = dataCategory;

  const childCategories =
    (selectedParent &&
      parentCategories.find((cat: any) => cat.id === selectedParent)
        ?.children) ||
    [];

  const subChildCategories =
    (
      selectedChild &&
      parentCategories
        .find((cat: any) => cat.id === selectedParent)
        ?.children.find((cc: any) => cc.id === selectedChild)
    )?.children || [];

  const handleOpenModal = () => setIsModalVisible(true);
  const handleCloseModal = () => {
    form.resetFields();
    setSelectedSize(null);
    setSelectedColor(null);
    setIsModalVisible(false);
  };

  const formatCurrency = (num: any) => {
    if (!num) return "";
    const cleanedNum = num.replace(/\D/g, "");
    return cleanedNum.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handleInputChange = (e: any) => {
    const inputValue = e.target.value;
    const formattedValue = formatCurrency(inputValue);
    form.setFieldsValue({ price: formattedValue });
  };

  const handleFormSubmit = (values: any) => {
    console.log("Submitted Product:", {
      ...values,
      size: selectedSize,
      color: selectedColor,
    });
    handleCloseModal();
  };

  return (
    <>
      <Modal
        title="Add New Product"
        open={props.isOpen}
        onCancel={props.onCancel}
        footer={[
          <Button
            key="cancel"
            onClick={handleCloseModal}
            className="rounded-lg bg-gray-300 hover:bg-gray-400 px-4 py-2"
          >
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            className={`rounded-lg ${
              !selectedSize || !selectedColor
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            } text-white px-4 py-2`}
            onClick={() => form.submit()}
            disabled={!selectedSize || !selectedColor}
            size="large"
          >
            Submit
          </Button>,
        ]}
        width={1000}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFormSubmit}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "16px",
          }}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              { required: true, message: "Please enter the product name" },
            ]}
          >
            <Input
              placeholder="Enter product name"
              className="rounded-lg border-gray-300"
            />
          </Form.Item>
          <Form.Item
            label="Price"
            name="price"
            rules={[
              { required: true, message: "Please enter the product price" },
            ]}
          >
            <Input
              prefix="Rp"
              placeholder="Enter product price"
              className="rounded-lg border-gray-300"
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item
            label="Quantity"
            name="quantity"
            rules={[{ required: true, message: "Please enter the quantity" }]}
          >
            <Input
              placeholder="Enter product quantity"
              className="rounded-lg border-gray-300"
              type="number"
            />
          </Form.Item>
          <Form.Item
            label="SKU"
            name="sku"
            rules={[{ required: true, message: "Please enter the SKU" }]}
          >
            <Input
              placeholder="Enter product SKU"
              className="rounded-lg border-gray-300"
            />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please enter a description" }]}
          >
            <TextArea
              rows={3}
              placeholder="Enter product description"
              className="rounded-lg border-gray-300"
            />
          </Form.Item>

          <Form.Item label="Sizes">
            <div className="flex flex-wrap gap-3">
              {dataSize?.map((size: any) => (
                <button
                  key={size?.id}
                  className={`rounded-full px-4 py-2 text-sm ${
                    selectedSize === size?.id
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                  onClick={() => setSelectedSize(size.id)}
                >
                  {size?.size}
                </button>
              ))}
            </div>
          </Form.Item>
          <Form.Item label="Colors">
            <div className="flex flex-wrap gap-3">
              {dataColor?.map((color: any) => (
                <button
                  key={color.id}
                  className={`rounded-full w-10 h-10 border ${
                    selectedColor === color.id ? "ring-2 ring-blue-500" : ""
                  }`}
                  style={{
                    background: color.name,
                    color: ["white", "yellow", "gold", "beige"].includes(
                      color.name
                    )
                      ? "#000"
                      : "#FFF",
                  }}
                  onClick={() => setSelectedColor(color.id)}
                ></button>
              ))}
            </div>
          </Form.Item>
          <Form.Item
            label="Category"
            rules={[{ required: true, message: "Please select a category" }]}
          >
            <Select
              placeholder="Select Parent Category"
              onChange={handleParentChange}
            >
              {dataCategory?.map((cat: any) => (
                <Option key={cat?.id} value={cat?.id}>
                  {_startCase(_toLower(cat?.name))}
                </Option>
              ))}
            </Select>

            {childCategories?.length > 0 && (
              <Select
                placeholder="Select Subcategory"
                onChange={handleChildChange}
                value={selectedChild}
                style={{ marginTop: "10px" }}
              >
                {childCategories?.map((child: any) => (
                  <Option key={child?.id} value={child?.id}>
                    {_startCase(_toLower(child?.name))}
                  </Option>
                ))}
              </Select>
            )}

            {subChildCategories?.length > 0 && (
              <Select
                placeholder="Select Subcategory"
                onChange={handleSubChildChange}
                value={selectedSubChild}
                style={{ marginTop: "10px" }}
              >
                {subChildCategories?.map((child: any) => (
                  <Option key={child?.id} value={child?.id}>
                    {_startCase(_toLower(child?.name))}
                  </Option>
                ))}
              </Select>
            )}
          </Form.Item>
          <Form.Item
            label="Category"
            rules={[{ required: true, message: "Please select a category" }]}
          >
            <Select
              placeholder="Search Warehouse"
              showSearch
              onSearch={(e) => {
                handleSearchWarehouse(e);
              }}
              // onChange={handleParentChange}
            >
              {dataWarehouse?.content?.map((war: any) => (
                <Option key={war?.id} value={war?.id}>
                  {_startCase(_toLower(war?.name))}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalAddProduct;
