'use client'

// import { Guest, guestList } from "@/public/guestList";
import Image from "next/image";
// import { useState } from "react";
// import Countdown from "react-countdown";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Line from "../public/Line 1.svg";
import Logo from "../public/Logo.svg";
import { CountdownTimer } from "./_components/countdown";
import LoadingSpinner from "./_components/loading";
import Starfield from "./_components/starfield";
import StarTrail from "./_components/starTrail";

export default function Home() {
  const [userId, setUserId] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    localStorage.getItem("userId") && setUserId(Number(localStorage.getItem("userId")));

    setLoading(false);
  }, [])
  // const [guests, setGuests] = useState<Guest[]>(guestList);

  // const generateQrCodes = async () => {
  //   debugger;
  //   const response = await fetch("/api", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ guests }),
  //   });

  //   if (response.ok) {
  //     const data = await response.json();
  //     setGuests(data.guests);
  //   } else {
  //     console.error("Failed to generate QR codes");
  //   }
  // }

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
            <a onClick={() => router.push("/rsvp")} className="cursor-pointer transition border-t-2 border-b-2 border-[#C8AB8B] hover:border-[#c8aa8b6e] py-2 mx-4">
              RSVP
            </a>
            <a onClick={() => router.push("/seating")} className="cursor-pointer transition border-t-2 border-b-2 border-[#C8AB8B] hover:border-[#c8aa8b6e] py-2 mx-4">
              Mesas
            </a>
          </div></>)}
      </main>
    </div>
  );
}
