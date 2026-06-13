import {
    getProductReviews,
  } from "@/controllers/reviewController";
  
  export async function GET(
    request,
    { params }
  ) {
    return getProductReviews(
      params.id
    );
  }