'use client'
import { AvatarCreator, AvatarCreatorConfig, AvatarExportedEvent } from '@readyplayerme/react-avatar-creator'
import { useRouter } from 'next/navigation'

import { useState } from 'react'
import axios from 'axios'
import { useUser } from '@/context/UserContext/UserContext'

const config: AvatarCreatorConfig = {
  clearCache: false,
  bodyType: 'fullbody',
  quickStart: false,
  language: 'en',
}

const style = { width: '100%', height: '66vh', border: 'none', borderRadius: '15px' }

export default function App() {
  const [avatarUrl, setAvatarUrl] = useState('')
  const router = useRouter()
  const handleOnAvatarExported = (event: AvatarExportedEvent) => {
    router.push('/slider')
    setAvatarUrl(event.data.url)
  }

  // const { log } = console
  // const { user } = useUser()
  // const userId = user.gg_id;
  // console.log(avatarUrl)
  // console.log(user)

  // const handleSubmit = async (event) => {
  //   event.preventDefault()
  //   const submit = {
  //     avatarUrl
  //   }

  //   log('Submit: ', submit)

  //   try {
  //     const { data } = await axios({
  //       url: `/api/internal/avatar/${userId}`,
  //       method: 'PUT',
  //       data: submit,
  //     })
  //     log('Response:', data)
  //   } catch (error) {
  //     log('Error: ', error)
  //   }
  // }

  return (
    <>
      <AvatarCreator subdomain='gguser' config={config} style={style} onAvatarExported={handleOnAvatarExported} />
    </>
  )
}
