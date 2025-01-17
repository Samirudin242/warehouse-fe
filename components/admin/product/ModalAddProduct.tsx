import React, { useState } from "react";
import { Modal, Form, Input, Select, Upload, Button, Image } from "antd";
import { toast, ToastContainer } from "react-toastify";
import { UploadOutlined, DeleteOutlined } from "@ant-design/icons";
import axiosRequest from "@/hooks/useAxios";
import _startCase from "lodash/startCase";
import _toLower from "lodash/toLower";
import useHookSwr from "@/hooks/useSwr";
import { configUrl } from "@/config/configUrl";
import GlobalModal from "@/components/modal/GlobalModal";

const { TextArea } = Input;
const { Option } = Select;

interface ModalAddProductProps {
  isOpen: boolean;
  content?: React.ReactNode;
  onOk?: () => void;
  onCancel: () => void;
  refresh: () => void;
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

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [body, setBody] = useState({});

  const [selectedSize, setSelectedSize] = useState<string[]>([]);
  const [selectedColor, setSelectedColor] = useState<string[]>([]);

  const [selectedParent, setSelectedParent] = useState<string | null>(null);
  const [selectedChild, setSelectedChild] = useState<string | null>(null);
  const [selectedSubChild, setSelectedSubChild] = useState<string | null>(null);

  const [profilePicture, setProfilePicture] = useState<File[]>([]);
  const [urlProfilePicture, setUrlProfilePicture] = useState<string[]>([]);

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

  const handleCloseModal = () => {
    form.resetFields();
    setSelectedSize([]);
    setSelectedColor([]);
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

  const handleUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const { response, error } = await axiosRequest({
      url: `${configUrl.apiUrlUserService}/auth/profile-photo`,
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response) {
      const pushFile = [...profilePicture, file];
      setProfilePicture(pushFile);
      const url = [...urlProfilePicture, response?.data?.url];
      setUrlProfilePicture(url);
    } else {
      console.error("Upload error:", error);
    }
  };

  const handleDelete = (idx: number) => {
    const updatedPictures = profilePicture.filter((_, i) => i !== idx);
    const updatedUrls = urlProfilePicture.filter((_, i) => i !== idx);

    setProfilePicture(updatedPictures);
    setUrlProfilePicture(updatedUrls);
  };

  const handleSelectMultipleSize = (id: string) => {
    const isInclude = [...selectedSize].includes(id);
    if (isInclude) {
      const data = [...selectedSize].filter((i: string) => i != id);
      setSelectedSize(data);
    } else {
      const data = [...selectedSize, id];
      setSelectedSize(data);
    }
  };

  const handleSelectMultipleColor = (id: string) => {
    const isInclude = [...selectedColor].includes(id);
    if (isInclude) {
      const data = [...selectedColor].filter((i: string) => i != id);
      setSelectedColor(data);
    } else {
      const data = [...selectedColor, id];
      setSelectedColor(data);
    }
  };

  const handleFormSubmit = (values: any) => {
    const body = {
      name: values.name,
      description: values.description,
      sku: values.sku,
      price: Number(values.price.toString().replace(".", "")),
      brand_id: values.brand_id,
      product_categories_id: selectedSubChild || selectedChild,
      size_id: selectedSize,
      color_id: selectedColor,
      image_url: urlProfilePicture,
      warehouse_id: values.warehouse_id,
      quantity: Number(values.quantity),
      gender: "unisex",
    };

    setBody(body);
    setIsOpenModal(true);
  };

  const onSubmitData = async () => {
    try {
      // Hit the API
      const { response, error } = await axiosRequest({
        url: `${configUrl.apiUrlProductService}/product`,
        method: "POST",
        body: body,
      });

      if (error?.response?.data) {
        const errorMessage: any = error?.response?.data;
        toast.error(errorMessage?.message, {
          position: "top-center",
        });
        return;
      }

      props.refresh();
      toast.success("User successfully registered!", {
        position: "top-center",
      });
      setIsOpenModal(false);
      props.onCancel();
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to register user. Please try again.", {
        position: "top-center",
      });
    }
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
        <ToastContainer />
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

          <Form.Item label="Sizes" name="size_id">
            <div className="flex flex-wrap gap-3">
              {dataSize?.map((size: any) => (
                <button
                  key={size?.id}
                  className={`rounded-full px-4 py-2 text-sm ${
                    selectedSize.includes(size.id)
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                  onClick={() => handleSelectMultipleSize(size.id)}
                >
                  {size?.size}
                </button>
              ))}
            </div>
          </Form.Item>
          <Form.Item label="Colors" name="color_id">
            <div className="flex flex-wrap gap-3">
              {dataColor?.map((color: any) => (
                <button
                  key={color.id}
                  className={`rounded-full w-10 h-10 border ${
                    selectedColor.includes(color.id)
                      ? "ring-2 ring-blue-500"
                      : ""
                  }`}
                  style={{
                    background: color.name,
                    color: ["white", "yellow", "gold", "beige"].includes(
                      color.name
                    )
                      ? "#000"
                      : "#FFF",
                  }}
                  onClick={() => handleSelectMultipleColor(color.id)}
                ></button>
              ))}
            </div>
          </Form.Item>
          <Form.Item
            label="Category"
            name="product_categories_id"
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
            label="Warehouse"
            name="warehouse_id"
            rules={[{ required: true, message: "Please select a warehouse" }]}
          >
            <Select
              placeholder="Select or Search Warehouse"
              showSearch
              onSearch={(e) => {
                handleSearchWarehouse(e);
              }}
              filterOption={false}
            >
              {dataWarehouse?.content?.map((war: any) => (
                <Option key={war?.id} value={war?.id}>
                  {_startCase(_toLower(war?.name))}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Brand"
            name="brand_id"
            rules={[{ required: true, message: "Please select a brand" }]}
          >
            <Select placeholder="Select Brand">
              {dataBrand?.map((brand: any) => (
                <Option key={brand?.id} value={brand?.id}>
                  {_startCase(_toLower(brand?.brand))}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Profile Picture" name="profile_picture">
            <Upload
              customRequest={({ file }) => handleUpload(file as File)}
              showUploadList={false}
              accept=".jpg,.png"
            >
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
            {profilePicture.length && (
              <div className="mt-2 flex gap-2">
                {profilePicture?.map((picture: File, idx) => {
                  return (
                    <div key={idx} className="relative">
                      <Image
                        src={URL.createObjectURL(picture)}
                        alt="Profile Preview"
                        width={100}
                        height={100}
                        style={{ borderRadius: "50%" }}
                      />
                      <Button
                        icon={<DeleteOutlined />}
                        type="primary"
                        danger
                        size="small"
                        onClick={() => handleDelete(idx)}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </Form.Item>
        </Form>
        {isOpenModal && (
          <GlobalModal
            isVisible={true}
            title="Confirmation"
            content="Are you sure you want to create an account?"
            icon="product"
            onOk={onSubmitData}
            onCancel={() => setIsOpenModal(false)}
          />
        )}
      </Modal>
    </>
  );
};

export default ModalAddProduct;
