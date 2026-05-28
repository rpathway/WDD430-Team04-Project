import { getUsers, createUsers } from "../../../controllers/profileController";

export async function GET() {
   return getUsers();
};

export async function POST(request) {
   return createUsers(request);
};