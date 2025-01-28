"use client";
import React, { useState } from "react";

export default function page() {
  const [products] = useState([
    {
      id: 1,
      image: "/product1.jpg",
      name: "Product 1",
      price: 50000,
      quantity: 2,
    },
    {
      id: 2,
      image: "/product2.jpg",
      name: "Product 2",
      price: 30000,
      quantity: 1,
    },
  ]);

  const [shippingAddress, setShippingAddress] = useState("");
  const [paymentProof, setPaymentProof] = useState(null);

  const totalPrice = products.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );

  const handleFileUpload = (e: any) => {
    setPaymentProof(e.target.files[0]);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6 text-black">
      {/* Product List */}
      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-xl font-bold mb-4">Product List</h2>
        <div className="space-y-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex items-center justify-between border-b pb-4 last:border-b-0"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <div className="font-medium text-gray-800">
                    {product.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    x{product.quantity}
                  </div>
                </div>
              </div>
              <div className="text-gray-800 font-medium">
                Rp {product.price.toLocaleString("id-ID")}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
        <textarea
          className="w-full border rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-200"
          rows={3}
          placeholder="Enter your shipping address"
          value={shippingAddress}
          onChange={(e) => setShippingAddress(e.target.value)}
        ></textarea>
      </div>

      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-xl font-bold mb-4">Total Price</h2>
        <div className="text-2xl font-semibold text-gray-800">
          Rp {totalPrice.toLocaleString("id-ID")}
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-xl font-bold mb-4">Upload Payment Proof</h2>
        <input
          type="file"
          className="w-full border rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-200"
          onChange={handleFileUpload}
        />
      </div>

      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-xl font-bold mb-4">Bank Information</h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <img src="/bank/bca.png" alt="BCA" className="w-12 h-12" />
            <div>
              <div className="font-medium text-gray-800">BCA</div>
              <div className="text-sm text-gray-500">1234567890</div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <img src="/bank/mandiri.png" alt="Mandiri" className="w-12 h-12" />
            <div>
              <div className="font-medium text-gray-800">Mandiri</div>
              <div className="text-sm text-gray-500">0987654321</div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <img src="/bank/bri.png" alt="BRI" className="w-12 h-12" />
            <div>
              <div className="font-medium text-gray-800">BRI</div>
              <div className="text-sm text-gray-500">1122334455</div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <img src="/bank/bni.png" alt="BNI" className="w-12 h-12" />
            <div>
              <div className="font-medium text-gray-800">BNI</div>
              <div className="text-sm text-gray-500">5566778899</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300">
          Submit Order
        </button>
      </div>
    </div>
  );
}
