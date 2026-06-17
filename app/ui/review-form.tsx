"use client";

import { useState } from "react";

export default function ReviewForm({
  productId,
}: {
  productId: string;
}) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  async function submitReview() {
    try {
      setLoading(true);

      const res = await fetch(
        "/api/reviews",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            product: productId,
            rating,
            comment,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      setComment("");

      alert("Review submitted");
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <select
        value={rating}
        onChange={(e) =>
          setRating(Number(e.target.value))
        }
        className="w-full border rounded-xl p-3"
      >
        <option value={5}>5 Stars</option>
        <option value={4}>4 Stars</option>
        <option value={3}>3 Stars</option>
        <option value={2}>2 Stars</option>
        <option value={1}>1 Star</option>
      </select>

      <textarea
        value={comment}
        onChange={(e) =>
          setComment(e.target.value)
        }
        rows={4}
        placeholder="Write your review..."
        className="w-full border rounded-xl p-3"
      />

      <button
        onClick={submitReview}
        disabled={loading}
        className="bg-terracotta text-white px-6 py-3 rounded-xl"
      >
        {loading
          ? "Submitting..."
          : "Submit Review"}
      </button>
    </div>
  );
}