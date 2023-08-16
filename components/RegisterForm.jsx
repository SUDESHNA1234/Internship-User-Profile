"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState,useCallback } from "react";
import Swal from "sweetalert2";
import Image from "next/image";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

import img from './Images/sky.jpg';
export default function RegisterForm() {
  const[name ,setname]=useState("");
    const[email ,setemail]=useState("");
    const[password ,setPassword]=useState("");
    const[phone,setphone]=useState("");
    const[about,setabout]=useState("");
    const[skills ,setskills]=useState([]);
   //  const[certifications ,setcertifications]=useState([]);
  const[company,setcompany] = useState('');
  const[title,settile] = useState('');
  const[degree,setdegree] = useState('');
  const[college,setcollege] = useState('');
  const[graduationYear,setgraduationYear]=useState("");
  const [photo, setPhoto] = useState(null);
  const [error ,seterror]=useState("");
  const router = useRouter();
  // const handleSkills = (event) => {
  //   const {
  //     target: { value },
  //   } = event;
  //   setskills(
      
  //     typeof value === 'string' ? value.split(',') : value,
  //   );
  // };
     const handleSubmit=async(e) =>{
      const skillsString = skills.join(', ');
      e.preventDefault();
      const experience = [{ company, title }];
      const education = [{ degree, college, graduationYear }];
      const connections = [];



      const data = {
        name,
        email,
        password,
        phone,
        about,
        experience,
        education,
        connections
      };
      
      if(!data.name || !data.email || !data.password || !data.phone || !data.about 
         ){
         seterror("Please fill all the fields");
         return;
      }
       try {
       const res=  await fetch('api/register',{
            method: "POST",
           
            headers:{
                'Content-Type': 'application/json;charset=utf-8;',
            },
            body: JSON.stringify(data)
             }); 
       
       if(res.ok){
        alert(Swal({
          title: "Information  added Successfully",
         
          icon: "success",
           
          button:"OK"
        }));
        const form =e.target;
        form.reset();
        router.push("/");
       }
     }catch (error) {
        console.log("User registration failed")
     }
    }
    const particlesInit =useCallback(async(engine)=>{
      await loadFull(engine);
    },[])
    const particlesLoaded =useCallback(async(engine)=>{
    },[])
  return (
   <>
   <div class="grid grid-cols-4  ">
  
  <div class=" bg-white h-full text-blue-900 border-t-4 shadow-xl rounded-lg p-4 col-span-2">
    <Particles className="h-full translate-z-0 absolute"  id="tsparticles" init={particlesInit} loaded={particlesLoaded}
     options={{
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push"
          },
          onHover: {
            enable: true,
            mode: "repulse"
          },
          resize: true
        },
        modes: {
          push: {
            quantity: 4
          },
          repulse: {
            distance: 200,
            duration: 0.4
          }
        }
      },
      particles: {
        color: {
          value: "#ffffff"
        },
        links: {
          color: "#ffffff",
          distance: 150,
          enable: true,
          opacity: 0.5,
          width: 1
        },
        collisions: {
          enable: true
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce"
          },
          random: false,
          speed: 1,
          straight: false
        },
        number: {
          density: {
            enable: true,
            area: 800
          },
          value: 80
        },
        opacity: {
          value: 0.5
        },
        shape: {
          type: "circle"
        },
        size: {
          value: { min: 1, max: 5 }
        }
      },
      detectRetina: true
    }}
    />
   
  <Image src={img} alt="Register" className="w-full h-full"></Image>
  </div>

  <div class="col-span-2">

 
    <div className="shadow-2xl p-6 rounded-lg border-t-4 ">
    
        <h1 className="text-xl font-bold my-4">Create a Profile</h1>
         <form  onSubmit={handleSubmit} className="flex flex-col gap-8 ">
            <input  onChange={(event) => setname(event.target.value)} type="text" placeholder="Full name"/>
            <input onChange={(event) => setemail( event.target.value)} type="text" placeholder="Email"/>
            <input  onChange={(event) => setPassword( event.target.value)} type="password" placeholder="Password"/>
            <input onChange={(event) => setphone( event.target.value)} type="text" placeholder="Phone Number"/>
            <input   onChange={(event) => setabout( event.target.value)}type="text" placeholder="Summary"/>
            {/* <input id="skills" type="text" placeholder="Enter your skills (e.g., JavaScript, React, Node.js)"  value={skills.join(', ')}  onChange={(event) => setskills(event.target.value.split(', '))} /> */}
            <input onChange={(event) => setcompany(event.target.value)} type="text" placeholder="Company"/>
            <input onChange={(event) => settile(event.target.value)} type="text" placeholder="Title"/>
            <input onChange={(event) => setdegree(event.target.value)} type="text" placeholder="Degree"/>
            <input onChange={(event) => setcollege(event.target.value)} type="text" placeholder="College"/>
            <input onChange={(event) => setgraduationYear(event.target.value)} type="text" placeholder="Graduation Year"/>
            {/* <input type="file" onChange={(event) => setPhoto(event.target.files[0])} /> */}
             
          {/* <Link href="/"> */}
          <button className="bg-black text-white font-bold px-6 py-2 cursor-pointer">Submit</button>
          {/* </Link>   */}
            {error && 
              ( <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">{error}</div>)}
            <Link className="text-sm mt-3 text-right" href={"/"}>Already have an account?
            <span className="underline">Login</span></Link>

         </form>
    </div>
    
   
 
    
     

</div>
 
         
        </div>
   
   </>
  );
}
