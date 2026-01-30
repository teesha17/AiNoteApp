import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";
import NoteAddRoundedIcon from "@mui/icons-material/NoteAddRounded";

export default function NoteEditorDialog({
  open,
  editingNote,
  title,
  setTitle,
  content,
  setContent,
  onSave,
  saving,
  error,
  onClose,
}) {
  return (
    <Dialog
      open={open}
      onClose={() => !saving && onClose()}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: 3,
          overflow: "hidden",
          boxShadow: "0 25px 50px -12px rgba(15, 23, 42, 0.2)",
        },
      }}
    >
      <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1.5, fontWeight: 700 }}>
        {editingNote ? (
          <>
            <EditNoteRoundedIcon color="primary" />
            Edit note
          </>
        ) : (
          <>
            <NoteAddRoundedIcon color="primary" />
            New note
          </>
        )}
      </DialogTitle>
      <form onSubmit={onSave}>
        <DialogContent sx={{ pt: 0 }}>
          {error && (
            <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
              {error}
            </Alert>
          )}
          <TextField
            fullWidth
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            margin="normal"
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
          />
          <TextField
            fullWidth
            label="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            multiline
            minRows={4}
            margin="normal"
            sx={{
              "& .MuiOutlinedInput-root": { borderRadius: 2, alignItems: "flex-start" },
              "& .MuiInputBase-input": {
                maxHeight: 280,
                overflow: "auto !important",
              },
            }}
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2, gap: 1, borderTop: "1px solid", borderColor: "divider" }}>
          <Button onClick={onClose} disabled={saving} sx={{ borderRadius: 2 }}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={saving}
            sx={{ borderRadius: 2, minWidth: 100 }}
          >
            {saving ? "Saving…" : editingNote ? "Update" : "Save"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
