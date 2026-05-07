"use client";

import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import Link from "next/link";
import { useRouter } from 'next/navigation';
import React, { useEffect } from "react";
import Accordion from '../_components/accordion';
import RequestChangeButton from '../_components/requestChangeButton';
import Starfield from "../_components/starfield";
import { COLORS } from '../utils/exports';

const WeddingProtocolPage: React.FC = () => {
    const { data: session, status } = useSession();
    const router = useRouter();

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

    const canAccessSeatingPlan =
        isAdmin || isProtocol;


    useEffect(() => {
        if (status === "unauthenticated" || (status === "authenticated" && !canAccessSeatingPlan)) {
            router.push("/");
        }
    }, [status, canAccessSeatingPlan, router]);

    if (
        status === "loading" ||
        !session ||
        !canAccessSeatingPlan
    ) {
        return null;
    }

    const sand = COLORS.sand;

    return (
        <div className="grid items-center justify-items-center min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <>

                <Starfield />

                <div
                    className="pointer-events-none absolute top-4 left-4 z-60 hidden md:block"
                    style={{
                        paddingTop: "env(safe-area-inset-top)",
                        paddingLeft: "env(safe-area-inset-left)",
                    }}
                >
                    <Link
                        href="/"
                        className="pointer-events-auto inline-flex items-center gap-2 px-4 py-2 rounded-xl border backdrop-blur-sm shadow-lg transition hover:opacity-90"
                        style={{
                            borderColor: "#C8AB8B",
                            color: "#C8AB8B",
                            backgroundColor: "rgba(13,16,23,0.6)",
                        }}
                    >
                        <span>⬅ Back</span>
                    </Link>
                </div>
                <main className="relative z-10 w-full md:w-3/4 lg:w-1/2 mx-auto px-4 md:px-6 pb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="bg-black/30 backdrop-blur-md border rounded-2xl shadow-2xl mx-auto flex flex-col overflow-y-auto scrollbar-hide relative"
                        style={{
                            borderColor: sand,
                            height: '80vh',
                            scrollbarWidth: 'none', // Firefox
                            msOverflowStyle: 'none', // IE and Edge
                        }}
                    >
                        <style jsx>{`
                            .scrollbar-hide::-webkit-scrollbar {
                                display: none; /* Chrome, Safari, Opera */
                            }
                            @keyframes bounce {
                                0%, 100% { transform: translateY(0); }
                                50% { transform: translateY(8px); }
                            }
                            .scroll-indicator {
                                animation: bounce 2s infinite;
                            }
                        `}</style>

                        <div className='ml-auto mr-auto mt-6 mb-6'>
                            <h2 className="text-2xl md:text-4xl font-medium" style={{ color: sand }}>
                                Protocolo
                            </h2>
                        </div>
                        <Accordion />
                    </motion.div>
                </main>
                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 0.5 }}
                    className="scroll-indicator absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center gap-2"
                >
                    <span className="text-xs" style={{ color: sand }}>Scroll</span>
                    <div className="flex flex-col gap-1">
                        <div className="w-1 h-1 rounded-full" style={{ backgroundColor: sand, opacity: 0.6 }} />
                        <div className="w-1 h-1 rounded-full" style={{ backgroundColor: sand, opacity: 0.8 }} />
                        <div className="w-1 h-1 rounded-full" style={{ backgroundColor: sand }} />
                    </div>
                </motion.div>
                {(session && session.user) &&
                    <RequestChangeButton email={session.user.email!} />}
            </>
        </div >
    );
}

export default WeddingProtocolPage;
