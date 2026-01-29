import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: String,
  content: String,
  embedding: [Number],
}, { timestamps: true });

export default mongoose.model("Note", NoteSchema);
