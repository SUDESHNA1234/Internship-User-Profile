'use client';
import { useEffect, useState } from "react"
import Link from "next/link";
export default function UserConnections(){
    const [users,setusers]=useState([]);
    useEffect(()=>{
          async function Getusers(){
           const response=await fetch('api/allusers');
           const data=await response.json();
           setusers(data);
       }
       Getusers();
    },[])
    return (
        <div class="grid grid-cols-4 gap-4">
  
        <div class=" bg-white h-screen text-blue-900 border-t-4 shadow-xl rounded-lg p-4 col-span-1">
        <Link href="/Users" class="p-2 hover:border-blue-900 border-2 border-transparent rounded">
            My Profile
          </Link>
         <Link href="#" class="p-2 hover:bg-white hover:border-blue-900 border-2 border-transparent rounded">
           My Connections
        </Link>
        </div>
      
        <div class="col-span-3">
      
      
          
            <div class="bg-white  text-blue-900 border-t-4 shadow-xl rounded-lg p-8 row-span-1">
           
        <a href="#" class="p-2 hover:border-blue-900 border-2 border-transparent rounded">
             My Profile
           </a>
          <a href="#" class="p-2 hover:bg-white hover:border-blue-900 border-2 border-transparent rounded">
             My Connections
           </a>
        </div>
            
            
            
        <div className="bg-white h-screen text-blue-900 border-t-4 shadow-xl rounded-lg p-8 row-span-2">
        <div className="flex flex-wrap gap-4">
            {users.map((user) => (
              <div
                key={user.id}
                className="bg-blue-300 p-8 rounded-lg shadow-md"
              >
                <h1 className="text-2xl font-bold mb-4">{user.name}</h1>
                {/* <p> {user.experience[0]}</p> */}
        
                {/* Add more user data as needed */}
              </div>
            ))}
          </div>
       
  </div>
  
 
</div>
       
               
              </div>
        
       
      
    )
}