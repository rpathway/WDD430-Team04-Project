import Header from '@/app/ui/header';
import ProductForm from '@/app/ui/product-form';

export default function AddProductPage() {
  return (
    <div className="min-h-screen bg-cream-white">
      <Header />

      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Add New Product</h1>

        <ProductForm mode="create" />
      </div>
    </div>
  );
}