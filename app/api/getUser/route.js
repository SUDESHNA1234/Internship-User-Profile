// Example API endpoint in pages/api/getUser.js
import { getSession } from "next-auth/react";



import User from "@/models/user";
import { connectMongoDB } from "@/lib/mongodb";


  
export default async function GET(req) {
  if (req.method !== "GET") {
    return NextResponse.json({ message: "Method not allowed" }, { status: 500 });
  }

  await connectMongoDB();
  const session = await getSession({ req });
  const { userId } = req.query;
  if (!session) {
    return NextResponse.json({ message: "User  not registered." }, { status: 401 });
  }
  try {
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ message: "User not found." }, { status: 401 });
    }

    return res.json(user);
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}