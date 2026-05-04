"use client";

import { upload } from "@vercel/blob/client";
import imageCompression from "browser-image-compression";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const MAX_FILE_SIZE = 25 * 1024 * 1024;

export default function PhotosPage() {
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState("");

    async function handleFiles(files: FileList | null) {
        if (!files?.length) return;

        setUploading(true);
        setMessage("");

        try {
            for (const file of Array.from(files)) {
                if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
                    throw new Error(`Formato não suportado: ${file.name}`);
                }

                if (file.size > MAX_FILE_SIZE) {
                    throw new Error(`A foto ${file.name} excede 25 MB.`);
                }

                const compressedFile = await imageCompression(file, {
                    maxSizeMB: 8,
                    maxWidthOrHeight: 3000,
                    useWebWorker: true,
                    fileType: file.type,
                });

                const extension = file.name.split(".").pop() || "jpg";
                const pathname = `wedding/photos/${uuidv4()}.${extension}`;

                await upload(pathname, compressedFile, {
                    access: "public",
                    handleUploadUrl: "/api/photos/upload",
                });
            }

            setMessage("Obrigado! As fotos foram enviadas com sucesso.");
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

    return (
        <main className="mx-auto max-w-xl px-6 py-12">
            <h1 className="text-3xl font-semibold">
                Partilha connosco as tuas fotos
            </h1>

            <p className="mt-3 text-gray-600">
                Seleciona as fotos que tiraste durante o casamento.
            </p>

            <label className="mt-8 block cursor-pointer rounded-2xl border border-dashed p-8 text-center">
                <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    multiple
                    className="hidden"
                    disabled={uploading}
                    onChange={(event) => handleFiles(event.target.files)}
                />

                {uploading ? "A enviar..." : "Selecionar fotos"}
            </label>

            {message && <p className="mt-4 text-sm">{message}</p>}
        </main>
    );
}