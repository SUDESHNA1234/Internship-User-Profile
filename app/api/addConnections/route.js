import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getSession } from "next-auth/react";
export async function POST(req) {
    const session = await getSession({ req });
    try {
        const { userIdToAdd } = await req.json(); // You can get the data from the request body
        await connectMongoDB();
        
        
        const userId = session?.user?.id; // Use optional chaining to prevent error
     if (!userId) {
              return NextResponse.json({ error: "User not found" }, { status: 404 });
     }



        // Check if the connection already exists
        if (userId.connections.includes(userIdToAdd)) {
          return NextResponse.json({ error: "Already connected" }, { status: 400 });
        }
        
        userId.connections.push(userIdToAdd);
        await userId.save();
    
        return NextResponse.json({ message: "Connection added successfully" }, { status: 200 });
  
    } catch (error) {
      console.error("Error in POST:", error);
      return NextResponse.json(
        { message: "An error occurred while adding the connection." },
        { status: 500 }
      );
    }
  }
  
