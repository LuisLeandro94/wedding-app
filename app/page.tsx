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
import Starfield from "./_components/starfield";
import StarTrail from "./_components/starTrail";

export default function Home() {
  const [userId, setUserId] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    localStorage.getItem("userId") && setUserId(Number(localStorage.getItem("userId")));
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
        <Starfield />
        <StarTrail />
        <Image src={Logo} alt="Beige Boho Floral Logo for Custom Florist Business" />
        <Image src={Line} alt="Beige Boho Floral Logo for Custom Florist Business" className="m-auto mt-15" />
        <CountdownTimer />
        {userId !== 0 && <button className="m-auto mt-8 rounded-md cursor-pointer before:ease relative h-12 w-40 overflow-hidden border border-(--accent) bg-(--accent) text-(--background) shadow-2xl transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:shadow-(--accent) hover:before:-translate-x-40" onClick={() => router.push("/guests/3")}>Confirmar presença</button>}
      </main>
    </div>
  );
}
