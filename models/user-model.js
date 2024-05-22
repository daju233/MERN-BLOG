import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      default:
        "https://cdn.dribbble.com/users/77628/screenshots/14247360/media/2b5be3f5db32c1dbfd5702da8af2f247.jpg",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },

  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
