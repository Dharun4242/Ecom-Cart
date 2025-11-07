import React from "react";

const Cart = ({ cart, onRemoveItem, onUpdateQuantity, onCheckoutClick }) => {
  const { items = [], subtotal = 0, shipping = 0, total = 0 } = cart;

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-xl">
      <h2 className="text-3xl font-bold mb-6 border-b pb-2">
        🛒 Your Shopping Cart
      </h2>

      {items.length === 0 ? (
        <p className="text-gray-600">Your cart is currently empty.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {items.map((item) => (
              <li
                key={item._id}
                className="flex justify-between items-center border-b pb-2"
              >
                <div className="flex-1">
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    ${item.price.toFixed(2)} each
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="number"
                    min="1"
                    value={item.qty}
                    onChange={(e) =>
                      onUpdateQuantity(item.productId, parseInt(e.target.value))
                    }
                    className="w-16 text-center border rounded p-1"
                  />
                  <p className="font-bold w-20 text-right">
                    ${(item.price * item.qty).toFixed(2)}
                  </p>
                  <button
                    onClick={() => onRemoveItem(item._id)}
                    className="text-red-500 hover:text-red-700 font-bold"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 pt-4 border-t space-y-2">
            <div className="flex justify-between text-lg">
              <span>Subtotal:</span>
              <span className="font-semibold">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg">
              <span>Shipping:</span>
              <span className="font-semibold">${shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-2xl font-bold text-green-700 pt-2 border-t mt-2">
              <span>Order Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={onCheckoutClick}
            className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition duration-200"
          >
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
