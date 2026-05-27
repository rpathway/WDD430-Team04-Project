import { connectDB } from '@/lib/db';
import Product from "../models/productModel";

export async function getProducts() {
    try {
      await connectDB();
  
      const products = await Product.find();
  
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
    
        const body = await request.json();
    
        const product = await Product.create(body);
    
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