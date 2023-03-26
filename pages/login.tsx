import supabase from "@/utils/supabaseClient";
import Head from "next/head";
import { useState } from "react"
import { useRouter } from "next/router";



export default function Login () {

    const [email , setEmail] = useState <string | undefined>();
    const [password , setPassword] = useState <string | undefined>();
    const router = useRouter();


    async function signInWithEmail() {
    try {
        if (email && password) {
        const resp = await supabase.auth.signInWithPassword({email: email, password : password,})
        if (resp.error) throw resp.error
        const userId= resp.data.user?.id
        console.log('userId:' , userId)
        router.push('/logedin');
}
    } catch {
         
    }
}
 
    async function SignUpFirst () {
              router.push('/signup') 
    }

    return (
<>
        <Head>
        <title>Log In</title>
        <meta name="description" content="Log In To SPIDSTREE" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="https://raw.githubusercontent.com/sprdgx/Photos/main/isSpidder.png" />
      </Head>
<div >
<h3 className=" lg:text-8xl text-6xl text-center text-blue-300 font-logo lg:mr-10 lg:mt-[5rem] mt-[8rem]">SpiDsTrEE</h3>
<h3 className=" lg:text-xl text-xl text-right text-blue-300 font-logo lg:mr-[29rem] lg:mt-1 mr-[1rem] mt-[1rem]">LogIN</h3>

<div className=" bg-blue-300 w-10/12 lg:w-1/2 rounded-3xl flex flex-col  items-center  lg:mx-[20rem] mt-5 mx-[2rem] ">

    <div className="relative mt-3 xl:w-96 justify-center  items-center " data-te-input-wrapper-init>
        <h1 className="text-white font-mono	font-bold text-center">Email Input</h1>
        <input
            type="email"
            name="email"
            className="  mt-1 border-white font-mono w-full rounded-xl py-[0.32rem] px-3 shadow-white shadow-sm"
            id="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)} />
    </div>

    <div className=" mb-3 xl:w-96 mt-3 text-center justify-center  items-center  " data-te-input-wrapper-init>
        <h1 className="text-white font-bold ">Password Input</h1>
        <input
            type="password"
            name="password"
            className="  mt-1 border-white font-mono w-full rounded-xl py-[0.32rem] px-3 shadow-white shadow-sm"
            id="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)} />

    </div>

    <div className=" font-mono " onClick={signInWithEmail}>        
        <button className="bg-white w-full p-2 px-10 rounded-xl font-bold text-blue-300  my-3 shadow-white shadow-sm" >Log In</button>
    </div>
    <div onClick={SignUpFirst}>
        <h1 className="text-xs text-white underline w-full text-right mr-[10rem] lg:mr-[18rem] mb-4 cursor-pointer">Sign Up Here :3 </h1>
    </div>
</div>
</div>
</>
  )
}