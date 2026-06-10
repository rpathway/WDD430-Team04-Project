import {
    updateCartItem, removeCartItem
  } from "@/controllers/cartController";
  
  export async function PUT(request) {
    return updateCartItem(request);
  }

  export async function DELETE(request) {
    return removeCartItem(request);
  }