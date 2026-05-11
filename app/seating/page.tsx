"use client";

import { tables } from "@/public/tables";
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { useEffect } from "react";
import GalaxySeatingR3F from "../_components/galaxySeating";
import { isAdminEmail, isWeddingDayOrAfter } from "../lib/access";

export default function Page() {
    const { data: session, status } = useSession();
    const router = useRouter();

    const userEmail = session?.user?.email?.toLowerCase();

    const canAccessSeatingPlan =
        isAdminEmail(userEmail) || isWeddingDayOrAfter();


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
