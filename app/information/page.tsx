"use client";

import { motion } from 'framer-motion';
import Link from "next/link";
import React from "react";
import Starfield from "../_components/starfield";
import { COLORS } from '../utils/exports';

const WeddingInfoPage: React.FC = () => {
    const sand = COLORS.sand;
    const space = COLORS.space;
    // ✅ Replace these constants with your real data
    const couple = "Luís & Carla";
    const dateLabel = "Sábado, 4 de Julho de 2026";
    const cityLabel = "Guimarães";

    // Example URLs (replace)
    const churchMapsUrl = "https://maps.google.com/?q=Igreja+de+S%C3%A3o+D%C3%A2maso+Guimar%C3%A3es";
    const venueMapsUrl = "https://maps.google.com/?q=Quinta+da+Felgueira+Vizela";

    return (
        <div className="grid items-center justify-items-center min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <>

                <Starfield />

                <div
                    className="pointer-events-none absolute top-4 left-4 z-[60]"
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

                <main className="relative z-10 w-1/2 mx-auto px-6 pb-24">
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
                                Informações
                            </h2>
                        </div>
                        <div className='flex flex-col lg:flex-row gap-6 px-6 pb-6'>
                            <div className="z-10 w-full lg:w-1/2">
                                <motion.div
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.1 }}
                                    className="bg-black/30 backdrop-blur-md border rounded-2xl shadow-2xl h-full"
                                    style={{ borderColor: sand }}
                                >
                                    <div className="flex flex-col justify-between gap-4 p-6 md:p-8 h-full">
                                        <div className='flex flex-col gap-2'>
                                            <h4 className='text-xl md:text-2xl' style={{ color: sand }}>
                                                Cerimónia
                                            </h4>
                                            <div className='flex flex-col gap-0'>
                                                <p className='text-l md:text-xl font-medium'>Igreja de Nespereira</p>
                                                <p className=''>Rua P. Bernardino Ribeiro Fernandes</p>
                                                <p>Guimarães</p>
                                            </div>
                                            <p>Hora: 14:00</p>

                                            <Link
                                                href="https://maps.app.goo.gl/Cd2AsYDpV2NwKkdBA"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={`cursor-pointer rounded-2xl px-6 py-3 font-medium transition shadow-lg mt-6 inline-block text-center`}
                                                style={{ color: sand, borderColor: sand, borderWidth: '2px', }}
                                            >
                                                Ver no Google Maps
                                            </Link>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                            <div className="z-10 w-full lg:w-1/2">
                                <motion.div
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.1 }}
                                    className="bg-black/30 backdrop-blur-md border rounded-2xl shadow-2xl h-full"
                                    style={{ borderColor: sand }}
                                >
                                    <div className="flex flex-col justify-between gap-4 p-6 md:p-8 h-full">
                                        <div className='flex flex-col gap-2'>
                                            <h4 className='text-xl md:text-2xl' style={{ color: sand }}>
                                                Copo de água
                                            </h4>
                                            <div className='flex flex-col gap-0'>
                                                <p className='text-l md:text-xl font-medium'>Quinta das Carpas</p>
                                                <p className=''>Rua 1 de Maio</p>
                                                <p>Brito</p>
                                            </div>
                                            <p className='text-sm'>Estacionamento disponível no local</p>
                                            <Link
                                                href="https://maps.app.goo.gl/4PtfXZ9oNRepMsdy5"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={`cursor-pointer rounded-2xl px-6 py-3 font-medium transition shadow-lg mt-6 inline-block text-center`}
                                                style={{ color: sand, borderColor: sand, borderWidth: '2px', }}
                                            >
                                                Ver no Google Maps
                                            </Link>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                        <div className='ml-auto mr-auto mt-6 mb-6 w-full px-6'>
                            <motion.div
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                className="bg-black/30 backdrop-blur-md border rounded-2xl shadow-2xl h-full"
                                style={{ borderColor: sand }}
                            >
                                <div className="flex flex-col justify-between gap-4 p-6 md:p-8 h-full text-center">
                                    <div className='flex flex-col gap-2'>
                                        <h4 className='text-xl md:text-2xl' style={{ color: sand }}>
                                            Dress code
                                        </h4>
                                        <p className=''>Para manter a harmonia visual do dia, agradecemos que evite usar as cores reservadas para os padrinhos e madrinhas.</p>
                                        <div className="mt-4 flex gap-3 justify-center mb-4">
                                            <ColorSwatch background='#c8b6a6' label="Bege" />
                                            <ColorSwatch background='#202A44' label="Azul marinho" />
                                            <ColorSwatch background='#8E6385' label="Roxo" />
                                        </div>
                                        <p className='text-sm'>Obrigado pela compreensão 🤍</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                        <div className='ml-auto mr-auto mt-6 mb-6 w-full px-6'>
                            <motion.div
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                className="bg-black/30 backdrop-blur-md border rounded-2xl shadow-2xl h-full"
                                style={{ borderColor: sand }}
                            >
                                <div className="flex flex-col justify-between gap-4 p-6 md:p-8 h-full text-center">
                                    <div className='flex flex-col gap-2'>
                                        <h4 className='text-xl md:text-2xl' style={{ color: sand }}>
                                            Confirmações
                                        </h4>
                                        <p className=''>Relembramos por favor, para confirmares a tua presença até dia 31 de Maio de 2026</p>
                                        <Link
                                            href="/rsvp"
                                            className={`cursor-pointer rounded-2xl px-6 py-3 font-medium transition shadow-lg mt-6 inline-block text-center`}
                                            style={{ backgroundColor: sand, color: space, borderColor: sand, borderWidth: '2px', }}
                                        >
                                            Confirma a tua presença
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                        <div className='ml-auto mr-auto mt-6 mb-6 px-6'>
                            <motion.div
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                className="bg-black/30 backdrop-blur-md border rounded-2xl shadow-2xl h-full"
                                style={{ borderColor: sand }}
                            >
                                <div className="flex flex-col justify-between gap-4 p-6 md:p-8 h-full text-center">
                                    <div className='flex flex-col gap-2'>
                                        <h4 className='text-xl md:text-2xl' style={{ color: sand }}>
                                            Programa
                                        </h4>
                                        <div className="flex flex-col gap-4 mt-4">
                                            <TimelineItem time="14:00" event="Cerimónia" />
                                        </div>

                                    </div>
                                </div>
                            </motion.div>
                        </div>
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
            </>
        </div >
    );
}

