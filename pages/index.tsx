import Head from "next/head";
import { useRouter } from "next/router";

export default function Index () {

  const router = useRouter();

  async function SignUpFirst () {
    router.push('/signup') 
}
    return (

      <>
      <Head>
        <title>SpidsTree</title>
        <meta name="description" content="Save Your Links Here " />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="https://raw.githubusercontent.com/sprdgx/Photos/main/SpidsTree.png" />
      </Head>
      <div className='bg-blue-300 w-10/12 lg:w-1/2 rounded-3xl flex flex-col  items-center pt-[1.5rem] lg:mx-[20rem] mt-[8.5rem] mx-[2rem]'>
          <h3 className=" lg:text-6xl text-3xl text-center w-full  text-white font-logo pt-3">Welcime To SpidsTrEE</h3>
          <h3 className='text-md text-black  font-mono text-center mt-3 bg-gray-200 rounded-xl py-[1rem] px-[1rem] mx-[1rem] my-[1rem]'> Share Social Media and Websites Links in One Link With SPIDSTREE</h3>
          <h3 onClick={SignUpFirst} className=" cursor-pointer lg:text-3xl text-xl text-center w-full  text-white font-mono py-[1rem] px-[1rem] mx-[1rem] my-[1rem] pt-3">Get Started By Signing Up First ^^ Click Here </h3>
      </div>
      </>
    )
}