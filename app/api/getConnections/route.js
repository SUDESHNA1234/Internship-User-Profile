// pages/api/getConnections.js
import { getSession } from "next-auth/react";
import { NextResponse } from "next/server";
import User from "@/models/user";
import { connectMongoDB } from "@/lib/mongodb";
export  async function GET(req){
    await connectMongoDB();
    const session = await getSession({ req });

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 404 });
    }
  
    const userId = session.user.id;
  
    try {
      const user = await User.findById(userId).populate("connections");
  
      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }
      return NextResponse.json({connections: user.connections});
    
    } catch (error) {
      console.error("Error fetching user connections:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
}


