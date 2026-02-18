'use client'

import { motion } from 'framer-motion';
import { Calendar, Check, Info, X } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';
import LoadingSpinner from '../_components/loading';
import Starfield from '../_components/starfield';
import { COLORS } from '../utils/exports';

interface RSVP {
    _id?: string;
    guests?: string;
    email?: string;
    numberOfGuests?: number;
    adults?: number;
    kids?: number;
    alergies?: string;
    note?: string;
    willBeAttending?: boolean;
}

const RSVPPage: React.FC = () => {
    const sand = COLORS.sand;
    const space = COLORS.space;
    const [decision, setDecision] = useState<"Accepted" | "Declined" | null>(null);
    const [adults, setAdults] = useState(0);
    const [kids, setKids] = useState(0);
    const [guests, setGuests] = useState("");
    const [alergies, setAlergies] = useState("");
    const [note, setNote] = useState("");
    const { data: session } = useSession();
    const [loading, setLoading] = useState(true);
    const [rsvp, setRsvp] = useState<RSVP | null>(null);

    const router = useRouter();

    const canSubmit = useMemo(() => {
        return decision !== null &&
            (adults > 0 || kids > 0) &&
            guests.trim() !== "";
    }, [decision, adults, kids, guests]);

    const handleSubmit = async (e?: React.FormEvent | React.MouseEvent) => {
        e?.preventDefault();

        const payload = {
            _id: rsvp?._id,
            guests,
            email: session?.user?.email,
            numberOfGuests: adults + kids,
            adults,
            kids,
            alergies,
            note,
            willBeAttending: decision === "Accepted",
        };

        const res = await fetch("/api/rsvp", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        })

        const data = await res.json();

        if (!res.ok) {
            console.error(data);
            return;
        }

        setRsvp(data.rsvp);

        router.push("/");
    };

    useEffect(() => {
        if (!session) {
            router.push("/");
        }

        const loadRsvp = async () => {
            const res = await fetch("/api/rsvp/me", { cache: 'no-store' });
            if (!res.ok) {
                setLoading(false);
                return;
            }

            const data = await res.json();

            if (data.exists) {
                setRsvp(data.rsvp);

                setGuests(data.rsvp.guests ?? []);
                setAdults(data.rsvp.adults ?? 0);
                setKids(data.rsvp.kids ?? 0);
                setAlergies(data.rsvp.alergies ?? "");
                setNote(data.rsvp.note ?? "");
                setDecision(data.rsvp.willBeAttending ? "Accepted" : "Declined");
            }

            setLoading(false);
        };

        loadRsvp();
    }, []);

    return (
        <div className="grid items-center justify-items-center min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            {loading ? <LoadingSpinner /> : (
                <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
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

                        <main className="relative z-10 max-w-5xl mx-auto px-6  max-h-[calc(100vh-8rem)] overflow-y-auto scrollbar-hide">
                            <motion.div
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                className="bg-black/30 backdrop-blur-md border rounded-2xl shadow-2xl mx-auto"
                                style={{ borderColor: sand }}
                            >
                                {/* Top strip with guest + table */}
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 md:p-8">
                                    <div>
                                        <h2 className="text-xl md:text-2xl font-medium" style={{ color: sand }}>
                                            Olá, {session?.user?.name}!
                                        </h2>
                                    </div>
                                </div>

                                <div className="h-px w-full" style={{ backgroundColor: sand, opacity: 0.3 }} />

                                {/* Decision section */}
                                <div className="p-6 md:p-8 grid md:grid-cols-3 gap-6">
                                    <div className="md:col-span-1">
                                        <p className="uppercase text-xs tracking-widest mb-3" style={{ color: sand, opacity: 0.8 }}>
                                            Confirma a tua presença
                                        </p>
                                        <div className="flex gap-3">
                                            <button
                                                onClick={() => setDecision("Accepted")}
                                                className={`flex-1 inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 border transition cursor-pointer hover:opacity-90 ${decision === "Accepted" ? "ring-2" : ""
                                                    }`}
                                                style={{
                                                    borderColor: sand,
                                                    color: decision === "Accepted" ? COLORS.space : sand,
                                                    backgroundColor: decision === "Accepted" ? sand : "transparent",
                                                }}
                                            >
                                                <Check size={18} /> Sim, vou!
                                            </button>
                                            <button
                                                onClick={() => setDecision("Declined")}
                                                className={`flex-1 inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 border transition cursor-pointer hover:opacity-90 ${decision === "Declined" ? "ring-2" : ""
                                                    }`}
                                                style={{ borderColor: sand, color: decision === "Declined" ? COLORS.space : sand, backgroundColor: decision === "Declined" ? sand : "transparent", }}
                                            >
                                                <X size={18} /> Não posso
                                            </button>
                                        </div>
                                        <p className="text-xs mt-3" style={{ color: "#d7c7b3" }}>
                                            Podes alterar a decisão até dia 31 de Maio.
                                        </p>
                                    </div>

                                    {/* Form fields */}
                                    <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">

                                        <label className="flex flex-col gap-2">
                                            <span className="text-xs uppercase tracking-widest" style={{ color: sand }}>
                                                Adultos
                                            </span>
                                            <input
                                                type="number"
                                                min={0}
                                                max={6}
                                                value={adults}
                                                onChange={(e) => setAdults(e.target.value === "" ? 0 : parseInt(e.target.value, 10))}
                                                className="rounded-xl px-4 py-3 bg-transparent border outline-none"
                                                style={{ borderColor: sand, color: sand }}
                                            />
                                        </label>

                                        <label className="flex flex-col gap-2">
                                            <span className="text-xs uppercase tracking-widest" style={{ color: sand }}>
                                                Crianças
                                            </span>
                                            <input
                                                type="number"
                                                min={0}
                                                max={6}
                                                value={kids}
                                                onChange={(e) => setKids(parseInt(e.target.value || "0", 10))}
                                                className="rounded-xl px-4 py-3 bg-transparent border outline-none"
                                                style={{ borderColor: sand, color: sand }}
                                            />
                                        </label>

                                        <label className="flex flex-col gap-2 md:col-span-2">
                                            <span className="text-xs uppercase tracking-widest" style={{ color: sand }}>
                                                Nome dos convidados
                                            </span>
                                            <input
                                                value={guests}
                                                onChange={(e) => setGuests(e.target.value)}

                                                className="rounded-xl px-4 py-3 bg-transparent border placeholder-opacity-60 outline-none"
                                                style={{ borderColor: sand, color: sand, caretColor: sand }}
                                            />
                                        </label>

                                        <label className="flex flex-col gap-2 md:col-span-2">
                                            <span className="text-xs uppercase tracking-widest" style={{ color: sand }}>
                                                Alergias / Intolerâncias
                                            </span>
                                            <input
                                                value={alergies}
                                                onChange={(e) => setAlergies(e.target.value)}
                                                placeholder="Ex.: glúten, lactose, frutos secos"
                                                className="rounded-xl px-4 py-3 bg-transparent border placeholder-opacity-60 outline-none"
                                                style={{ borderColor: sand, color: sand, caretColor: sand }}
                                            />
                                        </label>

                                        <label className="flex flex-col gap-2 md:col-span-2">
                                            <span className="text-xs uppercase tracking-widest" style={{ color: sand }}>
                                                <Info className="inline-block mr-2" size={14} />
                                                Nota para os noivos
                                            </span>
                                            <textarea
                                                value={note}
                                                onChange={(e) => setNote(e.target.value)}
                                                rows={3}
                                                placeholder="Deixa-nos uma mensagem (opcional)"
                                                className="rounded-xl px-4 py-3 bg-transparent border placeholder-opacity-60 outline-none"
                                                style={{ borderColor: sand, color: sand }}
                                            />
                                        </label>
                                    </div>
                                </div>

                                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-6 md:p-8">
                                    <p className="text-xs md:text-sm" style={{ color: "#d7c7b3" }}>
                                        <Calendar className="inline-block mr-2" size={14} />
                                        Data limite de confirmação: <span style={{ color: sand }} className="font-medium">31 de Maio, 2026</span>
                                    </p>
                                    <button
                                        disabled={!canSubmit}
                                        className={`rounded-2xl px-6 py-3 font-medium transition shadow-lg mx-auto md:mx-0 ${canSubmit ? "hover:-translate-y-px cursor-pointer" : "opacity-60 cursor-not-allowed"
                                            }`}
                                        style={{ backgroundColor: sand, color: space }}
                                        onClick={() =>
                                            handleSubmit()
                                        }
                                    >
                                        Confirmar
                                    </button>
                                </div>
                            </motion.div>

                        </main>
                    </>
                </main>
            )}
        </div>
    );
};

export default RSVPPage;