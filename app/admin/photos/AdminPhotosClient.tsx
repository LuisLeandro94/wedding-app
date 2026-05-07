"use client";

import Starfield from "@/app/_components/starfield";
import { COLORS } from "@/app/utils/exports";
import Link from "next/link";

type Photo = {
    _id: {
        toString: () => string;
    };
    url: string;
    pathname: string;
    originalName?: string;
    guestName?: string;
    guestEmail?: string;
    contentType?: string;
    size?: number;
    status?: string;
    createdAt?: Date;
};

function formatSize(size?: number) {
    if (!size) return "—";

    const mb = size / 1024 / 1024;
    return `${mb.toFixed(1)} MB`;
}

function formatDate(date?: Date) {
    if (!date) return "";

    return new Intl.DateTimeFormat("pt-PT", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    }).format(new Date(date));
}

export default function AdminPhotosClient({
    photos,
}: {
    photos: Photo[];
}) {
    const sand = COLORS.sand;
    const space = COLORS.space;
    const white = COLORS.white;

    return (
        <div className="grid items-center justify-items-center min-h-screen p-6 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
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
                        borderColor: sand,
                        color: sand,
                        backgroundColor: "rgba(13,16,23,0.6)",
                    }}
                >
                    <span>⬅ Back</span>
                </Link>
            </div>

            <main className="relative z-10 w-full md:w-5/6 lg:w-4/5 mx-auto px-2 md:px-6 pb-24">
                <div
                    className="bg-black/30 backdrop-blur-md border rounded-2xl shadow-2xl mx-auto flex flex-col overflow-y-auto scrollbar-hide relative"
                    style={{
                        borderColor: sand,
                        height: "80vh",
                        scrollbarWidth: "none",
                        msOverflowStyle: "none",
                    }}
                >
                    <div className="px-6 md:px-10 pt-8 pb-6 text-center">
                        <p className="text-xs tracking-[0.3em] uppercase" style={{ color: sand }}>
                            Área restrita
                        </p>

                        <h1 className="mt-3 text-2xl md:text-4xl font-medium" style={{ color: sand }}>
                            Galeria de fotos
                        </h1>

                        <p className="mt-3 text-sm md:text-base max-w-2xl mx-auto" style={{ color: white }}>
                            Fotos submetidas pelos convidados.
                        </p>

                        <div className="mt-5 flex items-center justify-center">
                            <div
                                className="rounded-2xl border px-5 py-3 bg-black/30 backdrop-blur-md"
                                style={{ borderColor: sand }}
                            >
                                <span className="text-xs uppercase tracking-widest" style={{ color: sand }}>
                                    Total
                                </span>

                                <p className="text-lg font-medium" style={{ color: white }}>
                                    {photos.length} {photos.length === 1 ? "foto" : "fotos"}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 px-6 md:px-10 pb-10">
                        {photos.map((photo) => (
                            <a
                                key={photo._id.toString()}
                                href={photo.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group overflow-hidden rounded-2xl border bg-black/30 backdrop-blur-md shadow-2xl transition hover:opacity-90"
                                style={{ borderColor: sand }}
                            >
                                <div className="aspect-square overflow-hidden bg-black/40">
                                    <img
                                        src={photo.url}
                                        alt={photo.originalName || "Foto submetida"}
                                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                    />
                                </div>

                                <div className="flex flex-col gap-2 p-4">
                                    <div>
                                        <p className="text-sm font-medium truncate" style={{ color: sand }}>
                                            {photo.guestName || "Convidado"}
                                        </p>

                                        {photo.guestEmail && (
                                            <p className="text-xs truncate mt-1" style={{ color: white }}>
                                                {photo.guestEmail}
                                            </p>
                                        )}
                                    </div>

                                    <div className="flex items-center justify-between gap-3 pt-2">
                                        <span className="text-xs" style={{ color: white }}>
                                            {formatSize(photo.size)}
                                        </span>

                                        <span
                                            className="rounded-full px-3 py-1 text-xs"
                                            style={{
                                                color: space,
                                                backgroundColor: sand,
                                            }}
                                        >
                                            {photo.status || "pending"}
                                        </span>
                                    </div>

                                    {photo.createdAt && (
                                        <p className="text-[11px] pt-1" style={{ color: sand }}>
                                            {formatDate(photo.createdAt)}
                                        </p>
                                    )}
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}