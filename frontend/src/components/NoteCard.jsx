import { Card, CardContent, Typography, Box, IconButton, Tooltip } from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

export default function NoteCard({ note, openEditModal, setDeleteNoteId, timeAgo }) {
  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: 2,
        borderColor: "rgba(15, 23, 42, 0.08)",
        transition: "border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease",
        "&:hover": {
          borderColor: "rgba(99, 102, 241, 0.25)",
          boxShadow: "0 12px 24px -8px rgba(15, 23, 42, 0.1), 0 4px 8px -4px rgba(15, 23, 42, 0.06)",
          transform: "translateY(-2px)",
        },
        "&:hover .note-actions": {
          opacity: 1,
        },
      }}
    >
      <CardContent sx={{ position: "relative", pt: 2, pb: 2 }}>
        <Box
          className="note-actions"
          sx={{
            position: "absolute",
            top: 12,
            right: 8,
            display: "flex",
            gap: 0.5,
            opacity: 0,
            transition: "opacity 0.2s ease",
          }}
        >
          <Tooltip title="Edit">
            <IconButton
              size="small"
              onClick={() => openEditModal(note)}
              sx={{
                bgcolor: "background.paper",
                boxShadow: 1,
                "&:hover": { bgcolor: "primary.main", color: "primary.contrastText" },
              }}
            >
              <EditRoundedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton
              size="small"
              color="error"
              onClick={() => setDeleteNoteId(note._id)}
              sx={{ bgcolor: "background.paper", boxShadow: 1 }}
            >
              <DeleteRoundedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>

        <Typography
          variant="subtitle1"
          fontWeight={600}
          gutterBottom
          sx={{ pr: 6, lineHeight: 1.4 }}
        >
          {note.title || "Untitled"}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 1.5,
            whiteSpace: "pre-wrap",
            lineHeight: 1.5,
          }}
        >
          {note.content || "No content"}
        </Typography>

        <Typography variant="caption" color="text.disabled" sx={{ fontWeight: 500 }}>
          {timeAgo(note.updatedAt || note.createdAt)}
        </Typography>
      </CardContent>
    </Card>
  );
}
