import {Note} from "../../models/index.js";
import { getEmbedding } from "../../services/embeddingService.js";

export const UpdateNote = async (req, res) => {
  const embedding = await getEmbedding(req.body.title + " " + req.body.content);

  const note = await Note.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.id },
    { ...req.body, embedding },
    { new: true }
  );

  res.json(note);
};