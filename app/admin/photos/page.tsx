import { isAdminEmail } from "@/app/lib/access";
import { authOptions } from "@/app/lib/auth";
import { connectToDatabase } from "@/app/lib/mongodb";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import AdminPhotosClient from "./AdminPhotosClient";

export default async function AdminPhotosPage() {
    const session = await getServerSession(authOptions);

    if (!session?.user || !isAdminEmail(session.user.email)) {
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