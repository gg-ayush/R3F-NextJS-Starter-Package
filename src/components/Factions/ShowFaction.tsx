import Image from 'next/image'

export default function ShowFaction({ filter }: { filter: string }) {
  const factions = [
    {
      name: 'Rohit Shrestha',
      description: 'description',
      faction: 'VAJRA',
      avatarimg:
        'https://imgs.search.brave.com/buW9tya4CqszAbLkeozF7lkb6O5wYW7bkugJuWq6McU/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pMC53/cC5jb20vdnJzY291/dC5jb20vd3AtY29u/dGVudC91cGxvYWRz/LzIwMjEvMDIvUmVh/bFBsYXllck1lRmVh/dHVyZS5wbmc_Zml0/PTgxMCw0NjImc3Ns/PTE',
    },
    {
      name: 'Ram Kumar',
      description: 'description',
      faction: 'KARMA',
      avatarimg:
        'https://imgs.search.brave.com/buW9tya4CqszAbLkeozF7lkb6O5wYW7bkugJuWq6McU/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pMC53/cC5jb20vdnJzY291/dC5jb20vd3AtY29u/dGVudC91cGxvYWRz/LzIwMjEvMDIvUmVh/bFBsYXllck1lRmVh/dHVyZS5wbmc_Zml0/PTgxMCw0NjImc3Ns/PTE',
    },
    {
      name: 'Satkar Niraula',
      description: 'description',
      faction: 'RATNA',
      avatarimg:
        'https://imgs.search.brave.com/buW9tya4CqszAbLkeozF7lkb6O5wYW7bkugJuWq6McU/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pMC53/cC5jb20vdnJzY291/dC5jb20vd3AtY29u/dGVudC91cGxvYWRz/LzIwMjEvMDIvUmVh/bFBsYXllck1lRmVh/dHVyZS5wbmc_Zml0/PTgxMCw0NjImc3Ns/PTE',
    },
    {
      name: 'Shaligram B.K.',
      description: 'description',
      faction: 'RATNA',
      avatarimg:
        'https://imgs.search.brave.com/buW9tya4CqszAbLkeozF7lkb6O5wYW7bkugJuWq6McU/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pMC53/cC5jb20vdnJzY291/dC5jb20vd3AtY29u/dGVudC91cGxvYWRz/LzIwMjEvMDIvUmVh/bFBsYXllck1lRmVh/dHVyZS5wbmc_Zml0/PTgxMCw0NjImc3Ns/PTE',
    },
    {
      name: 'Hari Bahadur',
      description: 'description',
      faction: 'VAJRA',
      avatarimg:
        'https://imgs.search.brave.com/MTrgAlI9IUNEazHqY3oTjmPK5aFCx9PFNP-9KGZL35w/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5za2V0Y2hmYWIu/Y29tL21vZGVscy8w/NDgxOGI0NWEwMmM0/NDIwYWM1YzE3OGU0/YmMwZjI5OC90aHVt/Ym5haWxzLzI5MWZi/Y2MyZTJiNTRhNWE4/MjBjMGZlNzRiMzli/YWZkLzdhZjc5MDM5/NTY5YTQ0ZmE4ZGQ1/YzhjZDFjY2NmYTA3/LmpwZWc',
    },
    {
      name: 'Rohit Shrestha',
      description: 'description',
      faction: 'BUDDHA',
      avatarimg:
        'https://imgs.search.brave.com/XRbhstNA1e7oLafHVCD8UrDlVh3_IBPHGKeS3c757cE/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5nYWxsLmNvbS93/cC1jb250ZW50L3Vw/bG9hZHMvMTIvQXZh/dGFyLVBORy1IRC1J/bWFnZS5wbmc',
    },
    {
      name: 'Ram Kumar',
      description: 'description',
      faction: 'KARMA',
      avatarimg:
        'https://imgs.search.brave.com/buW9tya4CqszAbLkeozF7lkb6O5wYW7bkugJuWq6McU/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pMC53/cC5jb20vdnJzY291/dC5jb20vd3AtY29u/dGVudC91cGxvYWRz/LzIwMjEvMDIvUmVh/bFBsYXllck1lRmVh/dHVyZS5wbmc_Zml0/PTgxMCw0NjImc3Ns/PTE',
    },
    {
      name: 'Satkar Niraula',
      description: 'description',
      faction: 'PADMA',
      avatarimg:
        'https://imgs.search.brave.com/buW9tya4CqszAbLkeozF7lkb6O5wYW7bkugJuWq6McU/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pMC53/cC5jb20vdnJzY291/dC5jb20vd3AtY29u/dGVudC91cGxvYWRz/LzIwMjEvMDIvUmVh/bFBsYXllck1lRmVh/dHVyZS5wbmc_Zml0/PTgxMCw0NjImc3Ns/PTE',
    },
    {
      name: 'Shaligram B.K.',
      description: 'description',
      faction: 'VAJRA',
      avatarimg:
        'https://imgs.search.brave.com/buW9tya4CqszAbLkeozF7lkb6O5wYW7bkugJuWq6McU/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pMC53/cC5jb20vdnJzY291/dC5jb20vd3AtY29u/dGVudC91cGxvYWRz/LzIwMjEvMDIvUmVh/bFBsYXllck1lRmVh/dHVyZS5wbmc_Zml0/PTgxMCw0NjImc3Ns/PTE',
    },
    {
      name: 'John Doe',
      description: 'description',
      faction: 'PADMA',
      avatarimg:
        'https://imgs.search.brave.com/k6UIriBBSu_f_YXaz1n3Ncap5wTcfFLPSrPW0-hnMPQ/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5za2V0Y2hmYWIu/Y29tL21vZGVscy80/OTBkZmNjODkwNjk0/YzNjYjcxMTg2OWZk/OWY5OGU0Yi90aHVt/Ym5haWxzLzE1Yjc2/YTE2MDRhOTQwMGVh/Zjc1NzdkNDgxNjI4/NTk5L2VlN2RlODdk/MmJiZjQ1ZTNiZGM4/N2QyYTE0NDE2OWUy/LmpwZWc',
    },
  ]

  const filteredFactions = filter ? factions.filter((faction) => faction.faction === filter) : factions

  return (
    <div className='flex justify-center'>
      <div className='mx-10 mt-6 grid w-[66%] grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4'>
        {filteredFactions.map((faction, index) => (
          <div
            className='flex min-w-0 flex-col items-center justify-center transition duration-500 ease-out hover:scale-105'
            key={index}
          >
            <div
              style={{
                backgroundImage: `url(${faction.avatarimg})`,
              }}
              className='h-64 w-full rounded-bl-lg rounded-tr-lg bg-purple-900/25 bg-cover bg-center shadow-md md:h-72'
            >
              <div className='flex h-full flex-col justify-between'>
                <div className='h-full rounded-tr-md bg-black/0 px-3 py-2 text-center font-bold uppercase tracking-wide text-white transition duration-300 ease-out hover:bg-black/70'>
                  <div className='flex h-full items-center justify-center opacity-0 transition duration-500 ease-out hover:opacity-100'>
                    <p>{faction.description}</p>
                  </div>
                </div>
                <div className='relative flex flex-col items-center rounded-bl-md bg-purple-950 px-3 py-2'>
                  <h1
                    className={`font-bold transition duration-300 ease-in-out ${faction.faction === 'PADMA' ? 'text-red-300' : faction.faction === 'VAJRA' ? 'text-blue-300' : faction.faction === 'RATNA' ? 'text-yellow-300' : faction.faction === 'KARMA' ? 'text-green-300' : faction.faction === 'BUDDHA' ? 'text-gray-300' : 'text-white'}`}
                  >
                    {faction.name}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
