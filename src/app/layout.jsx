import './globals.css'
import Providers  from './Providers'
import 'flowbite';
//import Loading from '@/components/Spinner';
import Slidebar from '../components/Sidebar'; 
 //import dynamic from 'next/dynamic';
 //const Slidebar = dynamic(() => import('@/components/Sidebar'), { ssr: false, loading: () => <Loading/> })
export const metadata = {
  title: 'Casa Ces´s',
  description: 'POS tienda de suplementos y maquillaje',
  keywords:'tienda,POS, suplementos, maquillaje'
}

export default function RootLayout({
  children,
}) {
  return (
    <html lang="es">
      <body><Providers><div className='flex'><Slidebar/><div className='p-7 flex-1 h-screen'>{children}</div></div></Providers>
      </body>
    </html>
  )
}
