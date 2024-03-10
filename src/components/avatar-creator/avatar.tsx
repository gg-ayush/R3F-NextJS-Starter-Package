'use client'

import { AvatarCreator, AvatarCreatorConfig, AvatarExportedEvent } from '@readyplayerme/react-avatar-creator'
import { Avatar } from '@readyplayerme/visage'
import { useState } from 'react'

const config: AvatarCreatorConfig = {
  clearCache: false,
  bodyType: 'fullbody',
  quickStart: false,
  language: 'en',
}

const style = { width: '100%', height: '100vh', border: 'none' }

export default function Avatar_creator() {
  const [avatarUrl, setAvatarUrl] = useState('')
  const [showNotification, setShowNotification] = useState(false)

  const handleOnAvatarExported = (event: AvatarExportedEvent) => {
    setAvatarUrl(event.data.url)
  }

  const handleNextButtonClick = () => {
    setShowNotification(true)
  }

  const handleNotificationClose = () => {
    setShowNotification(false)
  }

  const { log } = console
  const { user } = useUser();
  // const userId = user.gg_id;
  console.log(avatarUrl)
  console.log(user)

  // const handleSubmit = async (event) => {
  //   event.preventDefault()
  //   const submit = {
  //     avatarUrl
  //   }

  //   log('Submit: ', submit)

  //   try {
  //     const { data } = await axios({
  //       url: `/api/avatar/${userId}`,
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
      {avatarUrl && <Avatar modelSrc={avatarUrl} />}
      {showNotification && (
        <div className='notification'>
          <p>Avatar URL: {avatarUrl}</p>
          <button onClick={handleNotificationClose}>Close</button>
        </div>
      )}
      <button onClick={handleNextButtonClick}>Next</button>
    </>
  )
}

