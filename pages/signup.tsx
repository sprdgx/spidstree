import supabase from "@/utils/supabaseClient";
import Head from "next/head";
import { useState } from "react"
import { useRouter } from "next/router";



export default function SignUP () {

    const [email , setEmail] = useState <string | undefined>();
    const [password , setPassword] = useState <string | undefined>();
    const [username , setUsername] = useState <string | undefined>();

    const router = useRouter();
    async function LoggedIn () {
    router.push('/login') }

    async function signUpWithEmail() {
    try {
        if (email && password) {
        const resp = await supabase.auth.signUp({email: email, password : password,})
        if (resp.error) throw resp.error
        const userId= resp.data.user?.id
        if(userId) {
        await createUser(userId)
        console.log('user_id' , userId)
    }
}
    } catch (error){
         console.log('error:', error)
    }
}

async function createUser(userId:string) {
    try {
        const {error}= await supabase.from('users').insert({id:userId , username:username})
    } catch (error) {
        console.log('error:' , error)
    }
}

    return (
<>
        <Head>
        <title>Sign Up</title>
        <meta name="description" content="Log In To SPIDSTREE" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="https://raw.githubusercontent.com/sprdgx/Photos/main/BeASpidder.png" />
      </Head>
<div >
<h3 className=" lg:text-8xl text-6xl text-center text-blue-300 font-logo lg:mr-10 lg:mt-[5rem] mt-[8rem]">SpiDsTrEE</h3>
<h3 className=" lg:text-xl text-xl text-right text-blue-300 font-logo lg:mr-[29rem] lg:mt-1 mr-[1rem] mt-[1rem]">SignUP</h3>

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
<div className="flex">
    <div className=" mb-3 ml-3 mt-3 text-center justify-center  items-center  " data-te-input-wrapper-init>
        <h1 className="text-white font-bold ">Password Input</h1>
        <input
            type="password"
            name="password"
            className="  mt-1 border-white font-mono w-full rounded-xl py-[0.32rem] px-3 shadow-white shadow-sm"
            id="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)} />

    </div>

    <div className="relative mt-3 ml-3  justify-center  items-center " data-te-input-wrapper-init>
        <h1 className="text-white font-mono	font-bold text-center">Username</h1>
        <input
            type="text"
            name="username"
            className="  mt-1 border-white font-mono w-full rounded-xl py-[0.32rem] px-3 shadow-white shadow-sm"
            id="username"
            placeholder="ssprrdd"
            onChange={(e) => setUsername(e.target.value)} />
    </div>
</div>
    <div className=" font-mono	" onClick={signUpWithEmail}>
        <button className="bg-white w-full p-2 px-10 rounded-xl font-bold text-blue-300  my-3 shadow-white shadow-sm" >Sign Up</button>
    </div>
    <div onClick={LoggedIn}>
        <h1 className="text-xs text-white underline w-full text-right mr-[10rem] lg:mr-[18rem] mb-4 cursor-pointer">Signed Up?   </h1>
    </div>
</div>
</div>
</>
  )
}