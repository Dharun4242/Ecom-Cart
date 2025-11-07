import React from "react";

const ReceiptModal = ({ receipt, onClose }) => {
  if (!receipt) return null;

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-8 max-w-xl w-full shadow-2xl overflow-y-auto max-h-[90vh]">
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-3xl font-bold text-green-600">
            🎉 Order Confirmation
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 text-3xl font-light leading-none"
          >
            &times;
          </button>
        </div>

        <div className="space-y-4">
          <p className="text-lg">
            Thank you for your order, **{receipt.customer?.name || "Customer"}
            **!
          </p>

          <div className="border p-4 rounded-lg bg-gray-50">
            <div className="flex justify-between py-1">
              <span className="font-medium text-gray-600">Order ID:</span>
              <span className="font-semibold text-gray-800">
                {receipt.orderId}
              </span>
            </div>
            <div className="flex justify-between py-1">
              <span className="font-medium text-gray-600">Date:</span>
              <span>{formatTimestamp(receipt.timestamp)}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="font-medium text-gray-600">Email:</span>
              <span>{receipt.customer?.email}</span>
            </div>
          </div>

          <h3 className="text-xl font-semibold mt-6 border-b pb-1">
            Items Purchased:
          </h3>
          <ul className="divide-y divide-gray-200">
            {receipt.items?.map((item) => (
              <li
                key={item._id}
                className="flex justify-between items-center py-2"
              >
                <span className="flex-1">
                  {item.name} (x{item.qty})
                </span>
                <span className="font-medium">
                  ${(item.price * item.qty).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>

          <div className="pt-4 border-t-2 border-dashed border-gray-300">
            <div className="flex justify-between text-2xl font-bold text-indigo-700">
              <span>Final Total Paid:</span>
              <span>${receipt.finalTotal?.toFixed(2) || "0.00"}</span>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={onClose}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg transition duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReceiptModal;
