import { getProducts, createProducts } from "../../../controllers/productController";


export async function GET() {
  return getProducts();
}

export async function POST(request) {
  return createProducts(request);
}