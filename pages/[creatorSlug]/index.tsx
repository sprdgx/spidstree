import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { Key, useEffect, useState } from 'react'
import supabase from '@/utils/supabaseClient'
import ImageUploading, { ImageListType } from "react-images-uploading";
import React from 'react';
import { useRouter } from "next/router";


export default function Home() {

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const [userId, setUserId] = useState<string | undefined>();
  const [images, setImages] = useState<| any>([]);
  const [profilePictureUrl, setProfilePictureUrl] = useState<string | undefined>();
  const [title, setTitle] = useState<string | undefined>();
  const [url, setUrl] = useState<string | undefined>();
  const onChange = (
    imageList: ImageListType) => {
       setImages(imageList);
  };


  type Link = {
    title: string ,
    url : string ,
  }

  const [link, setLink] = useState<Link [] | any>();


  const router = useRouter()
  const {creatorSlug} = router.query


  useEffect(() => {
    const getUser = async () => {
      const user= await supabase.auth.getUser();
      if (user ){
        const userID= user.data.user?.id
        setIsAuthenticated(true)
        setUserId(userID)
      }
    }
    getUser(); 
  
  }, []);

  useEffect ( () => {
    const getLinks = async () =>  {
      try{ 
      const {data , error } = await supabase
      .from('links')
      .select('title , url')
      .eq('user_id' , userId)
      if (error) throw error
      setLink(data) } catch (error) {
        console.log('error' , error)
      } 
        }
    if (userId) {
      getLinks()
    }
  }, [userId])
  


  useEffect ( () => {
    const getUser = async () =>  {
      try{ 
       const {data , error } = await supabase.
      from('users').
      select('id, profile_picture_url').
      eq('username' , creatorSlug)
      if (error) throw error 
      const profilePictureUrl = data [0] ['profile_picture_url']
      const userId = data [0] ['id']
      setProfilePictureUrl (profilePictureUrl)
      setUserId (userId) } 
      catch (error) {
        console.log('error' , error)
      } 
        }
    if (creatorSlug) {
      getUser()
    }
  }, [creatorSlug])

  const AddNewLink = async () => {
    try {
       if (title && url && userId ) {
        const { data , error } = await supabase.from('links').insert({
          title : title,
          url : url,
          user_id: userId,
        })
        .select()
        if (error) throw error;
        console.log ('data' , data)
       }
    } 
    catch (error) {
      console.log ('error' , error)
    }
  }

  const UploadProfileData = async () => {
    try {
    if (images.length > 0 ) {
      const image = images [0]
      if (image.file && userId) {
        const {data , error} = await supabase.storage
        .from('public')
        .upload(`${userId}/${image.file.name}`, image.file,  {upsert: true } )
        if (error) throw error
        const resp = supabase.storage.from('public').getPublicUrl(data.path)
        const publicUrl = resp.data.publicUrl
        const UpdateUserResponse = await supabase.from('users').update({profile_picture_url: publicUrl}).eq('id' , userId)
        if (UpdateUserResponse.error) throw error
      }
    }
  } catch (error) {
    console.log('error:', error)
  }
  }

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

<div className=''>
        <div className=' 	'>
          {isAuthenticated && (
        <>
        <div className='bg-blue-300 w-10/12 lg:w-1/2 rounded-3xl flex flex-col  items-center  lg:mx-[20rem] mt-5 mx-[2rem]'>
          <h3 className=" lg:text-6xl text-5xl text-center w-full  text-white font-logo p-[2rem]">SpiDsTrEE</h3>
        </div>
        <div className='lg:flex'> 
        <>
    <div className="bg-blue-300 lg:ml-5 ml-9 lg:w-1/5 w-10/12 rounded-3xl py-[1.9rem] px-[1.9rem] mt-5 items-center">
        
        {profilePictureUrl &&
        <img
          src={profilePictureUrl}
          alt="Picture of the author"
          width={250}
          height={250}
          className="  items-center flex-col rounded-full "
        />}
      
    </div>
</>  
<div className="bg-blue-300  lg:w-1/2 rounded-3xl flex flex-col py-[3rem] w-10/12 items-center place-content-center mt-5 mx-[2rem]">
        <div className='text-3xl text-white font-mono'> • Your Links </div>
          <div> {link?.map((link: Link, index: number) =>
                <div className='bg-white mt-3 cursor-pointer text-sm w-1/8 p-2 px-10 rounded-xl font-bold text-blue-300 shadow-gray-400 shadow-lg'
                 key={index} onClick={(e) => {
                  e.preventDefault(); window.location.href = link.url
                }}>{link.title}
                </div>
                )} 
          </div>
    </div>          
        </div>
        <div className='flex mb-5'>   
        <>
         <div className="bg-blue-300  lg:w-1/2 rounded-3xl flex flex-col w-full py-[1rem] lg:ml-[20rem] items-center place-content-center mt-5 mx-[2rem]">
            <div className='text-3xl text-white font-mono text-left mt-7'> • Add A Link </div>
            <div onClick={SignUpFirst} className='text-sm text-black cursor-pointer font-mono text-center mt-3 bg-gray-200 rounded-xl py-3 px-3 mx-3'> you must sign up to be able to add you own links click here :3 unless have fun </div>
          <div className=" mt-3" data-te-input-wrapper-init>
            <h1 className="text-white font-mono	font-bold text-center">Link Title</h1>
            <input
                type="text"
                name="title"
                className="  mt-1 border-white font-mono  rounded-xl py-[0.32rem] px-3 shadow-white shadow-sm"
                placeholder="My New Link"
                onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className=" mt-3 " data-te-input-wrapper-init>
            <h1 className="text-white font-mono	font-bold text-center">Link Url</h1>
            <input
                type="text"
                name="url"
                className="  mt-1 border-white font-mono rounded-xl py-[0.32rem] px-3 shadow-white shadow-sm"
                placeholder="https://example.com/"
                onChange={(e) => setUrl(e.target.value)} />
          </div>
          <button type='button' onClick={AddNewLink} className="bg-white mt-7 mb-[2.5rem]  w-1/8 p-2 px-10 rounded-xl font-bold text-blue-300  my-3 shadow-white shadow-sm" >
            Add New Link
          </button>
        </div>
      </>
      <>
    <div className="hidden lg:inline bg-blue-300 mr-5 lg:w-1/5 rounded-3xl py-[1rem] mt-5 items-center">
        <div className="flex-col"> 
        
        { images.length > 0 && (<img className='px-3 py-3 rounded-full' src={images[0] ['data_url']} alt="" />) }

        <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={1}
        dataURLKey='data_url'
        >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps
        }: any) => (
          <div className="upload__image-wrapper  ">
            { images.length === 0 ? (<button className='bg-white p-2 px-4 text-blue-300 shadow-md rounded-lg mt-5 shadow-gray-200 ml-9' style={isDragging ? { color: "red" } : undefined} onClick={onImageUpload} {...dragProps}>Upload A Profile Picture</button>) : (
                <div className="image-item__btn-wrapper ml-2">
                  <button className='bg-green-200 p-2 px-5 text-blue-300 font-bold shadow-md rounded-lg mt-5 shadow-red-200 ml-5' onClick={onImageUpdate}>Update</button>
                  <button className='bg-red-200 p-2 px-5 text-blue-300 font-bold shadow-md rounded-lg mt-5 shadow-green-200 ml-5' onClick={onImageRemove}>Remove</button>
                </div>
            )}   
          </div>
        )}
      </ImageUploading>
      <button className='bg-white py-2 w-1/2 font-bold text-blue-300 shadow-md rounded-lg my-5 shadow-gray-200 ml-[4.2rem] '  onClick={UploadProfileData} >Upload Image</button>
      </div> 
    </div>
</>
        </div>
        </>
          )}
        </div>
</div>
     
      </>
  )
}
