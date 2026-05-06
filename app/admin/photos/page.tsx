/* eslint-disable @typescript-eslint/no-explicit-any */
import { authOptions } from "@/app/lib/auth";
import { connectToDatabase } from "@/app/lib/mongodb";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function AdminPhotosPage() {
    const session = await getServerSession(authOptions);

    const adminEmails = process.env.NEXT_PUBLIC_ADMIN_EMAILS?.split(",");

    if (!session?.user?.email || !adminEmails?.includes(session.user.email as string)) {
        redirect("/");
    }

    const { db } = await connectToDatabase();

    const photoCollection = db.collection('photos');

    const photos = await photoCollection.find().sort({ createdAt: -1 }).toArray();

    return (
        <main className="px-6 py-10">
            <h1 className="text-3xl font-semibold">Fotos submetidas</h1>

            <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
                {photos.map((photo: any) => (
                    <a
                        key={photo._id.toString()}
                        href={photo.url}
                        target="_blank"
                        className="overflow-hidden rounded-xl border"
                    >
                        <img
                            src={photo.url}
                            alt=""
                            className="aspect-square w-full object-cover"
                        />
                    </a>
                ))}
            </div>
        </main>
    )
}