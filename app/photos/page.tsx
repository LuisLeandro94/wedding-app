"use client";

import { upload } from "@vercel/blob/client";
import imageCompression from "browser-image-compression";
import { motion } from "framer-motion";
import { Camera } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Starfield from "../_components/starfield";
import { isAdminEmail, isWeddingDayOrAfter } from "../lib/access";
import { COLORS } from "../utils/exports";

const MAX_FILE_SIZE = 25 * 1024 * 1024;

export default function PhotosPage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState("");
    const [progressText, setProgressText] = useState("");

    const sand = COLORS.sand;
    const space = COLORS.space;
    const white = COLORS.white;

    const userEmail = session?.user?.email?.toLowerCase();

    const hasPhotoAccess = isAdminEmail(userEmail) || isWeddingDayOrAfter();

    useEffect(() => {
        if (
            status === "unauthenticated" ||
            (status === "authenticated" && !hasPhotoAccess)
        ) {
            router.push("/");
        }
    }, [status, hasPhotoAccess, router]);

    const isDisabled = useMemo(() => {
        return uploading || status === "loading" || !hasPhotoAccess;
    }, [uploading, status, hasPhotoAccess]);

    async function handleFiles(files: FileList | null) {
        if (!files?.length) return;

        setUploading(true);
        setMessage("");
        setProgressText("");

        try {
            const selectedFiles = Array.from(files);

            for (let index = 0; index < selectedFiles.length; index++) {
                const file = selectedFiles[index];

                if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
                    throw new Error(`Formato não suportado: ${file.name}`);
                }

                if (file.size > MAX_FILE_SIZE) {
                    throw new Error(`A foto ${file.name} excede 25 MB.`);
                }

                setProgressText(`A preparar foto ${index + 1} de ${selectedFiles.length}...`);

                const compressedFile = await imageCompression(file, {
                    maxSizeMB: 8,
                    maxWidthOrHeight: 3000,
                    useWebWorker: true,
                    fileType: file.type,
                });

                const extension = file.name.split(".").pop() || "jpg";
                const pathname = `wedding/photos/${uuidv4()}.${extension}`;

                setProgressText(`A enviar foto ${index + 1} de ${selectedFiles.length}...`);

                const blob = await upload(pathname, compressedFile, {
                    access: "public",
                    handleUploadUrl: "/api/photos/upload",
                });

                setProgressText(`A guardar foto ${index + 1} de ${selectedFiles.length}...`);

                const saveResponse = await fetch("/api/photos", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        url: blob.url,
                        pathname: blob.pathname,
                        contentType: compressedFile.type,
                        size: compressedFile.size,
                        originalName: file.name,
                    }),
                });

                if (!saveResponse.ok) {
                    throw new Error("A foto foi enviada, mas não foi guardada na galeria.");
                }
            }

            setMessage("Obrigado! As fotos foram enviadas com sucesso.");
            setProgressText("");
        } catch (error) {
            setMessage(
                error instanceof Error
                    ? error.message
                    : "Não foi possível enviar as fotos."
            );
        } finally {
            setUploading(false);
        }
    }

    if (status === "loading" || !session || !hasPhotoAccess) return null;

    return (
        <div className="grid items-center justify-items-center min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
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

            <main className="relative z-10 w-full md:w-3/4 lg:w-1/2 mx-auto px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-black/30 backdrop-blur-md border rounded-2xl shadow-2xl mx-auto flex flex-col overflow-hidden"
                    style={{ borderColor: sand }}
                >
                    <div className="px-6 md:px-10 py-8 text-center">
                        <h1 className="text-2xl md:text-4xl font-medium" style={{ color: sand }}>
                            Partilha as tuas fotos
                        </h1>

                        <p className="mt-4 text-sm md:text-base" style={{ color: white }}>
                            Ajuda-nos a guardar todos os momentos deste dia. Podes selecionar várias fotos de uma vez.
                        </p>

                        <p className="mt-2 text-xs md:text-sm" style={{ color: sand }}>
                            Formatos aceites: JPEG, PNG e WebP. Máximo 25 MB por foto.
                        </p>

                        <label
                            className="mt-8 block cursor-pointer rounded-2xl border border-dashed p-8 md:p-10 text-center transition hover:opacity-90"
                            style={{
                                borderColor: sand,
                                backgroundColor: "rgba(0,0,0,0.25)",
                            }}
                        >
                            <input
                                type="file"
                                accept="image/jpeg,image/png,image/webp"
                                multiple
                                className="hidden"
                                disabled={isDisabled}
                                onChange={(event) => handleFiles(event.target.files)}
                            />

                            <div className="flex flex-col items-center gap-3">
                                <div
                                    className="mx-auto mb-5 h-14 w-14 rounded-full flex items-center justify-center"
                                    style={{
                                        backgroundColor: sand,
                                        color: space,
                                    }}
                                >
                                    <Camera size={26} strokeWidth={2.2} />
                                </div>

                                <span className="font-medium" style={{ color: sand }}>
                                    {uploading ? "A enviar..." : "Selecionar fotos"}
                                </span>
                            </div>
                        </label>

                        {progressText && (
                            <p className="mt-5 text-sm" style={{ color: sand }}>
                                {progressText}
                            </p>
                        )}

                        {message && (
                            <p className="mt-5 text-sm md:text-base" style={{ color: message.includes("sucesso") ? sand : white }}>
                                {message}
                            </p>
                        )}
                    </div>
                </motion.div>
            </main>
        </div>
    );
}