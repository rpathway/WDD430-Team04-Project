import { getProducts, createProducts } from "@/controllers/productController";
import { auth } from "@/auth";

export async function GET(request) {
  const session = await auth();
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") || "";

  return getProducts(session, search);
}

export async function POST(request) {
  return createProducts(request);
}