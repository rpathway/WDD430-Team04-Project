import { connectDB } from '@/lib/db';
import User from "../models/userModel";

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