"use client";

import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { useEffect } from "react";
import GalaxySeatingR3F from "../_components/galaxySeating";

const tables = [
    { id: "t1", name: "Andrómeda", guests: [{ id: "1", name: "João Silva" }, { id: "2", name: "Maria Silva" }] },
    { id: "t2", name: "Via Láctea", guests: [{ id: "3", name: "Carla" }, { id: "4", name: "Luís" }] },
    { id: "t3", name: "Sombrero", guests: [{ id: "5", name: "Ana" }, { id: "6", name: "Rui" }] },
    { id: "t4", name: "Triângulo", guests: [{ id: "7", name: "Pedro" }] },
];

export default function Page() {
    const { data: session, status } = useSession();
    const router = useRouter();

    const adminEmails = (process.env.NEXT_PUBLIC_ADMIN_EMAILS || "")
        .split(",")
        .map((email) => email.trim().toLowerCase())
        .filter(Boolean);

    const WEDDING_DAY = new Date("2026-07-04T00:00:00+01:00");

    const userEmail = session?.user?.email?.toLowerCase();

    const isAdmin =
        !!userEmail && adminEmails.includes(userEmail);

    const isWeddingDayOrAfter =
        new Date() >= WEDDING_DAY;

    const canAccessSeatingPlan =
        isAdmin || isWeddingDayOrAfter;


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

    return (
        <main className="min-h-screen flex items-center justify-center p-6" style={{ background: "#0D1017" }}>
            <div className="w-full max-w-6xl">
                <GalaxySeatingR3F tables={tables} />
            </div>
        </main>
    );
}
