
// import User from "@/models/UserRegister";
// import { NextResponse } from "next/server";
// import { ConnectDatabase } from "@/Database/mongodb";

// export default async function handler(req, res) {
//     if (req.method !== "PUT") {
//         return res.status(405).json({ message: "Method not allowed" });
//     }

//     const { id, ...userData } = req.body;

//     try {
//         await ConnectDatabase();
//         await User.findByIdAndUpdate(id, userData, { new: true });
//         return res.json({ message: "User updated successfully" });
//     } catch (error) {
//         console.error("An error occurred:", error);
//         return res.status(500).json({ message: "An error occurred" });
//     }
// }

