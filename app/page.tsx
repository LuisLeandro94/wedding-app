'use client'

// import { Guest, guestList } from "@/public/guestList";
import Image from "next/image";
// import { useState } from "react";
// import Countdown from "react-countdown";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Line from "../public/Line 1.svg";
import Logo from "../public/Logo.svg";
import { CountdownTimer } from "./_components/countdown";
import LoadingSpinner from "./_components/loading";
import Starfield from "./_components/starfield";
import StarTrail from "./_components/starTrail";

export default function Home() {
  const { data: session, status } = useSession();
  const [userId, setUserId] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    localStorage.getItem("userId") && setUserId(Number(localStorage.getItem("userId")));

    setLoading(false);
  }, [])

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {loading ? <LoadingSpinner /> : (<>
          <Starfield />
          <StarTrail />
          <Image src={Logo} alt="Beige Boho Floral Logo for Custom Florist Business" />
          <Image src={Line} alt="Beige Boho Floral Logo for Custom Florist Business" className="m-auto mt-4" />
          <CountdownTimer />
          <div className="mt-4 text-center text-sm sm:text-base justify-center align-middle w-full text-[#C8AB8B]">
            {session ?
              <>
                <a onClick={() => router.push("/rsvp")} className="cursor-pointer transition border-t-2 border-b-2 border-[#C8AB8B] hover:border-[#c8aa8b6e] py-2 mx-4">
                  RSVP
                </a>
                <a onClick={() => router.push("/seating")} className="cursor-pointer transition border-t-2 border-b-2 border-[#C8AB8B] hover:border-[#c8aa8b6e] py-2 mx-4">
                  Mesas
                </a>
              </>
              : <button className="px-4 py-2 border gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150" onClick={() => signIn("google")}>
                <span>Login with Google</span>
              </button>}
          </div>
        </>)}
      </main>
    </div>
  );
}
