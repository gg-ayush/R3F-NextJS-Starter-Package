'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const Logo = dynamic(() => import('@/components/canvas/Examples').then((mod) => mod.Logo), { ssr: false })
const Dog = dynamic(() => import('@/components/canvas/Examples').then((mod) => mod.Dog), { ssr: false })
const Duck = dynamic(() => import('@/components/canvas/Examples').then((mod) => mod.Duck), { ssr: false })
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

export default function Page() {
  return (
    <div>
      <div className='h-screen bg-black'>
        <div className='flex h-full items-center justify-center rounded-t-3xl bg-cyan-800 p-4'>
          <form action='#' className='signup flex flex-col gap-4'>
            <div>
              <label htmlFor='password'></label>
              <input type='password' name='password' placeholder='Password' className='h-full rounded-lg p-2' />
            </div>
            <div>
              <label htmlFor='confirm-password'></label>
              <input
                type='password'
                name='confirm-password'
                placeholder='Confirm Password'
                className='h-full rounded-lg p-2'
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
