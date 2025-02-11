'use client'

import styles from './generate_card.module.css'
import Image from 'next/image'
import { CardBody, CardContainer, CardItem } from '@/components/card/card'
// import { Button } from "@/components/ui/button"

import dynamic from 'next/dynamic'
import { Suspense, useState, useEffect } from 'react'
import { Avatar } from 'src/components/Avatar'

const View = dynamic(() => import('@/components/canvas/View').then((mod) => mod.View), {
  ssr: false,
  loading: () => (
    <div className='flex h-96 w-full flex-col items-center justify-center'>
      <svg className='-ml-1 mr-3 size-5 animate-spin text-black' fill='none' viewBox='0 0 24 24'>
        <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
        <path
          className='opacity-75'
          fill='currentColor'
          d='M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
        />
      </svg>
    </div>
  ),
})
const Common = dynamic(() => import('@/components/canvas/View').then((mod) => mod.Common), { ssr: false })
const Type = dynamic(() => import('@/components/canvas/Examples').then((mod) => mod.Type), { ssr: false })

const SignIn = () => {
  const [name, setName] = useState('')
  const [jobTitle, setJobTitle] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  // const [avatarData, setAvatarData] = useState([])
  // useEffect(() => {
  //   const fetchAvatars = async () => {
  //     const response = await fetch('your_api_endpoint')
  //     const data = await response.json()
  //     setAvatarData(data)
  //   }

  //   fetchAvatars()
  // }, [])
  return (
    <div className='flex min-h-screen w-full '>
      <div className='flex w-full flex-col space-y-6 bg-black pl-28 pt-5 text-white md:flex-row md:space-x-6 md:space-y-0'>
        <div className='flex flex-col justify-between space-y-8 pt-5'>
          <div>
            <h1 className='text-4xl font-bold tracking-wide'> GG Card</h1>
            <h2 className='pt-2 text-xl text-white'>Welcome!</h2>
            <p className='pt-2 text-sm text-white'>Please provide us with your information for your</p>
            <p className='text-sm text-yellow-300'>Genius Card</p>
          </div>
          <div>
            <CardContainer className='py-0 hover:shadow-3xl dark:border-none dark:hover:border-none dark:hover:shadow-3xl'>
              <CardBody className='group/card relative size-auto rounded-xl border border-black/[0.1] bg-gray-50 p-6 sm:w-[30rem] dark:border-white/[0.2] dark:bg-black dark:hover:shadow-3xl dark:hover:shadow-emerald-500/[0.1]'>
                <div className='flex'>
                  <CardItem className='mt-4 w-full'>
                    <Image
                      // key={avatarData.url}
                      // src={avatarData.url}
                      src='/aa.png'
                      height='1000'
                      width='1000'
                      className='size-full rounded-xl object-cover group-hover/card:shadow-xl'
                      alt='thumbnail'
                    />
                  </CardItem>
                  <div className='flex flex-col'>
                    <CardItem translateZ='50' className='text-2xl font-bold text-neutral-600 dark:text-white'>
                      {name}
                    </CardItem>
                    <CardItem
                      as='p'
                      translateZ='60'
                      className='mt-2 max-w-sm text-lg text-[#39ff14] dark:text-[#39ff14]'
                    >
                      {jobTitle}
                    </CardItem>
                    <CardItem
                      as='p'
                      translateZ='60'
                      className='mt-2 max-w-sm text-lg text-[#39ff14] dark:text-[#39ff14]'
                    >
                      {email}
                    </CardItem>
                    <CardItem
                      as='p'
                      translateZ='60'
                      className='mt-2 max-w-sm text-lg text-[#39ff14] dark:text-[#39ff14]'
                    >
                      {phone}
                    </CardItem>
                    <div className='mt-20 flex items-center justify-between'></div>
                  </div>
                </div>
              </CardBody>
            </CardContainer>
          </div>

          <div className={styles.container}>
            <div className='rounded-3xl bg-white p-8 text-gray-600 shadow-lg '>
              <h1 className='justify-center text-center text-3xl font-bold text-black'> Generate Your Genius Card</h1>
              <form action='' className='flex flex-col space-y-4 p-5'>
                <div>
                  <input
                    type=''
                    placeholder='Avatar ID'
                    className='mt-2 w-full rounded-md px-4 py-2 outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-yellow-300'
                  />
                </div>
                <div>
                  <input
                    type='Name'
                    placeholder='Full Name'
                    className='mt-2 w-full rounded-md px-4 py-2 outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-yellow-300'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <input
                    type='text'
                    placeholder='Job Title'
                    className='mt-2 w-full rounded-md px-4 py-2 outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-yellow-300'
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                  />
                </div>
                <div>
                  <input
                    type='address'
                    placeholder='Address'
                    className='mt-2 w-full rounded-md px-4 py-2 outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-yellow-300'
                  />
                </div>
                <div>
                  <input
                    type='text'
                    placeholder='Phone Number'
                    className='mt-2 w-full rounded-md px-4 py-2 outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-yellow-300'
                  />
                </div>

                <button className='inline-block cursor-pointer rounded-lg bg-black px-6 py-2 font-bold text-white transition duration-500 hover:scale-110'>
                  Generate
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default SignIn
