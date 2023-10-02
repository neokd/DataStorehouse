import Image from "next/image";
import { Nunito, Roboto } from "next/font/google";
import Link from "next/link";
import Footer from "@/components/Footer/Footer";

export default function Home() {
  return (
      <div className="h-screen flex flex-col justify-center items-center mx-4">
        <div className="hidden lg:block">
          <div className="w-16 h-16 blur rounded-full animate-bounce transition delay-500 absolute top-36 bg-amber-500 left-56"></div>
          <div className="w-16 h-16 blur rounded-full animate-bounce transition delay-500 absolute top-36 bg-white left-48"></div>
          <div className="w-16 h-16 blur rounded-full animate-bounce transition delay-500 absolute bottom-28 bg-amber-500 right-28"></div>
          <div className="w-16 h-16 blur rounded-full animate-bounce transition delay-500 absolute bottom-24 bg-white right-24"></div>
        </div>
        <div className="dark:text-white text-center lg:w-8/12 container">
          <h1 className="text-4xl lg:text-6xl mb-6 font-semibold">
            Unleash Your
            <span className="text-amber-500"> Project's Potential</span>,
            Rapidly Build Modern Applications without Leaving Your Development
            Zone!
          </h1>
          <h2 className="text-md lg:text-3xl text-gray-700 dark:text-gray-400 lg:mx-24">
            Ignite Collaboration. Empower Projects. Shape Data-driven Designs.
            Build, Collaborate, and Innovate with DataStorehouse.
          </h2>
          <div className="lg:mt-12 mt-6">
            <button className="mt-4 p-2.5 mr-4 rounded-lg text-xl bg-amber-500 shadow-lg">
              <a href="/">Getting started</a>
            </button>
            <button className="mt-4 shadow-lg">
              <div className="relative w-80 drop-shadow lg:w-[24rem] ">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                  ></svg>
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21 211-5.197-5.197m0 OA 5.196a7.5 7.5 0 0010.607 10.6072"
                  ></path>
                </div>
                <input
                  type="text"
                  className="bg-gray-50 ring-1 ring-amber-500 h-12 w-full border border-black-300 text-gray-900 text-lg rounded-lg focus:ring-amber-500 focus:border-amber-500 block  pl-10 p-2.5  dark:bg-gray-700 dark:border-amber-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-amber-500"
                  placeholder="Quick Search..."
                />
                <div className="absolute inset-y-0 right-3 flex dark:text-white/70 items-center pl-3 pointer-events-none">
                  ⌘ K
                </div>
              </div>
            </button>
          </div>
          
        </div>
        <Footer/>
      </div>
  );
}
