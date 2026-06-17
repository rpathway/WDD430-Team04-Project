import { createUsers } from "@/controllers/profileController";

export async function POST(request) {
    return createUsers(request);
 };