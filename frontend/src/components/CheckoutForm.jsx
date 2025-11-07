import React, { useState } from "react";

const CheckoutForm = ({ cart, onCheckoutSubmit, onClose }) => {
  const [customer, setCustomer] = useState({ name: "", email: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await onCheckoutSubmit(customer);
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-8 max-w-lg w-full shadow-2xl">
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-2xl font-bold">Secure Checkout</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 text-2xl"
          >
            &times;
          </button>
        </div>

        <p className="text-xl font-semibold mb-4">
          Total:{" "}
          <span className="text-green-600">${cart.total.toFixed(2)}</span>
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={customer.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={customer.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || !customer.name || !customer.email}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 rounded-md transition duration-200 disabled:bg-indigo-400"
          >
            {isLoading ? "Processing..." : `Pay $${cart.total.toFixed(2)}`}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm;
