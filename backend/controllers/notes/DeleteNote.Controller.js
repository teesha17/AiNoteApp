import {Note} from "../../models/index.js";

export const DeleteNote = async (req, res) => {
  await Note.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
  res.json({ message: "Deleted" });
};