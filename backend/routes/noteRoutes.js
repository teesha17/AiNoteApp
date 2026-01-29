import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {CreateNote, UpdateNote, DeleteNote, GetNotes, SearchNotes} from "../controllers/notes/index.js"

const router = express.Router();

router.use(authMiddleware);

router.post("/", CreateNote);
router.get("/", GetNotes);
router.put("/:id", UpdateNote);
router.delete("/:id", DeleteNote);
router.get("/search/query", SearchNotes);

export default router;
