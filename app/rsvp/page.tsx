'use client'
import { Guest } from '@/public/guestList';
import { motion } from 'framer-motion';
import { Calendar, Check, Info, Star, Utensils, X } from "lucide-react";
import React, { useEffect, useMemo, useState } from 'react';
import LoadingSpinner from '../_components/loading';
import Starfield from '../_components/starfield';
import { COLORS } from '../utils/exports';

const RSVPPage: React.FC = () => {
    const sand = COLORS.sand;
    const space = COLORS.space;
    const [loading, setLoading] = useState<boolean>(true);

    const [guest, setGuest] = useState<Guest | null>(null);
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [decision, setDecision] = useState<"Accepted" | "Declined" | null>(null);
    const [menu, setMenu] = useState("carne");
    const [adults, setAdults] = useState(2);
    const [kids, setKids] = useState(0);
    const [allergies, setAllergies] = useState("");
    const [note, setNote] = useState("");

    const canSubmit = useMemo(() => decision !== null, [decision]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };

    useEffect(() => {
        const user = localStorage.getItem('guest');

        if (user) {
            setGuest(JSON.parse(user));
            setLoading(false);
            console.log("hey");
        }
    }, [])

    return (
        <div className="grid items-center justify-items-center min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                {loading ? <LoadingSpinner /> : (<>

                    <Starfield />

                    <main className="relative z-10 max-w-5xl mx-auto px-6 pb-24">
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
                                        Olá, {guest?.name}!
                                    </h2>
                                </div>
                                <div className="md:text-right">
                                    <p
                                        className="text-sm uppercase tracking-widest flex items-center gap-2 justify-start md:justify-end"
                                        style={{ color: sand }}
                                    >
                                        <Star size={16} /> Mesa
                                    </p>
                                    <p className="text-lg md:text-xl font-semibold" style={{ color: sand }}>
                                        {guest?.tableName || "A designar"}
                                    </p>
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
                                        Podes alterar a decisão até à data limite.
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
                                            min={1}
                                            max={6}
                                            value={adults}
                                            onChange={(e) => setAdults(parseInt(e.target.value || "1", 10))}
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
                                            Alergias / Intolerâncias
                                        </span>
                                        <input
                                            value={allergies}
                                            onChange={(e) => setAllergies(e.target.value)}
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
                                    Data limite de RSVP: <span style={{ color: sand }} className="font-medium">31 de Maio, 2026</span>
                                </p>
                                <button
                                    disabled={!canSubmit}
                                    className={`rounded-2xl px-6 py-3 font-medium transition shadow-lg ${canSubmit ? "hover:-translate-y-px cursor-pointer" : "opacity-60 cursor-not-allowed"
                                        }`}
                                    style={{ backgroundColor: sand, color: space }}
                                    onClick={() =>
                                        alert(
                                            `Enviado! Decisão: ${decision}\nMenu: ${menu}\nAdultos: ${adults}, Crianças: ${kids}\nAlergias: ${allergies || "(nenhuma)"
                                            }`
                                        )
                                    }
                                >
                                    Confirmar
                                </button>
                            </div>
                        </motion.div>

                    </main>
                </>)}
            </main>
        </div>
    );
};

export default RSVPPage;