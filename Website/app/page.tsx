import Image from 'next/image'
import { Nunito, Roboto } from 'next/font/google'
import Link from 'next/link'

const nunitoBold = Nunito({ weight: ['700'], subsets: ['latin'] })
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-24 bg-white dark:bg-gray-950">
      <div className='m-auto justify-center items-center flex flex-col'>

        <h1 className={`  text-5xl text-center my-4`}>
          <span className="text--500">Data</span>StoreHouse
        </h1>
        <div className="text-3xl text-center text-gray-600 dark:text-gray-400">
          <p>  ⚠️ The Website is under development. ⚠️ </p>
          <p>Check out our old website
            <Link className='mx-2 underline hover:text-blue-500' href="https://datash.vercel.app/">here</Link>.
          </p>
        </div>
      </div>
    </main>
  )
}
