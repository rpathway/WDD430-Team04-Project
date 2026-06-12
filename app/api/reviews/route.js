import {
    getReviews,
    createReview,
  } from "@/controllers/reviewController";
  
  export async function GET() {
    return getReviews();
  }
  
  export async function POST(
    request
  ) {
    return createReview(request);
  }