import React, { useState, useEffect, useCallback } from "react";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import CheckoutForm from "./components/CheckoutForm";
import ReceiptModal from "./components/ReceiptModal";
import { fetchCart, removeItemFromCart, addItemToCart, checkout } from "./api";
import "./index.css";

function App() {
  const [cart, setCart] = useState({});
  const [isCartLoading, setIsCartLoading] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [receipt, setReceipt] = useState(null);

  const loadCart = useCallback(async () => {
    setIsCartLoading(true);
    try {
      const res = await fetchCart();
      setCart(res.data);
    } catch (error) {
      console.error("Failed to load cart:", error);
      setCart({ items: [], subtotal: 0, shipping: 0, total: 0 });
    } finally {
      setIsCartLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  const handleRemoveItem = async (itemId) => {
    if (window.confirm("Are you sure you want to remove this item?")) {
      try {
        await removeItemFromCart(itemId);
        loadCart();
      } catch (error) {
        alert("Error removing item.");
      }
    }
  };

  const handleUpdateQuantity = async (productId, newQty) => {
    if (newQty < 1) {
      handleRemoveItem(productId);
      return;
    }

    try {
      const currentItem = cart.items.find(
        (item) => item.productId === productId
      );
      if (!currentItem) return;

      const delta = newQty - currentItem.qty;
      await addItemToCart(productId, delta);
      loadCart();
    } catch (error) {
      alert("Error updating quantity.");
    }
  };

  const handleCheckoutSubmit = async (customerDetails) => {
    try {
      const receiptData = await checkout(
        cart.items,
        cart.total,
        customerDetails
      );
      setReceipt(receiptData.data);
      setShowCheckout(false);
      loadCart();
    } catch (error) {
      alert("Checkout failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-md p-4 sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-extrabold text-indigo-600">
            Vibe Commerce
          </h1>
          <div className="relative">
            <span className="text-2xl">🛒</span>
            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
              {cart.items ? cart.items.length : 0}
            </span>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-4">Featured Products</h2>
          <ProductList onCartUpdate={loadCart} />
        </div>

        <aside className="lg:col-span-1">
          <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
          {isCartLoading ? (
            <p>Loading cart...</p>
          ) : (
            <Cart
              cart={cart}
              onRemoveItem={handleRemoveItem}
              onUpdateQuantity={handleUpdateQuantity}
              onCheckoutClick={() => setShowCheckout(true)}
            />
          )}
        </aside>
      </main>

      {showCheckout && cart.items.length > 0 && (
        <CheckoutForm
          cart={cart}
          onCheckoutSubmit={handleCheckoutSubmit}
          onClose={() => setShowCheckout(false)}
        />
      )}

      {receipt && (
        <ReceiptModal receipt={receipt} onClose={() => setReceipt(null)} />
      )}
    </div>
  );
}

export default App;
