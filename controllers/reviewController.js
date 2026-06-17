import { auth } from "@/auth";
import { connectDB } from "@/lib/db";

import Review from "@/models/reviewModel";
import Product from "@/models/productModel";
import { updateProductRating } from "@/lib/updateProductRating";

export async function getReviews() {
  try {
    await connectDB();

    const reviews = await Review.find()
      .populate("user", "name")
      .populate("product", "name");

    return Response.json(reviews);
  } catch (error) {
    return Response.json(
      { message: error.message },
      { status: 500 }
    );
  }
}


export async function getProductReviews(productId) {
  try {
    await connectDB();

    const reviews = await Review.find({
      product: productId,
    }).populate("user", "name profileImage");

    return Response.json(reviews);
  } catch (error) {
    return Response.json(
      { message: error.message },
      { status: 500 }
    );
  }
}


export async function createReview(
    request
  ) {
    try {
      await connectDB();

      const session = await auth();

      if (!session) {
        return Response.json(
          { message: "Unauthorized" },
          { status: 401 }
        );
      }

      const body = await request.json();

      const existingReview =
        await Review.findOne({
          product: body.product,
          user: session.user.id,
        });

      if (existingReview) {
        return Response.json(
          {
            message:
              "You already reviewed this product",
          },
          {
            status: 400,
          }
        );
      }

      const review =
        await Review.create({
          product: body.product,
          rating: body.rating,
          comment: body.comment,
          user: session.user.id,
        });

      await updateProductRating(
        body.product
      );

      return Response.json(
        review,
        { status: 201 }
      );
    } catch (error) {
      return Response.json(
        {
          message: error.message,
        },
        {
          status: 500,
        }
      );
    }
  }


  export async function updateReview(
    request,
    id
  ) {
    try {
      await connectDB();
  
      const session = await auth();
  
      if (!session) {
        return Response.json(
          { message: "Unauthorized" },
          { status: 401 }
        );
      }
  
      const body = await request.json();
  
      const review =
        await Review.findById(id);
  
      if (!review) {
        return Response.json(
          {
            message:
              "Review not found",
          },
          {
            status: 404,
          }
        );
      }
  
      if (
        review.user.toString() !==
        session.user.id
      ) {
        return Response.json(
          {
            message:
              "Not authorized",
          },
          {
            status: 403,
          }
        );
      }
  
      review.rating =
        body.rating ??
        review.rating;
  
      review.comment =
        body.comment ??
        review.comment;
  
      await review.save();
  
      await updateProductRating(
        review.product
      );
  
      return Response.json(review);
    } catch (error) {
      return Response.json(
        {
          message: error.message,
        },
        {
          status: 500,
        }
      );
    }
  }


  export async function deleteReview(
    id
  ) {
    try {
      await connectDB();
  
      const session = await auth();
  
      if (!session) {
        return Response.json(
          { message: "Unauthorized" },
          { status: 401 }
        );
      }
  
      const review =
        await Review.findById(id);
  
      if (!review) {
        return Response.json(
          {
            message:
              "Review not found",
          },
          {
            status: 404,
          }
        );
      }
  
      if (
        review.user.toString() !==
        session.user.id
      ) {
        return Response.json(
          {
            message:
              "Not authorized",
          },
          {
            status: 403,
          }
        );
      }
  
      const productId =
        review.product;
  
      await review.deleteOne();
  
      await updateProductRating(
        productId
      );
  
      return Response.json({
        message:
          "Review deleted successfully",
      });
    } catch (error) {
      return Response.json(
        {
          message: error.message,
        },
        {
          status: 500,
        }
      );
    }
  }