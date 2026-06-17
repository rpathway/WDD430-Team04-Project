import { connectDB } from '@/lib/db';
import { auth } from "@/auth";
import User from "@/models/userModel";
import Seller from "@/models/sellerModel";
import bcrypt from "bcryptjs";

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
    const user = await User.findById(id).select("-password");
    if (!user) {
      return Response.json(
        { message: "User not found, Please register" },
        { status: 404 }
      );
    }
    return Response.json(user);
  } catch (error) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}



  export async function createUsers(request) {
    try {
        await connectDB();
    
        const body = await request.json();

        const existingUser = await User.findOne({email: body.email});

        if (existingUser) {
          return Response.json(
            { message: "User exists" },
            { status: 400 }
          );
        };

        const hashedPassword = await bcrypt.hash(body.password, 10);
    
        const user = await User.create({...body, password: hashedPassword});

        if (user.role === "seller") {
          await Seller.create({
            user: user._id,
          });
        }
    
        return Response.json(user, { status: 201 });
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
    const session = await auth();

    if (!session?.user?.id || session.user.id !== id) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    const allowedFields = ["name", "email", "profileImage"];
    const updates = {};
    for (const field of allowedFields) {
      if (body[field] !== undefined) updates[field] = body[field];
    }

    const updatedUser = await User.findByIdAndUpdate(id, updates, {
      returnDocument: "after",
    }).select("-password");

    return Response.json(updatedUser);
  } catch (error) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}

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