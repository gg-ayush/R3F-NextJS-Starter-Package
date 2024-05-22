'use client'
import { motion } from 'framer-motion'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'

import { useState, useEffect } from 'react'
import { useUser } from '@/context/UserContext/UserContext'
import CardsFlipCard from '../card/cardsFlipCard'

import { TiDelete } from 'react-icons/ti'

import DrawOutlineButton from '../AnimatedButton/DrawOutlineButton'

import axios from 'axios'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import Link from 'next/link'
import { IoHome } from 'react-icons/io5'

export default function CardComponent({ onNextButtonClick, onPrevButtonClick, isSmallScreen }) {
  const { user } = useUser()
  const [cards, setCards] = useState([
    { card_id: '', type: 'type', name: '', description: '', date_in: '', date_out: '' },
  ])

  useEffect(() => {
    const fetchCardsData = async () => {
      try {
        if (user.cards.length != 0) {
          setCards(user.cards) // Set the filtered data
        }
      } catch (error) {
        console.error('Error fetching cards data:', error)
      }
    }

    if (user) {
      fetchCardsData() // Fetch data only if user is available
    }
  }, [user])

  const checkActiveCard = (element: any) => {
    return element.gg_id === user.gg_id
  }

  const handleSubmit = async (e: any, index: number) => {
    e.preventDefault()
    const submit = {
      gg_id: user.gg_id,
      type: cards[index].type,
      name: cards[index].name,
      description: cards[index].description,
      date_in: cards[index].date_in,
      date_out: cards[index].date_out,
    }
    try {
      await axios({
        url: `/api/internal/card`,
        method: 'POST',
        data: submit,
      })
      alert('card info saved')
      window.location.reload()
      return
    } catch (error) {
      console.error(error)
    }
  }

  const handleUpdate = async (e: any, id: any, index: number) => {
    e.preventDefault()
    const submit = {
      type: cards[index].type,
      name: cards[index].name,
      description: cards[index].description,
      date_in: cards[index].date_in,
      date_out: cards[index].date_out,
    }
    try {
      await axios({
        url: `/api/internal/card/${id}`,
        method: 'PUT',
        data: submit,
      })
      alert('card info updated')
      window.location.reload()
      return
    } catch (error) {
      console.error(error)
    }
  }

  const handleDelete = async (id: any) => {
    try {
      await axios({
        url: `/api/internal/card/${id}`,
        method: 'DELETE',
      })
      alert('card info deleted')
      window.location.reload()
      return
    } catch (error) {
      console.error(error)
    }
  }

  const handleCardTypeChange = (index: number, newType: string) => {
    setCards((prevCards) => {
      const updatedCards = [...prevCards]
      updatedCards[index].type = newType
      return updatedCards
    })
  }

  const handleCardNameChange = (index: number, newName: string) => {
    setCards((prevCards) => {
      const updatedCards = [...prevCards]
      updatedCards[index].name = newName
      return updatedCards
    })
  }

  const handleCardDescriptionChange = (index: number, newDescription: string) => {
    setCards((prevCards) => {
      const updatedCards = [...prevCards]
      updatedCards[index].description = newDescription
      return updatedCards
    })
  }

  const handleCardDateInChange = (index: number, newDateIn: string) => {
    setCards((prevCards) => {
      const updatedCards = [...prevCards]
      updatedCards[index].date_in = newDateIn
      return updatedCards
    })
  }

  const handleCardDateOutChange = (index: number, newDateOut: string) => {
    setCards((prevCards) => {
      const updatedCards = [...prevCards]
      updatedCards[index].date_out = newDateOut
      return updatedCards
    })
  }

  const handleAddCard = () => {
    setCards((prevCards) => [
      ...prevCards,
      { card_id: '', type: 'type', name: '', description: '', date_in: '', date_out: '' },
    ])
  }

  const handleDeleteCard = (index: number, card_id: any) => {
    setCards((prevCards) => {
      const updatedCards = [...prevCards]
      updatedCards.splice(index, 1)
      handleDelete(card_id)
      return updatedCards
    })
  }

  return (
    <div className='-ml-3 mb-12 mt-2 flex flex-col items-center md:ml-0 lg:mb-0'>
      <div
        id='card'
        className='relative flex h-[900px] w-[300px] flex-col py-4 md:w-[600px] md:rounded-3xl md:border  md:border-[#a5a4a8]/40 md:bg-[#F8F8F8]/10 md:px-10 md:shadow-inner md:shadow-purple-700/70 md:backdrop-blur-md lg:h-[550px] lg:w-[800px]'
      >
        <div className='flex w-full flex-col'>
          {/* heading */}
          <div className='relative my-3 flex justify-center text-2xl drop-shadow lg:my-5 lg:text-7xl'>
            Card
            <div className='absolute right-0 top-10 text-sm'>
              <DrawOutlineButton
                onClick={() => {
                  handleAddCard()
                }}
                aria-label='Add Card'
              >
                Add Card &emsp; +
              </DrawOutlineButton>
            </div>
          </div>

          <Tabs>
            {/* TabList */}
            <TabList className='mt-20 flex flex-col sm:flex-row sm:items-start sm:justify-start lg:my-6'>
              {cards.map((card, index) => (
                <Tab key={index} className='ml-4 flex cursor-pointer px-1'>
                  {card.type}
                  <button
                    className='ml-2 text-gray-900 hover:text-red-500'
                    onClick={() => handleDeleteCard(index, card.card_id)}
                    aria-label='Delete Card'
                  >
                    <TiDelete />
                  </button>
                </Tab>
              ))}
            </TabList>

            {/* TabPanel */}
            {cards.map((card, index) => (
              <TabPanel key={index}>
                {/* <div className='rounded-[20px] border border-[#B5B5B5] bg-[#D9D9D9]/20 p-4'> */}
                <div>
                  <div className='flex flex-col lg:flex-row lg:justify-between'>
                    {/* Card Image / Container */}

                    <div className='flex justify-center'>
                      <CardsFlipCard type={card.type} name={card.name} dateIn={card.date_in} dateOut={card.date_out} />
                    </div>

                    {/* Form for user input */}
                    <div className='w-full lg:w-[50%]'>
                      {user && checkActiveCard(card) != true ? (
                        <form
                          onSubmit={(e) => handleSubmit(e, index)}
                          className='mx-auto mt-4 flex w-full max-w-lg flex-col items-center justify-center'
                        >
                          <div className='flex w-full flex-col gap-y-2 px-4'>
                            <div className='flex flex-col lg:flex-row lg:justify-between'>
                              <label htmlFor='type'>Type</label>
                              <select
                                id='type'
                                name='type'
                                value={card.type}
                                className='rounded-md bg-white/20 px-3 lg:w-[70%]'
                                onChange={(e) => handleCardTypeChange(index, e.target.value)}
                                required
                              >
                                <option defaultValue='' className='bg-black text-gray-600'>
                                  Select Type
                                </option>
                                <option value='Educational' className='bg-black'>
                                  Educational
                                </option>
                                <option value='Work' className='bg-black'>
                                  Work
                                </option>
                                <option value='Gym' className='bg-black'>
                                  Gym
                                </option>
                              </select>
                            </div>
                            <div className='flex flex-col lg:flex-row lg:justify-between'>
                              <label htmlFor='cardName'>Card Name</label>
                              <input
                                id='cardName'
                                type='text'
                                value={card.name}
                                onChange={(e) => handleCardNameChange(index, e.target.value)}
                                placeholder='Card Name'
                                className='rounded-md bg-white/20 px-3 lg:w-[70%]'
                                required
                              />
                            </div>
                            <div className='flex flex-col lg:flex-row lg:justify-between'>
                              <label htmlFor='cardDescription'>Description</label>
                              <input
                                id='cardDescription'
                                type='text'
                                value={card.description}
                                onChange={(e) => handleCardDescriptionChange(index, e.target.value)}
                                placeholder='Card Description'
                                className='rounded-md bg-white/20 px-3  lg:w-[70%]'
                              />
                            </div>
                            <div className='flex flex-col lg:flex-row lg:justify-between'>
                              <label htmlFor='dateIn'>Date In</label>
                              <input
                                id='dateIn'
                                type='date'
                                value={card.date_in}
                                className='rounded-md bg-white/20 px-3  lg:w-[70%]'
                                onChange={(e) => handleCardDateInChange(index, e.target.value)}
                                required
                              />
                            </div>
                            <div className='flex flex-col lg:flex-row lg:justify-between'>
                              <label htmlFor='dateOut'>Date Out</label>
                              <input
                                id='dateOut'
                                type='date'
                                value={card.date_out}
                                className='rounded-md bg-white/20 px-3  lg:w-[70%]'
                                onChange={(e) => handleCardDateOutChange(index, e.target.value)}
                              />
                            </div>
                          </div>
                          {/* Submit button */}

                          {!isSmallScreen ? (
                            <>
                              <div className='mt-4'>
                                <DrawOutlineButton aria-label='generate'>Generate</DrawOutlineButton>
                              </div>

                              <div className='absolute bottom-4 right-4'>
                                <Link href='/hero3'>
                                  <button
                                    className='mr-2 rounded-full bg-purple-400/20 transition-all duration-150 hover:scale-105 hover:bg-purple-300/30'
                                    type='submit'
                                    aria-label='home btn'
                                  >
                                    <p className='p-4'>
                                      <IoHome />
                                    </p>
                                  </button>
                                </Link>
                                <button
                                  className='rounded-full bg-purple-400/20 transition-all duration-150 hover:scale-105 hover:bg-purple-300/30'
                                  type='submit'
                                  onClick={onNextButtonClick}
                                  aria-label='next'
                                >
                                  <p className='p-4'>
                                    <FaArrowRight />
                                  </p>
                                </button>
                              </div>
                            </>
                          ) : (
                            <div className='absolute bottom-4 right-4 flex gap-x-1'>
                              <Link href='/hero3'>
                                <DrawOutlineButton type='submit' onClick={onNextButtonClick} aria-label='next slide'>
                                  <IoHome className='my-1' />
                                </DrawOutlineButton>
                              </Link>
                              <DrawOutlineButton type='submit' onClick={onNextButtonClick} aria-label='next slide'>
                                Next
                              </DrawOutlineButton>
                            </div>
                          )}
                        </form>
                      ) : (
                        <form
                          onSubmit={(e) => handleUpdate(e, card.card_id, index)}
                          className='mx-auto mt-4 flex w-full max-w-lg flex-col items-center justify-center'
                        >
                          <div className='flex w-full flex-col gap-y-2 px-4'>
                            <div className='flex flex-col lg:flex-row lg:justify-between'>
                              <label htmlFor='type'>Type</label>
                              <select
                                id='type'
                                name='type'
                                value={card.type}
                                className='rounded-md bg-white/20 px-2 lg:w-[70%]'
                                onChange={(e) => handleCardTypeChange(index, e.target.value)}
                                required
                              >
                                <option defaultValue='' className='bg-black text-gray-600'>
                                  Select Type
                                </option>
                                <option value='Educational' className='bg-black'>
                                  Educational
                                </option>
                                <option value='Work' className='bg-black'>
                                  Work
                                </option>
                                <option value='Gym' className='bg-black'>
                                  Gym
                                </option>
                              </select>
                            </div>
                            <div className='flex flex-col lg:flex-row lg:justify-between'>
                              <label htmlFor='cardName'>Card Name</label>
                              <input
                                type='text'
                                id='cardName'
                                value={card.name}
                                onChange={(e) => handleCardNameChange(index, e.target.value)}
                                placeholder='Card Name'
                                className='rounded-md bg-white/20 px-3 lg:w-[70%]'
                                required
                              />
                            </div>
                            <div className='flex flex-col lg:flex-row lg:justify-between'>
                              <label htmlFor='cardDescription'>Description</label>
                              <input
                                type='text'
                                id='cardDescription'
                                value={card.description}
                                onChange={(e) => handleCardDescriptionChange(index, e.target.value)}
                                placeholder='Card Description'
                                className='rounded-md bg-white/20 px-3  lg:w-[70%]'
                              />
                            </div>
                            <div className='flex flex-col lg:flex-row lg:justify-between'>
                              <label htmlFor='dateIn'>Date In</label>
                              <input
                                type='date'
                                id='dateIn'
                                value={card.date_in}
                                className='rounded-md bg-white/20 px-3  lg:w-[70%]'
                                onChange={(e) => handleCardDateInChange(index, e.target.value)}
                                required
                              />
                            </div>
                            <div className='flex flex-col lg:flex-row lg:justify-between'>
                              <label htmlFor='dateOut'>Date Out</label>
                              <input
                                id='dateOut'
                                type='date'
                                value={card.date_out}
                                className='rounded-md bg-white/20 px-3  lg:w-[70%]'
                                onChange={(e) => handleCardDateOutChange(index, e.target.value)}
                              />
                            </div>
                          </div>

                          {/* Next and Generate Button */}
                          {!isSmallScreen ? (
                            <>
                              <div className='mt-4'>
                                <DrawOutlineButton type='submit' aria-label='generate'>
                                  Generate
                                </DrawOutlineButton>
                              </div>
                              <div className='absolute bottom-4 right-4'>
                                <Link href='/hero3'>
                                  <button
                                    className='mr-2 rounded-full bg-purple-400/20 transition-all duration-150 hover:scale-105 hover:bg-purple-300/30'
                                    type='submit'
                                    aria-label='home btn'
                                  >
                                    <p className='p-4'>
                                      <IoHome />
                                    </p>
                                  </button>
                                </Link>
                                <button
                                  className='rounded-full bg-purple-400/20 transition-all duration-150 hover:scale-105 hover:bg-purple-300/30'
                                  type='submit'
                                  onClick={onNextButtonClick}
                                  aria-label='next'
                                >
                                  <p className='p-4'>
                                    <FaArrowRight />
                                  </p>
                                </button>
                              </div>
                            </>
                          ) : (
                            <div className='absolute bottom-4 right-4 flex gap-x-1'>
                              <Link href='/hero3'>
                                <DrawOutlineButton type='submit' onClick={onNextButtonClick} aria-label='next slide'>
                                  <IoHome className='my-1' />
                                </DrawOutlineButton>
                              </Link>
                              <DrawOutlineButton type='submit' onClick={onNextButtonClick} aria-label='next slide'>
                                Next
                              </DrawOutlineButton>
                            </div>
                          )}
                        </form>
                      )}
                    </div>
                  </div>
                </div>
              </TabPanel>
            ))}
          </Tabs>

          {/* Back Button */}
          {!isSmallScreen ? (
            <div>
              <div className='absolute bottom-4 left-4 mt-4'>
                <button
                  className='rounded-full bg-purple-400/20 transition-all duration-150 hover:scale-105 hover:bg-purple-300/30'
                  onClick={onPrevButtonClick}
                  aria-label='prev'
                >
                  <p className='p-4'>
                    <FaArrowLeft />
                  </p>
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className='absolute bottom-4 left-4 mt-4'>
                <DrawOutlineButton onClick={onPrevButtonClick} aria-label='prev'>
                  Back
                </DrawOutlineButton>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
