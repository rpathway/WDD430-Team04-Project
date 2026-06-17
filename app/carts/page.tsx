"use client";
import { useEffect, useState } from "react";
import { useCart } from '@/app/context/cartContext';

export default function CartPage() {
  const { refreshCart } = useCart();
  const [cart, setCart] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    loadCart();
  }, []);

  async function loadCart() {
    try {
      const response = await fetch("/api/carts");
      const data = await response.json();
      setCart(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }


  async function updateQuantity(productId: string, newQty: number) {
    if (newQty < 1) return;
    setUpdating(productId);
    try {
      await fetch(`/api/carts/${productId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: newQty }),
      });
      await loadCart();
      await refreshCart();
    } catch (error) {
      console.log(error);
    } finally {
      setUpdating(null);
    }
  }

  async function removeItem(productId: string) {
    setUpdating(productId);
    try {
      await fetch(`/api/carts/${productId}`, { method: "DELETE" });
      await loadCart();
      await refreshCart();
    } catch (error) {
      console.log(error);
    } finally {
      setUpdating(null);
    }
  }

  if (loading) return <p>Loading cart...</p>;

  const total =
    cart?.items?.reduce(
      (sum: number, item: any) => sum + item.product.price * item.quantity,
      0
    ) || 0;

  return (
    <main className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
      {!cart?.items?.length ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.items.map((item: any) => (
            <div
              key={item.product._id}
              className="flex items-center justify-between border-b py-4"
            >
              <div>
                <h3 className="font-semibold">{item.product.title}</h3>
                <p>${item.product.price}</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center border rounded">
                  <button
                    className="px-3 py-1 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                    disabled={updating === item.product._id || item.quantity <= 1}
                    onClick={() =>
                      updateQuantity(item.product._id, item.quantity - 1)
                    }
                  >
                    -
                  </button>
                  <span className="px-3">{item.quantity}</span>
                  <button
                    className="px-3 py-1 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                    disabled={updating === item.product._id}
                    onClick={() =>
                      updateQuantity(item.product._id, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                </div>

                <button
                  className="bg-red-600 text-white rounded-lg cursor-pointer text-sm px-3 py-1.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-none hover:bg-red-400"
                  disabled={updating === item.product._id}
                  onClick={() => removeItem(item.product._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          <div className="mt-6">
            <h2 className="text-xl font-bold">Total: ${total.toFixed(2)}</h2>
          </div>
        </>
      )}
    </main>
  );
}