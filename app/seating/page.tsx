"use client";

import { tables } from "@/public/tables";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { useRouter } from 'next/navigation';
import { useEffect } from "react";
import { isAdminEmail, isEarlyAccess, isWeddingDayOrAfter } from "../lib/access";
const GalaxySeatingR3F = dynamic(() => import("../_components/galaxySeating"), { ssr: false });

export default function Page() {
    const { data: session, status } = useSession();
    const router = useRouter();

    const userEmail = session?.user?.email?.toLowerCase();

    const canAccessSeatingPlan =
        isAdminEmail(userEmail) || isWeddingDayOrAfter() || isEarlyAccess();


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
