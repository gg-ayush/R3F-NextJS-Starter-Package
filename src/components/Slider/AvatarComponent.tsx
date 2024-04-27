'use client'
import { motion } from 'framer-motion'
import { Avatar } from 'src/components/Avatar'
import { useUser } from '@/context/UserContext/UserContext'
import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import AvatarImageComponent from '../avatarImage/page'
import FormModal2 from '../FormModal/Modal2'
import Avatar_creator from '@/components/avatar-creator/avatar'

import DrawOutlineButton from '../AnimatedButton/DrawOutlineButton'

async function getAvatarById(id: string) {
  try {
    const res = await fetch(`http://localhost:3000/api/avatar/${id}`)
    if (!res.ok) {
      throw new Error('failed to fetch the avatars')
    }
    return res.json()
  } catch (error) {
    console.error(error)
  }
}

export default function AvatarComponent({ onNextButtonClick }) {
  const router = useRouter()
  const { user } = useUser()
  const [avatarsData, setAvatarsData] = useState([])

  const [isCardModalOpen, setIsCardModalOpen] = useState(false)

  const openCardModal = () => {
    setIsCardModalOpen(true)
  }

  useEffect(() => {
    const fetchAvatarsData = async () => {
      try {
        const testData = await getAvatarById(user.gg_id)
        setAvatarsData(testData)
      } catch (error) {
        console.error('Error fetching avatars data:', error)
      }
    }

    if (user) {
      fetchAvatarsData() // Fetch data only if user is available and avatarsData is empty
    }
  }, [user])

  const memoizedAvatarsData = useMemo(() => avatarsData, [avatarsData]) // Memoize the avatars data to prevent re-rendering

  return (
    <div className='mt-2 flex items-center justify-center'>
      <div
        id='avatar'
        className='relative flex h-full w-[68%] items-center justify-center rounded-3xl border  border-[#a5a4a8]/40 bg-[#F8F8F8]/10 px-10 py-4 shadow-md shadow-purple-700 backdrop-blur-md'
        style={{ minHeight: '300px' }} //Reserve space for dynamic content
      >
        <div>
          <div className='relative my-3 flex justify-center text-2xl md:text-4xl lg:my-6 lg:text-7xl'>My Avatars</div>

          {memoizedAvatarsData && memoizedAvatarsData.length != 0 ? (
            <div className='mt-8 flex flex-col justify-center md:mt-7 md:flex-row md:justify-between'>
              <div>
                <Avatar
                  modelSrc={`${avatarsData.slice(-1)[0].avatar_url}`}
                  // shadows
                  animationSrc='/male-idle-3.fbx'
                  style={{ background: 'rgb(9,20,26)', width: '400px', height: '400px' }}
                  fov={40}
                  cameraTarget={1.5}
                  cameraInitialDistance={30}
                  effects={{
                    ambientOcclusion: true,
                  }}
                />
              </div>
              <div className='flex h-fit justify-center gap-4 md:grid md:w-[50%] md:grid-cols-3'>
                <AvatarImageComponent />
              </div>
            </div>
          ) : (
            <div className='mt-8 flex flex-col justify-center md:mt-7 md:flex-row md:justify-between'>
              <Avatar
                modelSrc='https://models.readyplayer.me/658be9e8fc8bec93d06806f3.glb?morphTargets=ARKit,Eyes Extra&textureAtlas=none&lod=0'
                // shadows
                animationSrc='/male-idle-3.fbx'
                style={{ background: 'rgb(9,20,26)', width: '400px', height: '400px' }}
                fov={40}
                cameraTarget={1.5}
                cameraInitialDistance={30}
                effects={{
                  ambientOcclusion: true,
                }}
              />
              <div className='mt-5 flex justify-center md:grid md:h-fit  md:grid-cols-3 md:gap-4'>
                <AvatarImageComponent />
              </div>
            </div>
          )}

          <div className='mt-4 flex justify-center gap-x-2 md:absolute md:bottom-4 md:right-4 md:justify-end'>
            {/* <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className='rounded-2xl p-2 text-white shadow-md shadow-violet-600 backdrop-blur-xl hover:scale-105 hover:bg-violet-900'
              href='/avatar'
            >
              Create Avatar &emsp; +
            </motion.a> */}

            <DrawOutlineButton
              onClick={() => {
                setIsCardModalOpen(true)
              }}
            >
              Create Avatar &emsp; +
            </DrawOutlineButton>
            <DrawOutlineButton onClick={onNextButtonClick}>Next</DrawOutlineButton>
          </div>
          <FormModal2 show={isCardModalOpen} onclose={setIsCardModalOpen}>
            <Avatar_creator />
          </FormModal2>
        </div>
      </div>
    </div>
  )
}
