import mongoose from "mongoose";

mongoose.set("strictQuery", false);

const db = async () => {
  try {
    // @ts-ignore
    await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    })
    console.log("db is connected")
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

export default db