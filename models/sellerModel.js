import mongoose from "mongoose";

const SellerSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    bio: {
      type: String,
      default: "",
    },

    specialty: {
      type: String,
      default: "",
    },

    location: {
      type: String,
      default: "",
    },

    socialLinks: {
      instagram: {
        type: String,
        default: "",
      },

      facebook: {
        type: String,
        default: "",
      },

      website: {
        type: String,
        default: "",
      },
    },

    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],

    ratingsAverage: {
      type: Number,
      default: 0,
    },

    totalReviews: {
      type: Number,
      default: 0,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Seller =
  mongoose.models.Seller ||
  mongoose.model("Seller", SellerSchema);

export default Seller;