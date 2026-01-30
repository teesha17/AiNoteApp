import { Card, CardContent, Typography, Box, IconButton, Tooltip } from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

export default function NoteCard({ note, openEditModal, setDeleteNoteId, timeAgo }) {
  return (
    <Card
      variant="outlined"
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 2,
        transition: "border-color 0.2s, box-shadow 0.2s",
        "&:hover": {
          borderColor: "primary.light",
          boxShadow: 1,
        },
        "&:hover .note-actions": {
          opacity: 1,
        },
      }}
    >
      <CardContent sx={{ flexGrow: 1, position: "relative", pt: 2 }}>
        <Box
          className="note-actions"
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            display: "flex",
            gap: 0.5,
            opacity: 0,
            transition: "opacity 0.2s ease",
          }}
        >
          <Tooltip title="Edit">
            <IconButton size="small" onClick={() => openEditModal(note)}>
              <EditRoundedIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete">
            <IconButton size="small" color="error" onClick={() => setDeleteNoteId(note._id)}>
              <DeleteRoundedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>

        <Typography variant="subtitle1" fontWeight={600} gutterBottom sx={{ pr: 6 }}>
          {note.title || "Untitled"}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            mb: 1.5,
            whiteSpace: "pre-wrap",
          }}
        >
          {note.content || "No content"}
        </Typography>

        <Typography variant="caption" color="text.disabled">
          {timeAgo(note.updatedAt || note.createdAt)}
        </Typography>
      </CardContent>
    </Card>
  );
}
