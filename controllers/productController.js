import { connectDB } from '@/lib/db';
import Product from "../models/productModel";
import { auth } from "@/auth";

// export async function getProducts(session) {
//   try {
//     await connectDB();

//     const role = session?.user?.role;
//     const userId = session?.user?.id;

//     let products;

//     if (role === "seller") {
//       products = await Product.find({ seller: userId });
//     } else {
//       products = await Product.find();
//     }

//     return Response.json(products);
//   } catch (error) {
//     return Response.json(
//       { message: error.message },
//       { status: 500 }
//     );
//   }
// }

export async function getProducts(session, search = "") {
  try {
    await connectDB();

    const query = search
      ? { title: { $regex: search, $options: "i" } }
      : {};

    const products = await Product.find(query);
    return Response.json(products);
  } catch (error) {
    return Response.json(
      { message: error.message },
      { status: 500 }
    );
  }
}



export async function getSingleProduct(id) {
    try {
      await connectDB();
  
      const product = await Product.findById(id);
  
      if (!product) {
        return Response.json(
          { message: "Product not found" },
          { status: 404 }
        );
      }
  
      return Response.json(product);
  
    } catch (error) {
      return Response.json(
        { message: error.message },
        { status: 500 }
      );
    }
  };


  export async function createProducts(request) {
    try {
      await connectDB();
  
      const session = await auth();
  
      if (!session?.user?.id || session?.user?.role !== "seller") {
        return Response.json(
          { message: "Unauthorized" },
          { status: 401 }
        );
      }
  
      const body = await request.json();
  
      const product = await Product.create({
        ...body,
        seller: session.user.id,
      });
  
      return Response.json(product);
    } catch (error) {
      return Response.json(
        { message: error.message },
        { status: 500 }
      );
    }
  }

  export async function updateProduct(request, id) {
    try {
        await connectDB();

        const session = await auth();

        const product = await Product.findById(id);

        if (!product) {
          return Response.json({ message: "Not found" }, { status: 404 });
        }

        if (product.seller.toString() !== session.user.id) {
          return Response.json({ message: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();

        const updatedProduct = await Product.findByIdAndUpdate(id, body, { new: true });
        return Response.json(updatedProduct);
    } catch (error) {
        return Response.json(
            { message: error.message },
            { status: 500 }
        );
    };
  };

  export async function deleteProduct(id) {
    try {
        await connectDB();

        await Product.findByIdAndDelete(id);

        return Response.json({
            message: "Product deleted successfully",
          }); 
    } catch (error) {
        return Response.json(
            { message: error.message },
            { status: 500 }
        );
    }
  }