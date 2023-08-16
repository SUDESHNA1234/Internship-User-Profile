"use client";

import Link from "next/link";
import { useState,useEffect} from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import img from './Images/sky.jpg';

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        setError("Invalid Credentials");
        return;
      }

      router.replace("dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
   
    <div className="relative w-full h-screen">
          <Image src={img} layout="fill" className="opacity-80" />
    
          <div className="absolute inset-0 grid place-items-center">
            <div className="shadow-2xl p-6 rounded-lg border-t-4 bg-white">
              <h1 className="text-xl font-bold my-4">Enter the details</h1>
              <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                <input onChange={(event) => setEmail( event.target.value)}  type="text" placeholder="Email" />
                <input onChange={(event) => setPassword( event.target.value)}  type="password" placeholder="Password" />
                <button onClick={handleSubmit} className="bg-black text-white font-bold px-6 py-2 cursor-pointer">
                  Login
                </button>
                {error && 
              ( <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">{error}</div>)}
                <Link className="text-sm mt-3 text-right" href={"/register"}>
                  Don't have an account?
                  <span className="underline">Register</span>
                </Link>
              </form>
            </div>
          </div>
        </div>
   
    
    </>
  );
}
