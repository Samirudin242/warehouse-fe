import { useState } from "react";
import { toast, Bounce, ToastContainer } from "react-toastify";
import { Modal, Rate, Input } from "antd";
import { FiStar, FiX, FiArrowLeft } from "react-icons/fi";
import { OrderUser, OrderItem } from "@/types/Order";
import axiosRequest from "@/hooks/useAxios";
import { configUrl } from "@/config/configUrl";
import { useAppContext } from "@/contexts/useContext";

type Product = {
  id: string;
  name: string;
  image: string;
  description: string;
};

type ReviewProps = {
  isOpen: boolean;
  order: OrderUser;
  handleCancel: () => void;
  onSubmit?: (review: {
    rating: number;
    comment: string;
    productId: string;
  }) => void;
};

const ReviewModal = ({ isOpen, order, handleCancel }: ReviewProps) => {
  const { user } = useAppContext();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<OrderItem | null>();

  const handleSubmit = async () => {
    try {
      const { response, error } = await axiosRequest({
        url: `${configUrl.apiUrlProductService}/review`,
        method: "POST",
        body: {
          product_id: selectedProduct?.product?.id,
          comment,
          rating,
          user_id: user.id,
        },
      });

      if (response) {
        setSelectedProduct(null);
        setComment("");
        setRating(0);
        toast.success("Successfully added a review!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
          transition: Bounce,
        });

        setTimeout(() => {
          handleCancel();
        }, 1500);
      } else {
        toast.error(error?.message || "Failed to submit review", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
          transition: Bounce,
        });
      }
    } catch (error) {
      toast.error("An unexpected error occurred", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  return (
    <Modal
      title={null}
      open={isOpen}
      footer={null}
      closable={false}
      onCancel={() => {
        setSelectedProduct(null);
        handleCancel();
      }}
      width={800}
      className="[&_.ant-modal-content]:p-0"
    >
      <ToastContainer />

      <div className="p-6">
        <div className="flex justify-between items-start mb-6">
          <h3 className="text-xl font-semibold text-gray-800">
            {selectedProduct ? (
              <button
                onClick={() => setSelectedProduct(null)}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
              >
                <FiArrowLeft />
                Select Product
              </button>
            ) : (
              "Select Product to Review"
            )}
          </h3>
          <button
            onClick={() => {
              setSelectedProduct(null);
              handleCancel();
            }}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <FiX size={24} />
          </button>
        </div>

        {!selectedProduct ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {order?.order_items?.map((product) => (
              <button
                key={product.id}
                onClick={() => setSelectedProduct(product)}
                className="group border rounded-lg p-4 hover:border-blue-500 transition-colors text-left"
              >
                <img
                  src={product?.product?.imageUrl}
                  alt={"product"}
                  className="w-full h-fit object-cover rounded-md mb-3"
                />
                <h4 className="font-medium text-gray-800 group-hover:text-blue-600">
                  {product.product?.name}
                </h4>
              </button>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center gap-4">
                <img
                  src={selectedProduct?.product?.imageUrl}
                  alt="Product"
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div>
                  <h4 className="font-medium text-gray-800">
                    {selectedProduct?.product?.name}
                  </h4>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Rating
              </label>
              <Rate
                character={<FiStar className="inline-block" />}
                value={rating}
                onChange={setRating}
                className="text-2xl text-yellow-500 [&>.ant-rate-star]:mr-1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Review
              </label>
              <Input.TextArea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
                placeholder="Share your experience with this product..."
                className="rounded-lg border-gray-300 hover:border-blue-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setSelectedProduct(null)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Submit Review
              </button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ReviewModal;
