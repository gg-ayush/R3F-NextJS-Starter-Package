'use client'

import axios from 'axios'
import { useState, useEffect } from 'react'
import { useDebouncedCallback } from 'use-debounce'

export default function GitHubCard() {
  // State for storing the username
  const [username, setUsername] = useState(() => {
    return ''
  })

  // For token input
  const [token, setToken] = useState(() => {
    return ''
  })

  // State for storing the GitHub data
  const [gitData, setGitData] = useState([])
  const [topLanguages, setTopLanguages] = useState([])
  const [mostProductiveDay, setMostProductiveDay] = useState('')
  const [starredRepo, setStarredRepo] = useState([])
  const [pullRequestsMerged, setPullRequestsMerged] = useState(0)
  const [contributionsCount, setContributionsCount] = useState(0)

  // Fetch GitHub data
  useEffect(() => {
    const fetchGitData = async () => {
      try {
        const response = await axios.get(`https://api.github.com/users/${username}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setGitData(response.data)
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }

    fetchGitData()
  }, [username, token])

  // For top 5 language
  useEffect(() => {
    if (gitData.repos_url) {
      const fetchTopLanguages = async () => {
        try {
          const response = await axios.get(gitData.repos_url, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })

          // Extract languages from repositories
          const languages = response.data.reduce((acc, repo) => {
            if (repo.language) {
              acc[repo.language] = acc[repo.language] ? acc[repo.language] + 1 : 1
            }
            return acc
          }, {})

          // Sort languages by usage count
          const sortedLanguages = Object.entries(languages)
            .sort((a, b) => b[1] - a[1])
            .map(([language, count]) => ({ language, count }))

          setTopLanguages(sortedLanguages.slice(0, 5)) // Display top 5 languages
        } catch (error) {
          console.error('Error fetching top languages:', error)
        }
      }

      fetchTopLanguages()
    }
  }, [gitData.repos_url, token])

  // Most productive day
  useEffect(() => {
    if (gitData.login) {
      const fetchActivity = async () => {
        try {
          const response = await axios.get(`https://api.github.com/users/${username}/events`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })

          // Extract the day of the week from each commit and count occurrences
          const days = response.data.reduce((acc, event) => {
            const date = new Date(event.created_at)
            const day = date.getDay()
            acc[day] = acc[day] ? acc[day] + 1 : 1
            return acc
          }, {})

          // Find the most productive day (day with the most commits)
          const mostProductive = Object.keys(days).reduce((a, b) => (days[a] > days[b] ? a : b))

          setMostProductiveDay(getDayName(mostProductive))
        } catch (error) {
          console.error('Error fetching activity:', error)
        }
      }

      fetchActivity()
    }
  }, [gitData.login, token])

  // Utility function to convert day number to name
  const getDayName = (day) => {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    return daysOfWeek[day]
  }

  // Repo Starred
  useEffect(() => {
    const fetchStarredRepo = async () => {
      try {
        const response = await axios.get(`https://api.github.com/users/${gitData.login}/starred`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        setStarredRepo(response.data)
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }

    fetchStarredRepo()
  }, [gitData, token])

  // Debounced callback function for handling input changes
  const handleChange = useDebouncedCallback((e) => {
    setUsername(e.target.value)
  }, 400) // Debounce delay of 400ms

  const handleTokenChange = useDebouncedCallback((e) => {
    setToken(e.target.value)
  }, 400) // Debounce delay of 400ms

  // Pull Requests Merged
  useEffect(() => {
    const fetchPullRequestsMerged = async () => {
      if (gitData.login) {
        try {
          const response = await axios.get(
            `https://api.github.com/search/issues?q=author:${gitData.login}+is:pr+is:merged`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          )

          setPullRequestsMerged(response.data.total_count)
        } catch (error) {
          console.error('Error fetching pull requests merged:', error)
        }
      }
    }

    fetchPullRequestsMerged()
  }, [gitData.login, token])

  // Contributions
  useEffect(() => {
    const fetchContributions = async () => {
      if (gitData.login) {
        try {
          const response = await axios.get(`https://api.github.com/users/${gitData.login}/events`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })

          const contributions = response.data.filter((event) => event.type === 'PushEvent')
          setContributionsCount(contributions.length)
        } catch (error) {
          console.error('Error fetching contributions:', error)
        }
      }
    }

    fetchContributions()
  }, [gitData.login, token])

  return (
    <>
      {/* Main content */}
      <div className='flex min-h-48 flex-col items-center justify-center px-4 md:px-8 xl:px-10'>
        {/* Card container */}
        <div className='flex flex-col justify-center rounded-2xl border border-slate-800 bg-black/10 bg-clip-padding p-11 shadow-xl shadow-purple-700 backdrop-blur-md hover:shadow-violet-500 '>
          {/* Input field */}
          <div className='flex gap-4'>
            <input
              type='text'
              placeholder='Enter your GitHub username'
              onChange={(e) => handleChange(e)}
              className='mx-auto rounded-md bg-blue-950 p-2 text-white focus:outline-none active:bg-blue-700'
            />
            <input
              type='text'
              placeholder='Enter your secret token'
              onChange={(e) => handleTokenChange(e)}
              className='mx-auto rounded-md bg-blue-950 p-2 text-white focus:outline-none active:bg-blue-700'
            />
          </div>

          {/* Display GitHub chart if username is provided */}
          {username.length !== 0 && (
            <div className='mt-10 flex justify-center'>
              <img width='1050' src={`https://ghchart.rshah.org/${username}`} alt='github chart' />
            </div>
          )}

          <div className=' flex items-center justify-center'>
            <div className='relative mt-10 overflow-x-auto rounded-lg bg-black/10'>
              <table className='flex w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400'>
                <tbody>
                  {/* Display Top 5 Languages */}
                  <tr>
                    <th scope='row' className='whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white'>
                      Top Five Languages
                    </th>
                    <td class='px-6 py-4'>
                      {topLanguages.map(({ language, count }) => (
                        <li key={language} className='mb-2'>
                          {language}: {count} repositories
                        </li>
                      ))}
                    </td>
                  </tr>
                  <tr>
                    <th scope='row' className='whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white'>
                      Pull Requests Merged
                    </th>
                    <td className='px-6 py-4'>{pullRequestsMerged}</td>
                  </tr>
                  <tr>
                    <th scope='row' className='whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white'>
                      Contributions
                    </th>
                    <td className='px-6 py-4'>{contributionsCount}</td>
                  </tr>
                  <tr>
                    <th scope='row' className='whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white'>
                      Most Productive Day
                    </th>
                    <td class='px-6 py-4'>{mostProductiveDay}</td>
                  </tr>
                </tbody>
                <tbody>
                  <tr>
                    <th scope='row' className='whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white'>
                      Public Repos
                    </th>
                    <td class='px-6 py-4'>{gitData.public_repos}</td>
                  </tr>
                  <tr>
                    <th scope='row' className='whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white'>
                      Joined
                    </th>
                    <td class='px-6 py-4'>{gitData.created_at}</td>
                  </tr>
                  <tr>
                    <th scope='row' className='whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white'>
                      Followers
                    </th>
                    <td class='px-6 py-4'>{gitData.followers}</td>
                  </tr>
                  <tr>
                    <th scope='row' className='whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white'>
                      Following
                    </th>
                    <td class='px-6 py-4'>{gitData.following}</td>
                  </tr>
                  <tr>
                    <th scope='row' className='whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white'>
                      Starred
                    </th>
                    <td class='px-6 py-4'>{starredRepo.length}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
