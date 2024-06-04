import mongoose from "mongoose";

const urlSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    longUrl: { type: String, required: true },
    shortUrl: { type: String, required: true },
    urlId: { type: String, required: true },
    clicked: { type: Number, default: 0 },
  },
  { versionKey: false, timestamps: true }
);

export default mongoose.model("Url", urlSchema);
