import {Note} from "../../models/index.js";
import { getEmbedding } from "../../services/embeddingService.js";
import { cosineSimilarity } from "../../utils/cosineSimilarity.js";

export const SearchNotes = async (req, res) => {
  const queryEmbedding = await getEmbedding(req.query.q);
  const notes = await Note.find({ userId: req.user.id });

  const ranked = notes.map(note => ({
    ...note._doc,
    score: cosineSimilarity(queryEmbedding, note.embedding)
  }));

  ranked.sort((a, b) => b.score - a.score);

  res.json(ranked.slice(0, 5));
};
