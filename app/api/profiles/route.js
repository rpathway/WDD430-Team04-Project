import { getUsers, createUsers } from "@/controllers/profileController";

export async function GET() {
   return getUsers();
};