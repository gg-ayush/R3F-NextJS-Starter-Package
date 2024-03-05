import { Layout } from '@/components/dom/Layout'
import StarsCanvas from '@/components/Hero/main/StarBackground'
import Navbar from '@/components/Navbar/Navbar'
import '@/global.css'
import { UserProvider } from '@/context/UserContext/UserContext'

export const metadata = {
  title: 'Going Genius Next.js+ReactThreeFiber+Visage Starter Bundle',
  description: 'A minimal starter for Nextjs + React-three-fiber and Visage',
}
const variants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: '-100%' },
}

export const MyComponent = () => {
  const [isOpen, setIsOpen] = useState(false)
}

export default function RootLayout({ children, user }) {
  return (
    <html lang='en' className='antialiased'>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}

      <head />
      <body>
        {/* To avoid FOUT with styled-components wrap Layout with StyledComponentsRegistry https://beta.nextjs.org/docs/styling/css-in-js#styled-components */}
        {/* <StarsCanvas /> */}
        <Layout>
          <UserProvider>
            <Navbar />
            {children}
          </UserProvider>
        </Layout>
      </body>
    </html>
  )
}
