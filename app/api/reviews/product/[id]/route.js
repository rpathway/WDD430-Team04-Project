import {
  getProductReviews,
} from "@/controllers/reviewController";

export async function GET(
  request,
  { params }
) {
  const { id } = await params;

  return getProductReviews(
    id
  );
}