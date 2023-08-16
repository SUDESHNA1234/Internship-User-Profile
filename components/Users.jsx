'use client';
import { useEffect, useState } from "react"

import Link from "next/link";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
export default function Users() {
  const { data: session } = useSession();
 
  const [users,setusers]=useState("");
 
  useEffect(() => {
    async function Getusers() {
      try {
        const response = await fetch("/api/getUser");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setusers(data);
       
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
   
    Getusers();
  }, []);
  
   
    return (
        <div class="grid grid-cols-4 gap-4">
  
  <div className="bg-white h-screen text-blue-900 border-t-4 shadow-xl rounded-lg  col-span-1/ flex flex-col justify-between ">
    <div>
      <div className="h-20 p-4">
      <a
        href="#"
        className=" p-2 hover:border-blue-900 border-2 border-transparent rounded"
      >
        My Profile
      </a>
      </div>
      <div className="h-20 p-4">
      <Link
        href="/UserConnections"
        className=" p-2 hover:bg-white hover:border-blue-900 border-2 border-transparent rounded"
      >
        My Connections
      </Link>
      </div>
      
      
    </div>
    <button
      onClick={() => signOut()}
      className="bg-white text-black font-bold px-2 py-2 mt-3"
    >
      Log Out
    </button>
  </div>

  <div class="col-span-3">


    
      <div class="bg-white  text-blue-900 border-t-4 shadow-xl rounded-lg p-8 row-span-1">
     <div>
     <span className="font-bold ">{session?.user?.email}</span>
        </div>
  </div>
      
      
      
  <div className="bg-white h-screen text-blue-900 border-t-4 shadow-xl rounded-lg p-8 row-span-2">
          <div className="flex  h-screen relative">
            {/* First flexbox */}
            <div className="bg-blue-900 p-12 w-full rounded-lg shadow-md absolute top-0 left-0">
              <div className="text-xs font-bold  text-white">My Profile</div>
             
            </div>

            {/* Second flexbox */}
            <div className="bg-white p-8 w-3/4 h-screen rounded-lg shadow-md absolute top-16 left-28 ">
            <div>
          Name: <span className="font-bold">{session?.user?.name}</span>
        </div>
        
    <div>
      <div>
        Name: <span className="font-bold">{users?.name}</span>
      </div>
      <div>
        Email: <span className="font-bold">{users?.email}</span>
      </div>
      {/* Display other user details based on schema */}
    </div>

            </div>
          </div>
        </div>
    </div>
  </div>
 


        )
}
// {users.map((user) => (
//   <div key={user.id} className="bg-blue-300 p-8 rounded-lg shadow-md">
//     <h1 className="text-2xl font-bold mb-4">
//       <Link href={`id=${user.id}`}>{user.name}</Link>
//     </h1>
//     {/* Display other user data or actions */}
//   </div>
// ))}