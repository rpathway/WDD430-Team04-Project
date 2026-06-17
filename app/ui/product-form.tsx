'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProductForm({
  initialData = {},
  mode = 'create',
  productId,
}: {
  initialData?: any;
  mode?: 'create' | 'edit';
  productId?: string;
}) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    title: initialData.title || '',
    description: initialData.description || '',
    price: initialData.price || '',
    category: initialData.category || '',
    stock: initialData.stock || '1',
    images: '',
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const payload = {
        title: form.title,
        description: form.description,
        price: Number(form.price),
        category: form.category,
        stock: Number(form.stock),
        images: form.images
          ? form.images.split(',').map((img) => img.trim())
          : [],
      };

      const res = await fetch(
        mode === 'edit'
          ? `/api/products/${productId}`
          : '/api/products',
        {
          method: mode === 'edit' ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      router.push('/sellers/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      <input
        name="title"
        placeholder="Product title"
        value={form.title}
        onChange={handleChange}
        className="w-full border p-3 rounded-lg"
        required
      />

      <textarea
        name="description"
        placeholder="Product description"
        value={form.description}
        onChange={handleChange}
        className="w-full border p-3 rounded-lg"
        rows={4}
        required
      />

      <input
        name="price"
        type="number"
        placeholder="Price"
        value={form.price}
        onChange={handleChange}
        className="w-full border p-3 rounded-lg"
        required
      />

      <select
        name="category"
        value={form.category}
        onChange={handleChange}
        className="w-full border p-3 rounded-lg"
        required
      >
        <option value="">Select category</option>
        <option value="Jewelry">Jewelry</option>
        <option value="Pottery">Pottery</option>
        <option value="Fashion">Fashion</option>
        <option value="Home Decor">Home Decor</option>
        <option value="Accessories">Accessories</option>
        <option value="Painting">Painting</option>
        <option value="Woodworking">Woodworking</option>
      </select>

      <input
        name="stock"
        type="number"
        placeholder="Stock quantity"
        value={form.stock}
        onChange={handleChange}
        className="w-full border p-3 rounded-lg"
      />

      <input
        name="images"
        placeholder="Image URLs (comma separated)"
        value={form.images}
        onChange={handleChange}
        className="w-full border p-3 rounded-lg"
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        disabled={loading}
        className="w-full bg-terracotta text-white py-3 rounded-lg font-semibold"
      >
        {loading
          ? mode === 'edit'
            ? 'Updating...'
            : 'Creating...'
          : mode === 'edit'
          ? 'Update Product'
          : 'Create Product'}
      </button>
    </form>
  );
}