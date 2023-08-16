'use client';
import { useEffect, useState } from "react"
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";
export default function UserConnections({ userId }){
  const { data: session } = useSession();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    async function getUsers() {
      try {
        const response = await fetch('/api/allusers');
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  
    getUsers();
  }, [page, limit]);
  
    const [isConnecting, setIsConnecting] = useState(false);

  const handleAddConnection = async () => {
    setIsConnecting(true);

    try {
      const res = await fetch("/api/addConnections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userIdToAdd: userId }),
      });

      if (res.ok) {
        alert("Connection added successfully");
        const form = e.target;
  form.reset();

      } else {
        const data = await res.json();
        alert(data.error);
      }
    } catch (error) {
      console.error("Error adding connection", error);
      Swal.fire({
        title: "Error",
        text: "User registration failed. Please try again later.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }

    setIsConnecting(false);
  };
  const [connections, setConnections] = useState([]);

  useEffect(() => {
    async function getConnections() {
      const response = await fetch("api/getConnections");
      const data = await response.json();
      setConnections(data.connections);
    }
    getConnections();
  }, []);

    return (
        <div class="grid grid-cols-4 gap-4">
  
       
  <div className="bg-white h-full text-blue-900 border-t-4 shadow-xl rounded-lg  col-span-1/ flex flex-col justify-between ">
    <div>
      <div className="h-20 p-4">
      <a
        href="/Users"
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
      <div className="h-20 p-4">
      <button
      onClick={() => signOut()}
      className="bg-blue-900 text-white font-bold p-4 "
    >
      Log Out
    </button>
      </div>
      
      
    </div>
   
  </div>

        <div class="col-span-3">
      
      
          
            <div class="bg-white  text-blue-900 border-t-4 shadow-xl rounded-lg p-8 row-span-1">
            
     <div>
     <span className="font-bold ">{session?.user?.email}</span>
        </div>
  </div>
      
       
            
            
            
        <div className="bg-white h-screen text-blue-900 border-t-4 shadow-xl rounded-lg p-8 row-span-2">
       
 
  <div className="bg-blue-900 p-12 w-full rounded-lg shadow-md  top-0 left-0">
    <div className="text-2xl font-bold text-white">My Connections</div>
  </div>

 
  <div className="flex flex-wrap gap-4">
 
      <ul>
        {connections?.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
      {users.length === 0 ? (
  <div>Loading...</div>
) : (
  users.map((user) => (
    <div
    key={user.id}
    className="bg-white border-t-4 shadow-xl rounded-lg p-6 w-full md:w-1/2 lg:w-1/3"
  >
    <div className="text-xl text-black mb-4">{user.name}</div>
    <div className="mb-2">
      <div className="font-bold text-black">Experience:</div>
      {user.experience.map((exp, index) => (
        <div key={index} className="pl-4">
          <div>Company: <span className="text-black">{exp.company}</span></div>
          <div>Title: <span className="text-black">{exp.title}</span></div>
        </div>
      ))}
    </div>
    <button
    onClick={handleAddConnection}
    className={`bg-blue-900 text-white px-4 py-2 rounded ${
      isConnecting ? "opacity-50 cursor-not-allowed" : ""
    }`}
  >
    {isConnecting ? "Adding..." : "Add Connection"}
  </button>
  </div>
  ))
)}
  
</div>
{/* <button onClick={() => setPage((prevPage) => prevPage - 1)}>Previous</button>
      <button onClick={() => setPage((prevPage) => prevPage + 1)}>Next</button> */}
  </div>
</div>

      
  </div>
  
 

              
        
       
      
    )
}