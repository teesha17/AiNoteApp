import { Note } from "../../models/index.js";

export const GetNotes = async (req, res) => {
  try {
    const userId = req.user.id;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sortBy = req.query.sortBy || "createdAt";
    const sortOrder = req.query.sortOrder === "asc" ? 1 : -1;

    const skip = (page - 1) * limit;

    const [notes, total] = await Promise.all([
      Note.find({ userId })
        .sort({ [sortBy]: sortOrder })
        .skip(skip)
        .limit(limit),

      Note.countDocuments({ userId })
    ]);

    res.json({
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      notes
    });

  } catch (error) {
    console.error("Get notes error:", error);
    res.status(500).json({ message: "Failed to fetch notes" });
  }
};
