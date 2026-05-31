import { connectDB } from '@/lib/db';
import Seller from "../models/sellerModel";

export async function getSellers() {
    try {
      await connectDB();
  
      const sellers = await Seller.find();
  
      return Response.json(sellers);
    } catch (error) {
      return Response.json(
        { message: error.message },
        { status: 500 }
      );
    }
  }

export async function getSingleSeller(id) {
    try {
      await connectDB();
  
      const seller = await Seller.findById(id);
  
      if (!seller) {
        return Response.json(
          { message: "Seller does not exist" },
          { status: 404 }
        );
      }
  
      return Response.json(seller);
  
    } catch (error) {
      return Response.json(
        { message: error.message },
        { status: 500 }
      );
    }
  };


  export async function createSellers(request) {
    try {
        await connectDB();
    
        const body = await request.json();
    
        const seller = await Seller.create(body);
    
        return Response.json(seller);
      } catch (error) {
        return Response.json(
          { message: error.message },
          { status: 500 }
        );
      }
  }

  export async function updateSeller(request, id) {
    try {
        await connectDB();

        const body = await request.json();

        const updatedSeller = await Seller.findByIdAndUpdate(id, body, { new: true });
        return Response.json(updatedSeller);
    } catch (error) {
        return Response.json(
            { message: error.message },
            { status: 500 }
        );
    };
  };

  export async function deleteSeller(id) {
    try {
        await connectDB();

        await Seller.findByIdAndDelete(id);

        return Response.json({
            message: "Seller profile deleted successfully",
          }); 
    } catch (error) {
        return Response.json(
            { message: error.message },
            { status: 500 }
        );
    }
  }