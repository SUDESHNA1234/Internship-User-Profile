// pages/api/getUser.js

import { getSession } from "next-auth/react";
import User from "@/models/user";
import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export  async function GET(req) {
  try {
    await connectMongoDB();
    const session = await getSession({ req });

    if (!session) {
      return NextResponse.json(
        { message: "User not registered." },
        { status: 401 }
      );
    }

     const userId = session.user.email;
      
    const user = await User.findById({userId });

    if (!user) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    } 
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
