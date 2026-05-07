import { authOptions } from "@/app/lib/auth";
import { connectToDatabase } from "@/app/lib/mongodb";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import AdminPhotosClient from "./AdminPhotosClient";

function getAdminEmails() {
    return (process.env.NEXT_PUBLIC_ADMIN_EMAILS || "")
        .split(",")
        .map((email) => email.trim().toLowerCase())
        .filter(Boolean);
}

export default async function AdminPhotosPage() {
    const session = await getServerSession(authOptions);

    const adminEmails = getAdminEmails();
    const userEmail = session?.user?.email?.toLowerCase();

    if (!session?.user || !userEmail || !adminEmails.includes(userEmail)) {
        redirect("/");
    }

    const { db } = await connectToDatabase();

    const photos = await db
        .collection("photos")
        .find({})
        .sort({ createdAt: -1 })
        .toArray();

    return <AdminPhotosClient photos={JSON.parse(JSON.stringify(photos))} />;
}