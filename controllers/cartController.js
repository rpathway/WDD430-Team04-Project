import { auth } from "@/auth";
import { connectDB } from "@/lib/db";

import Cart from "@/models/cartModel";
import Product from "@/models/productModel";


// GET CURRENT USER CART

export async function getCart() {
  try {
    await connectDB();

    const session = await auth();

    if (!session) {
      return Response.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const cart = await Cart.findOne({
      user: session.user.id,
    }).populate("items.product");

    return Response.json(cart || { items: [] });
  } catch (error) {
    return Response.json(
      { message: error.message },
      { status: 500 }
    );
  }
}


// ADD TO CART

export async function addToCart(request) {
  try {
    await connectDB();

    const session = await auth();

    if (!session) {
      return Response.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { productId, quantity = 1 } =
      await request.json();

    const product =
      await Product.findById(productId);

    if (!product) {
      return Response.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    let cart = await Cart.findOne({
      user: session.user.id,
    });

    if (!cart) {
      cart = await Cart.create({
        user: session.user.id,
        items: [],
      });
    }

    const existingItem =
      cart.items.find(
        (item) =>
          item.product.toString() ===
          productId
      );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        product: productId,
        quantity,
      });
    }

    await cart.save();

    return Response.json({
      message: "Added to cart",
      cart,
    });
  } catch (error) {
    return Response.json(
      { message: error.message },
      { status: 500 }
    );
  }
}


// UPDATE CART ITEM QUANTITY

export async function updateCartItem(
  request
) {
  try {
    await connectDB();

    const session = await auth();

    if (!session) {
      return Response.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const {
      productId,
      quantity,
    } = await request.json();

    const cart = await Cart.findOne({
      user: session.user.id,
    });

    if (!cart) {
      return Response.json(
        { message: "Cart not found" },
        { status: 404 }
      );
    }

    const item = cart.items.find(
      (item) =>
        item.product.toString() ===
        productId
    );

    if (!item) {
      return Response.json(
        { message: "Item not found" },
        { status: 404 }
      );
    }

    item.quantity = quantity;

    await cart.save();

    return Response.json({
      message:
        "Cart updated successfully",
      cart,
    });
  } catch (error) {
    return Response.json(
      { message: error.message },
      { status: 500 }
    );
  }
}


// REMOVE ITEM FROM CART

export async function removeCartItem(
  request
) {
  try {
    await connectDB();

    const session = await auth();

    if (!session) {
      return Response.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { productId } =
      await request.json();

    const cart = await Cart.findOne({
      user: session.user.id,
    });

    if (!cart) {
      return Response.json(
        { message: "Cart not found" },
        { status: 404 }
      );
    }

    cart.items = cart.items.filter(
      (item) =>
        item.product.toString() !==
        productId
    );

    await cart.save();

    return Response.json({
      message:
        "Item removed successfully",
      cart,
    });
  } catch (error) {
    return Response.json(
      { message: error.message },
      { status: 500 }
    );
  }
}


// CLEAR CART

export async function clearCart() {
  try {
    await connectDB();

    const session = await auth();

    if (!session) {
      return Response.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const cart = await Cart.findOne({
      user: session.user.id,
    });

    if (!cart) {
      return Response.json(
        { message: "Cart not found" },
        { status: 404 }
      );
    }

    cart.items = [];

    await cart.save();

    return Response.json({
      message:
        "Cart cleared successfully",
    });
  } catch (error) {
    return Response.json(
      { message: error.message },
      { status: 500 }
    );
  }
}