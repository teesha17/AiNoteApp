import {Note} from "../../models/index.js";
import { getEmbedding } from "../../services/embeddingService.js";

export const CreateNote = async (req, res) => {
  const embedding = await getEmbedding(req.body.title + " " + req.body.content);

  const note = await Note.create({
    userId: req.user.id,
    title: req.body.title,
    content: req.body.content,
    embedding
  });

  res.json(note);
};