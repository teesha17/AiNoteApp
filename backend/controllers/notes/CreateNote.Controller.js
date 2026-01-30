import {Note} from "../../models/index.js";
import { getEmbedding } from "../../services/embeddingService.js";

export const CreateNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title?.trim() || !content?.trim()) {
      return res.status(400).json({
        message: "Title and content are required",
      });
    }

    const embedding = await getEmbedding(`${title} ${content}`);

    const note = await Note.create({
      userId: req.user.id,
      title: title.trim(),
      content: content.trim(),
      embedding,
    });

    return res.status(201).json(note);

  } catch (error) {
    console.error("CreateNote Error:", error);
    return res.status(500).json({
      message: "Failed to create note",
    });
  }
};
