'use client';

import { NewGuest, NewTables, TABLE_LAYOUT, TableInfo } from '@/public/tables';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';
import Starfield from '../_components/starfield';
import { COLORS } from '../utils/exports';

const SeatingPlanPage: React.FC = () => {
    const { data: session } = useSession();
    const router = useRouter();

    const [search, setSearch] = useState('');
    const [selectedTable, setSelectedTable] = useState<TableInfo | null>(null);

    useEffect(() => {
        if (!session) {
            router.push('/');
        }
    }, [session, router]);

    useEffect(() => {
        document.body.style.overflow = 'auto';
        return () => {
            document.body.style.overflow = 'hidden';
        };
    }, []);

    const sand = COLORS.sand;
    const white = COLORS.white;

    const allGuests: NewGuest[] = useMemo(() => {
        return NewTables.flatMap((table) =>
            table.guests.map((guest) => ({
                name: guest,
                table: table.number,
            })),
        );
    }, []);

    const matchingGuests = useMemo(() => {
        if (!search.trim()) return [];

        return allGuests.filter((guest) =>
            guest.name.toLowerCase().includes(search.toLowerCase().trim()),
        );
    }, [search, allGuests]);

    const handleGuestClick = (guest: NewGuest) => {
        const table = NewTables.find((t) => t.number === guest.table) || null;
        setSelectedTable(table);
        setSearch('');
    };

    return (
        <div className='grid justify-items-center items-center min-[1850px]:items-start min-h-screen p-3 pb-20 sm:p-8 xl:p-20 font-[family-name:var(--font-geist-sans)]'>
            <>
                <Starfield />

                <div
                    className='pointer-events-none absolute top-4 left-4 z-60 hidden md:block'
                    style={{
                        paddingTop: 'env(safe-area-inset-top)',
                        paddingLeft: 'env(safe-area-inset-left)',
                    }}>
                    <Link
                        href='/'
                        className='pointer-events-auto inline-flex items-center gap-2 px-4 py-2 rounded-xl border backdrop-blur-sm shadow-lg transition hover:opacity-90'
                        style={{
                            borderColor: sand,
                            color: sand,
                            backgroundColor: 'rgba(13,16,23,0.6)',
                        }}>
                        <span>⬅ Back</span>
                    </Link>
                </div>

                <main className='relative z-10 w-full xl:w-3/4 mx-auto px-2 md:px-4 xl:px-6 pb-24'>
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="bg-black/30 backdrop-blur-md border rounded-2xl shadow-2xl mx-auto flex flex-col relative"
                        style={{
                            borderColor: sand,
                        }}>
                        <style jsx>{`
              .scrollbar-hide::-webkit-scrollbar {
                display: none;
              }
            `}</style>

                        <div className='text-center mt-8 mb-6 px-4 md:px-6'>
                            <h2
                                className='text-2xl sm:text-3xl md:text-5xl font-medium tracking-[0.1em] sm:tracking-[0.2em]'
                                style={{ color: sand }}>
                                PLANO DE MESAS
                            </h2>
                            <p className='mt-3 text-sm md:text-base' style={{ color: white }}>
                                Encontra o teu lugar no nosso universo.
                            </p>
                        </div>

                        <div className='px-4 md:px-6 mb-6 relative max-w-2xl mx-auto w-full'>
                            <input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder='Procura o teu nome'
                                className='w-full rounded-2xl border px-4 md:px-5 py-3 bg-black/30 outline-none text-sm md:text-base'
                                style={{
                                    borderColor: sand,
                                    color: white,
                                }}
                            />

                            {matchingGuests.length > 0 && (
                                <div
                                    className='absolute left-4 right-4 md:left-6 md:right-6 mt-2 rounded-2xl border bg-black/80 backdrop-blur-md z-30 overflow-hidden'
                                    style={{ borderColor: sand }}>
                                    {matchingGuests.map((guest) => (
                                        <button
                                            key={`${guest.name}-${guest.table}`}
                                            onClick={() => handleGuestClick(guest)}
                                            className='w-full text-left px-4 md:px-5 py-3 hover:bg-white/10 active:bg-white/20 transition text-sm md:text-base touch-manipulation'
                                            style={{ color: white }}>
                                            {guest.name}
                                            <span style={{ color: sand }}> — Mesa {guest.table}</span>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {selectedTable && (
                            <div className='px-4 md:px-6 mb-6 max-w-2xl mx-auto w-full'>
                                <motion.div
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className='border rounded-2xl p-4 md:p-6 text-center bg-black/30'
                                    style={{ borderColor: sand }}>
                                    <p className='text-sm' style={{ color: sand }}>
                                        O teu lugar
                                    </p>
                                    <h3
                                        className='text-xl md:text-2xl lg:text-3xl mt-2'
                                        style={{ color: sand }}>
                                        Mesa {selectedTable.number} — {selectedTable.name}
                                    </h3>
                                    <p className='mt-4 text-sm' style={{ color: white }}>
                                        Pessoas nesta mesa:
                                    </p>
                                    <div className='flex flex-wrap justify-center gap-2 mt-3'>
                                        {selectedTable.guests.map((guest) => (
                                            <span
                                                key={guest}
                                                className='px-3 py-1 rounded-full border text-sm'
                                                style={{ borderColor: sand, color: white }}>
                                                {guest}
                                            </span>
                                        ))}
                                    </div>
                                </motion.div>
                            </div>
                        )}

                        <div className="hidden min-[1850px]:flex justify-center px-6 pb-8">
                            <div className="w-[1200px]">
                                <motion.div
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                    className="relative w-[1200px] h-[760px] rounded-2xl border bg-black/20 overflow-hidden"
                                    style={{ borderColor: sand }}
                                >
                                    <div
                                        className='absolute border flex items-center justify-center'
                                        style={{
                                            left: '50%',
                                            top: '50%',
                                            width: '280px',
                                            height: '260px',
                                            transform: 'translate(-50%, -50%)',
                                            borderColor: sand,
                                            color: sand,
                                            background: 'rgba(0,0,0,0.15)',
                                        }}>
                                        <span className='text-2xl'>PISTA</span>
                                    </div>

                                    <div
                                        className='absolute border flex flex-col items-center justify-center'
                                        style={{
                                            left: '50%',
                                            top: '78%',
                                            width: '160px',
                                            height: '70px',
                                            transform: 'translate(-50%, -50%)',
                                            borderColor: sand,
                                            color: sand,
                                            background: 'rgba(0,0,0,0.15)',
                                        }}>
                                        <span className='text-xl'>♡</span>
                                        <span>NOIVOS</span>
                                    </div>

                                    {NewTables.map((table) => {
                                        const isSelected = selectedTable?.number === table.number;
                                        const layout = TABLE_LAYOUT[table.number];
                                        if (!layout) return null;
                                        const isLongTable = table.number === 10 || table.number === 11;

                                        return (
                                            <button
                                                key={table.number}
                                                onClick={() => setSelectedTable(table)}
                                                className='absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2 group'
                                                style={{
                                                    left: layout.left,
                                                    top: layout.top,
                                                }}>
                                                <div
                                                    className='border flex items-center justify-center transition-all duration-300 group-hover:scale-105'
                                                    style={{
                                                        width: layout.width,
                                                        height: layout.height,
                                                        borderRadius: isLongTable ? '12px' : '999px',
                                                        borderColor: sand,
                                                        color: white,
                                                        background: isSelected
                                                            ? 'radial-gradient(circle, rgba(200,171,139,0.45), rgba(0,0,0,0.25))'
                                                            : 'rgba(0,0,0,0.25)',
                                                        boxShadow: isSelected
                                                            ? `0 0 24px ${sand}`
                                                            : '0 0 12px rgba(200,171,139,0.25)',
                                                    }}>
                                                    <span style={{ fontSize: isLongTable ? '2rem' : '1.6rem' }}>
                                                        {table.number}
                                                    </span>
                                                </div>
                                                <p
                                                    className='text-center text-sm'
                                                    style={{ color: sand, maxWidth: '120px' }}>
                                                    {table.name}
                                                </p>
                                            </button>
                                        );
                                    })}
                                </motion.div>
                            </div>
                        </div>

                    </motion.div>
                </main>
            </>
        </div>
    );
};

export default SeatingPlanPage;
