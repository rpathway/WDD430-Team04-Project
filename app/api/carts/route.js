import {
    getCart,
    addToCart,
    clearCart
  } from "@/controllers/cartController";
  
  export async function GET() {
    return getCart();
  }
  
  export async function POST(request) {
    return addToCart(request);
  }

  export async function DELETE() {
    return clearCart();
  }