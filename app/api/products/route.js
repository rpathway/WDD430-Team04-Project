import { getProducts, createProducts } from "../../../controllers/productController";
import { auth } from "@/auth";

export async function GET() {
  const session = await auth();

  console.log("SESSION IN API:", session);

  return getProducts(session);
}

export async function POST(request) {
  return createProducts(request);
}