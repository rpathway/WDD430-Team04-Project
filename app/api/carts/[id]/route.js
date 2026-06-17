import {
    updateCartItem, removeCartItem
  } from "@/controllers/cartController";
  
  export async function PUT(
    request,
    { params }
  ) {
    const { id } = await params;
  
    return updateCartItem(request, id);
  }

  export async function DELETE(
    request,
    { params }
  ) {
    const { id } = await params;
  
    return removeCartItem(id);
  }