function ColorSwatch({ label, background }: { label: string, background: string }) {
    return (
        <div className="flex items-center gap-3 flex-col">
            <div
                className="h-8 w-8 rounded-full border shadow-sm"
                style={{
                    background: background,
                    borderColor: COLORS.sand,
                }}
            />
            <div className="text-sm" style={{ color: "var(--foreground)" }}>
                {label}
            </div>
        </div>
    );
}

function TimelineItem({ time, event }: { time: string; event: string }) {
    return (
        <div className="relative flex items-center justify-center gap-4 group py-2">
            {/* Time on the left */}
            <div className="text-sm font-medium text-left" style={{ color: COLORS.sand }}>
                {time}
            </div>

            {/* Ring indicator */}
            <div className="mr-auto relative flex items-center justify-center shrink-0">
                {/* Outer glow ring */}
                <div
                    className="absolute h-6 w-6 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300"
                    style={{ backgroundColor: COLORS.sand }}
                />
                {/* Middle ring */}
                <div
                    className="absolute h-4 w-4 rounded-full border-2 opacity-60"
                    style={{ borderColor: COLORS.sand }}
                />
                {/* Inner core - like a star */}
                <div
                    className="h-2 w-2 rounded-full shadow-lg group-hover:scale-125 transition-transform duration-300"
                    style={{
                        backgroundColor: COLORS.sand,
                        boxShadow: `0 0 8px ${COLORS.sand}, 0 0 12px ${COLORS.sand}40`
                    }}
                />
            </div>

            {/* Event name on the right */}
            <div className="text-sm text-left flex-1 group-hover:translate-x-1 transition-transform duration-300">
                {event}
            </div>

        </div>
    );
}

export default WeddingInfoPage;
