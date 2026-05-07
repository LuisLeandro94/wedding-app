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

  const WEDDING_DAY = new Date("2026-07-04T00:00:00+01:00");

  const adminEmails = (process.env.NEXT_PUBLIC_ADMIN_EMAILS || "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
  const protocolEmails = (process.env.NEXT_PUBLIC_PROTOCOL_EMAILS || "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);

  const userEmail = session?.user?.email?.toLowerCase();
  const isAdmin = !!userEmail && adminEmails.includes(userEmail);
  const isProtocol = !!userEmail && protocolEmails.includes(userEmail);
  const isWeddingDayOrAfter = new Date() >= WEDDING_DAY;

  const canAccessPhotos = isAdmin || isWeddingDayOrAfter;
  const canAccessProtocol = isProtocol || isAdmin;

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
                    Confirmações
                  </a>
                  <a onClick={() => router.push("/information")} className="cursor-pointer transition border-t-2 border-b-2 border-[#C8AB8B] hover:border-[#c8aa8b6e] py-2 px-3 sm:px-4 whitespace-nowrap">
                    Informações
                  </a>
                  <a className="pointer-events-none transition border-t-2 border-b-2 border-gray-500 py-2 px-3 sm:px-4 text-gray-500 whitespace-nowrap">
                    Mesas
                  </a>
                  {canAccessPhotos ? (
                    <a
                      onClick={() => router.push("/photos")}
                      className="cursor-pointer transition border-t-2 border-b-2 border-[#C8AB8B] hover:border-[#c8aa8b6e] py-2 px-3 sm:px-4 whitespace-nowrap"
                    >
                      Fotos
                    </a>
                  ) : (
                    <a className="pointer-events-none transition border-t-2 border-b-2 border-gray-500 py-2 px-3 sm:px-4 text-gray-500 whitespace-nowrap">
                      Fotos
                    </a>
                  )}
                  {canAccessProtocol && (
                    <a onClick={() => router.push("/protocolo")} className="cursor-pointer transition border-t-2 border-b-2 border-[#C8AB8B] hover:border-[#c8aa8b6e] py-2 px-3 sm:px-4 whitespace-nowrap">
                      Protocolo
                    </a>
                  )
                  }
                  {isAdmin && (
                    <a onClick={() => router.push("/admin/photos")} className="cursor-pointer transition border-t-2 border-b-2 border-[#C8AB8B] hover:border-[#c8aa8b6e] py-2 px-3 sm:px-4 whitespace-nowrap">
                      Galeria
                    </a>
                  )
                  }
                </div>
                <button className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-xl border backdrop-blur-sm shadow-lg transition hover:opacity-90 mt-6"
                  style={{
                    borderColor: "#C8AB8B",
                    color: "#C8AB8B",
                    backgroundColor: "rgba(13,16,23,0.6)",
                  }} onClick={() => signOut()}>
                  <span>Logout</span>
                </button>
              </>
              : <button className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-xl border backdrop-blur-sm shadow-lg transition hover:opacity-90 mt-6"
                style={{
                  borderColor: "#C8AB8B",
                  color: "#C8AB8B",
                  backgroundColor: "rgba(13,16,23,0.6)",
                }} onClick={() => signIn("google")}>
                <span>Login with Google</span>
              </button>}
          </div>
        </>
      </main>
    </div>
  );
}
