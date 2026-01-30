import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Alert } from "@mui/material";

export default function NoteEditorDialog({ open, editingNote, title, setTitle, content, setContent, onSave, saving, error }) {
  return (
    <Dialog open={open} onClose={() => !saving && setOpen(false)} fullWidth maxWidth="sm" PaperProps={{ sx: { borderRadius: 2 } }}>
        <DialogTitle>{editingNote ? "Edit note" : "New note"}</DialogTitle>
        <form onSubmit={onSave}>
          <DialogContent>
            {error && (
              <Alert severity="error" onClose={() => setCreateError("")} sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            <TextField
              fullWidth
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              margin="normal"
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
                "& .MuiInputBase-root": {
                  alignItems: "flex-start",
                },
                "& .MuiInputBase-input": {
                  maxHeight: 280,
                  overflow: "auto !important",
                },
              }}
            />
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button onClick={() => !saving && setOpen(false)} disabled={saving}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" disabled={saving}>
              {saving ? "Saving…" : editingNote ? "Update" : "Save"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
  );
}
