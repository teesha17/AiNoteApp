import { Note } from "../../models/index.js";
import { getEmbedding } from "../../services/embeddingService.js";

export const UpdateNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title?.trim() || !content?.trim()) {
      return res.status(400).json({
        message: "Title and content are required",
      });
    }

    const embedding = await getEmbedding(req.body.title + " " + req.body.content);

    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { ...req.body, embedding },
      { new: true }
    );

    res.status(201).json(note);

  } catch (error) {
    console.error("CreateNote Error:", error);
    return res.status(500).json({
      message: "Failed to create note",
    });
  }
};