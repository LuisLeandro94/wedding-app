'use client'

// import { Guest, guestList } from "@/public/guestList";
import Image from "next/image";
// import { useState } from "react";
// import Countdown from "react-countdown";
import Line from "../public/Line 1.svg";
import Logo from "../public/Logo.svg";
import { CountdownTimer } from "./_components/countdown";
import Starfield from "./_components/starfield";

export default function Home() {
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
        <Image src={Logo} alt="Beige Boho Floral Logo for Custom Florist Business" />
        <Image src={Line} alt="Beige Boho Floral Logo for Custom Florist Business" className="m-auto mt-15" />
        <CountdownTimer />
        {/* <button onClick={generateQrCodes}>Generate QR Codes</button> */}
      </main>
    </div>
  );
}
