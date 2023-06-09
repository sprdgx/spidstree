import Head from "next/head";

export default function LogedIn () {
    return (
      <>
      <Head>
        <title>SpidsTree</title>
        <meta name="description" content="Save Your Links Here " />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="https://raw.githubusercontent.com/sprdgx/Photos/main/SpidsTree.png" />
      </Head>
      <div className='bg-blue-300 w-10/12 lg:w-1/2 rounded-3xl flex flex-col  items-center  lg:mx-[20rem] mt-[10rem] mx-[2rem]'>
          <h3 className=" lg:text-6xl text-5xl text-center w-full  text-white font-logo pt-[2rem]">SpiDsTrEE</h3>
          <h3 className=" lg:text-3xl text-5xl text-center w-full  text-green-300 font-logo pt-3">Thank You For Signing</h3>
          <h3 className='text-sm text-black  font-mono text-center mt-3 bg-gray-200 rounded-xl py-[1rem] lg:px-[1rem] px-[0.5rem] mx-[1rem] my-[1rem]'> For Adding Links, May Please Go To Your Generated Dashboard Which Will Contain Your Username You Chosed As A Path For Example : https://spidstree.vercel.app/username </h3>
        </div>
      </>
    )
}