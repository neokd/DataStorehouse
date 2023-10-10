import Image from "next/image";
import { Nunito, Roboto } from "next/font/google";
import Link from "next/link";
import Footer from "@/components/Footer/Footer";

export default function Home() {
  return (
    <div className="h-screen flex flex-col justify-center items-center mx-4">
      <div className="hidden lg:block">
        <div className="w-16 h-16 blur rounded-full animate-pulse transition delay-500 absolute top-36 bg-violet-500 left-56"></div>
        <div className="w-16 h-16 blur rounded-full animate-pulse transition delay-500 absolute top-36 bg-white left-48"></div>
        <div className="w-16 h-16 blur rounded-full animate-pulse transition delay-500 absolute bottom-28 bg-violet-600 right-28"></div>
        <div className="w-16 h-16 blur rounded-full animate-pulse transition delay-500 absolute bottom-24 bg-white right-24"></div>
      </div>
        <div className="container text-center">
          <h1 className="text-9xl blanka mb-6  tracking-wide dark:text-gray-100">DATASTOREHOUSE</h1>
          <h2 className="text-3xl  tracking-wide dark:text-gray-100">An Open Source Project for Datasets for your next AI/ML or Data Science Project</h2>
      </div>
    </div>
  );
}
