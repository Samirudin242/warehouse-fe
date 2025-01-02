import React, { useState } from "react";
import { Modal, Form, Input, Button, Select } from "antd";

const { TextArea } = Input;
const { Option } = Select;

const sizes = [
  "35",
  "35.5",
  "36",
  "36.5",
  "37",
  "37.5",
  "38",
  "38.5",
  "39",
  "39.5",
  "40",
  "40.5",
  "41",
  "41.5",
  "42",
  "42.5",
  "43",
  "43.5",
  "44",
  "44.5",
  "45",
];

const colors = [
  { name: "white", filterGroup: "#FFFFFF" },
  { name: "silver", filterGroup: "#C0C0C0" },
  { name: "pink", filterGroup: "#FFC0CB" },
  { name: "beige", filterGroup: "#F5F5DC" },
  {
    name: "multi",
    filterGroup:
      "linear-gradient(to right, #FF0000, #FFFF00, #00FF00, #0000FF)",
  },
  { name: "black", filterGroup: "#000000" },
  { name: "brow", filterGroup: "#8B4513" },
  { name: "grey", filterGroup: "#808080" },
  { name: "olive", filterGroup: "#808000" },
  { name: "orange", filterGroup: "#FFA500" },
  { name: "gold", filterGroup: "#FFD700" },
  { name: "yellow", filterGroup: "#FFFF00" },
  { name: "red", filterGroup: "#FF0000" },
  { name: "green", filterGroup: "#008000" },
  { name: "blue", filterGroup: "#0000FF" },
];

const categories = [
  {
    id: "women",
    name: "Women",
    children: [
      {
        id: "bags",
        name: "Bags",
      },
      {
        id: "clothing",
        name: "Clothing",
        children: [
          { id: "blazer", name: "Blazer" },
          { id: "dresses", name: "Dresses" },
          { id: "jackets", name: "Jackets" },
          { id: "jeans", name: "Jeans" },
          { id: "shirts", name: "Shirts" },
          { id: "skirts", name: "Skirts" },
          { id: "t-shirts", name: "T-Shirts" },
          { id: "tops", name: "Tops" },
          { id: "trouser", name: "Trouser" },
        ],
      },
      {
        id: "shoes",
        name: "Shoes",
      },
    ],
  },
  {
    id: "men",
    name: "Men",
    children: [
      {
        id: "clothing",
        name: "Clothing",
        children: [
          { id: "blazer", name: "Blazer" },
          { id: "jackets", name: "Jackets" },
          { id: "jeans", name: "Jeans" },
          { id: "shirts", name: "Shirts" },
          { id: "t-shirts", name: "T-Shirts" },
          { id: "trouser", name: "Trouser" },
        ],
      },
      {
        id: "shoes",
        name: "Shoes",
      },
    ],
  },
  {
    id: "accessories",
    name: "Accessories",
    children: [
      {
        id: "women",
        name: "Women",
        children: [
          { id: "clothing", name: "Clothing" },
          { id: "looks", name: "Looks" },
          { id: "sunglasses", name: "Sunglasses" },
        ],
      },
      {
        id: "men",
        name: "Men",
      },
    ],
  },
];

interface ModalAddProductProps {
  isOpen: boolean;
  content?: React.ReactNode;
  onOk?: () => void;
  onCancel?: () => void;
}

const ModalAddProduct = (props: ModalAddProductProps) => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const [selectedParent, setSelectedParent] = useState<string | null>(null);
  const [selectedChild, setSelectedChild] = useState<string | null>(null);

  const handleParentChange = (value: string) => {
    setSelectedParent(value);
    setSelectedChild(null); // Reset child when parent changes
  };

  const handleChildChange = (value: string) => {
    setSelectedChild(value);
  };

  const parentCategories = categories;
  const childCategories =
    (selectedParent &&
      parentCategories.find((cat) => cat.id === selectedParent)?.children) ||
    [];

  const handleOpenModal = () => setIsModalVisible(true);
  const handleCloseModal = () => {
    form.resetFields();
    setSelectedSize(null);
    setSelectedColor(null);
    setIsModalVisible(false);
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
        title="Submit Product"
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
          >
            Submit
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
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
          <Form.Item label="Sizes">
            <div className="flex flex-wrap gap-3">
              {sizes.map((size) => (
                <button
                  key={size}
                  className={`rounded-full px-4 py-2 text-sm ${
                    selectedSize === size
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </Form.Item>
          <Form.Item label="Colors">
            <div className="flex flex-wrap gap-3">
              {colors.map((color) => (
                <button
                  key={color.name}
                  className={`rounded-full w-10 h-10 border ${
                    selectedColor === color.name ? "ring-2 ring-blue-500" : ""
                  }`}
                  style={{
                    background: color.filterGroup,
                    color: ["white", "yellow", "gold", "beige"].includes(
                      color.name
                    )
                      ? "#000"
                      : "#FFF",
                  }}
                  onClick={() => setSelectedColor(color.name)}
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
              {parentCategories.map((cat) => (
                <Option key={cat.id} value={cat.id}>
                  {cat.name}
                </Option>
              ))}
            </Select>
            {childCategories.length > 0 && (
              <Select
                placeholder="Select Subcategory"
                onChange={handleChildChange}
                value={selectedChild}
                style={{ marginTop: "10px" }}
              >
                {childCategories.map((child) => (
                  <Option key={child.id} value={child.id}>
                    {child.name}
                  </Option>
                ))}
              </Select>
            )}
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalAddProduct;
