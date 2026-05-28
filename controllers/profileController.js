import { connectDB } from '@/lib/db';
import User from "../models/userModel";

export async function getUsers() {
    try {
      await connectDB();
  
      const users = await User.find();
  
      return Response.json(users);
    } catch (error) {
      return Response.json(
        { message: error.message },
        { status: 500 }
      );
    }
  }

export async function getSingleUser(id) {
    try {
      await connectDB();
  
      const user = await User.findById(id);
  
      if (!user) {
        return Response.json(
          { message: "User not found, Please register" },
          { status: 404 }
        );
      }
  
      return Response.json(user);
  
    } catch (error) {
      return Response.json(
        { message: error.message },
        { status: 500 }
      );
    }
  };


  export async function createUsers(request) {
    try {
        await connectDB();
    
        const body = await request.json();
    
        const user = await User.create(body);
    
        return Response.json(user);
      } catch (error) {
        return Response.json(
          { message: error.message },
          { status: 500 }
        );
      }
  }

  export async function updateUser(request, id) {
    try {
        await connectDB();

        const body = await request.json();

        const updatedUser = await User.findByIdAndUpdate(id, body, { new: true });
        return Response.json(updatedUser);
    } catch (error) {
        return Response.json(
            { message: error.message },
            { status: 500 }
        );
    };
  };

  export async function deleteUser(id) {
    try {
        await connectDB();

        await User.findByIdAndDelete(id);

        return Response.json({
            message: "User deleted successfully",
          }); 
    } catch (error) {
        return Response.json(
            { message: error.message },
            { status: 500 }
        );
    }
  }