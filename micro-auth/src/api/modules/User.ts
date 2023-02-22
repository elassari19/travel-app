import mongoose, {Schema} from "mongoose";

const UsersSchema = new Schema({
    firstname: {
      type: String,
      require: true,
    },
    lastname: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      require: true,
    },
    phone: {
      type: String,
    },
    gender: {
      type: String,
    },
    address: {
      country: String,
      city: String,
      street: String,
      zip: String,
      geo: {
        lon: Number,
        lat: Number,
      },
    },
    permission: {
      type: String,
      enum: ["admin", "user", "guest"],
      default: "user",
    },
    verified: {
      type: Boolean,
      default: false
    },
    verification: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Users', UsersSchema)
