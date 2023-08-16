import User from "@/models/user";
import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
export  async function GET(req){
    await connectMongoDB();
   
try {
    await connectMongoDB();
    const users = await User.find({})

  
   
   return NextResponse.json(users);
    
} catch (error) {
   console.log(error);
}
}

