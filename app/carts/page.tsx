"use client";

import { useEffect, useState } from "react";
import Header from "../ui/header";

export default function CartPage() {
  const [cart, setCart] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadCart();
  }, []);

  async function loadCart() {
    try {
      const response = await fetch(
        "/api/carts"
      );

      const data =
        await response.json();

      setCart(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading)
    return <p>Loading cart...</p>;

  const total =
    cart?.items?.reduce(
      (sum: number, item: any) =>
        sum +
        item.product.price *
          item.quantity,
      0
    ) || 0;

  return (
    <div className="min-h-screen bg-cream-white">
      <Header />
    <main className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Shopping Cart
      </h1>

      {!cart?.items?.length ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.items.map(
            (item: any) => (
              <div
                key={
                  item.product._id
                }
                className="flex items-center justify-between border-b py-4"
              >
                <div>
                  <h3 className="font-semibold">
                    {
                      item.product
                        .title
                    }
                  </h3>

                  <p>
                    $
                    {
                      item.product
                        .price
                    }
                  </p>
                </div>

                <div>
                  Qty:
                  {
                    item.quantity
                  }
                </div>
              </div>
            )
          )}

          <div className="mt-6">
            <h2 className="text-xl font-bold">
              Total: $
              {total.toFixed(2)}
            </h2>
          </div>
        </>
      )}
    </main>
    </div>
  );
}