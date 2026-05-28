import mongoose from "mongoose";

const SellerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    profileImage: {
      type: String,
      default: "",
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