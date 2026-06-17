import { connectDB } from "@/lib/db";
import Product from "@/models/productModel";
import ProductForm from "@/app/ui/product-form";

async function getProduct(id: string) {
  await connectDB();
  const product = await Product.findById(id);
  return JSON.parse(JSON.stringify(product));
}

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) return <div>Product not found</div>;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Edit Product</h1>

      <ProductForm
        mode="edit"
        productId={id}
        initialData={product}
      />
    </div>
  );
}