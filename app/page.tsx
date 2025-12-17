'use client'

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Line from "../public/Line 1.svg";
import Logo from "../public/Logo.svg";
import { CountdownTimer } from "./_components/countdown";
import Starfield from "./_components/starfield";
import StarTrail from "./_components/starTrail";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-8 overflow-x-hidden">
      <main className="flex flex-col gap-4 sm:gap-8 items-center w-full max-w-4xl">
        <>
          <Starfield />
          <StarTrail />
          <div className="w-full max-w-md px-4">
            <Image src={Logo} alt="Luís e Carla logo" className="w-full h-auto" />
          </div>
          <Image src={Line} alt="Line" className="w-3/4 sm:w-1/2 mt-2 sm:mt-4" />
          <CountdownTimer />
          <div className="mt-4 text-center text-xs sm:text-sm md:text-base w-full text-[#C8AB8B] px-4">
            {session ?
              <>
                <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-4">
                  <a onClick={() => router.push("/rsvp")} className="cursor-pointer transition border-t-2 border-b-2 border-[#C8AB8B] hover:border-[#c8aa8b6e] py-2 px-3 sm:px-4 whitespace-nowrap">
                    RSVP
                  </a>
                  <a onClick={() => router.push("/information")} className="cursor-pointer transition border-t-2 border-b-2 border-[#C8AB8B] hover:border-[#c8aa8b6e] py-2 px-3 sm:px-4 whitespace-nowrap">
                    Informações
                  </a>
                  <a className="pointer-events-none transition border-t-2 border-b-2 border-gray-500 py-2 px-3 sm:px-4 text-gray-500 whitespace-nowrap">
                    Mesas
                  </a>
                  <a className="pointer-events-none transition border-t-2 border-b-2 border-gray-500 py-2 px-3 sm:px-4 text-gray-500 whitespace-nowrap">
                    Fotos
                  </a>
                </div>
                <button className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150" onClick={() => signOut()}>
                  <span>Logout</span>
                </button>
              </>
              : <button className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150" onClick={() => signIn("google")}>
                <span>Login with Google</span>
              </button>}
          </div>
        </>
      </main>
    </div>
  );
}
