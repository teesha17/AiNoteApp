import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import {
  Alert,
  Box,
  CircularProgress,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  AppBar,
  Toolbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputAdornment,
  IconButton,
  Tooltip,
  Paper,
  Stack,
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

export default function Notes() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");
  const [searching, setSearching] = useState(false);
  const [open, setOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);
  const [createError, setCreateError] = useState("");
  const [deleteNoteId, setDeleteNoteId] = useState(null);
  const [loadingNotes, setLoadingNotes] = useState(true);

  const user = localStorage.getItem("email");

  async function loadNotes() {
    setLoadingNotes(true);
    try {
      const res = await api.get("/notes");
      setNotes(res.data?.notes ?? res.data ?? []);
    } catch {
      setNotes([]);
    } finally {
      setLoadingNotes(false);
    }
  }

  async function searchNotes(e) {
    e?.preventDefault();
    if (!search.trim()) return loadNotes();
    setSearching(true);
    try {
      const res = await api.get(`/notes/search/query?q=${encodeURIComponent(search.trim())}`);
      setNotes(res.data ?? []);
    } finally {
      setSearching(false);
    }
  }

  function openCreateModal() {
    setEditingNote(null);
    setTitle("");
    setContent("");
    setOpen(true);
  }

  function openEditModal(note) {
    setEditingNote(note);
    setTitle(note?.title ?? "");
    setContent(note?.content ?? "");
    setOpen(true);
  }

  async function saveNote(e) {
    e.preventDefault();
    setSaving(true);
    setCreateError("");
    try {
      if (editingNote) {
        await api.put(`/notes/${editingNote._id}`, { title, content });
      } else {
        await api.post("/notes", { title, content });
      }
      setOpen(false);
      loadNotes();
    } catch (err) {
      setCreateError(err.response?.data?.message ?? "Failed to save");
    } finally {
      setSaving(false);
    }
  }

  async function deleteNote() {
    try {
      await api.delete(`/notes/${deleteNoteId}`);
      setDeleteNoteId(null);
      loadNotes();
    } catch {}
  }

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/", { replace: true });
  }

  function timeAgo(date) {
    if (!date) return "Just now";
    const seconds = Math.floor((Date.now() - new Date(date)) / 1000);
    const intervals = [
      { label: "year", seconds: 31536000 },
      { label: "month", seconds: 2592000 },
      { label: "day", seconds: 86400 },
      { label: "hour", seconds: 3600 },
      { label: "minute", seconds: 60 },
      { label: "second", seconds: 1 },
    ];
    for (const interval of intervals) {
      const count = Math.floor(seconds / interval.seconds);
      if (count >= 1) return `${count} ${interval.label}${count > 1 ? "s" : ""} ago`;
    }
    return "Just now";
  }

  useEffect(() => {
    loadNotes();
  }, []);

  const hasNotes = notes.length > 0;

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{ bgcolor: "background.paper", color: "text.primary", borderBottom: 1, borderColor: "divider" }}
      >
        <Toolbar>
          <Stack direction="row" alignItems="center" spacing={1.5} onClick={() => navigate("/notes")} sx={{ cursor: "pointer", flex: 1 }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 1.5,
                bgcolor: "primary.main",
                color: "primary.contrastText",
              }}
            >
              <AutoStoriesOutlinedIcon />
            </Box>
            <Typography fontWeight={700} variant="h6" component="span">
              AiNote
            </Typography>
          </Stack>

          <Stack direction="row" alignItems="center" spacing={2}>
            {user && (
              <Typography variant="body2" color="text.secondary" noWrap sx={{ maxWidth: 180 }}>
                {user}
              </Typography>
            )}
            <Button
              variant="outlined"
              startIcon={<LogoutRoundedIcon />}
              onClick={handleLogout}
              sx={{ textTransform: "none", fontWeight: 600, borderColor: "divider" }}
            >
              Logout
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Stack component="form" onSubmit={searchNotes} direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mb: 4 }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Search notes with AI..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PsychologyOutlinedIcon color="action" />
                </InputAdornment>
              ),
              sx: { bgcolor: "action.hover", borderRadius: 2 },
            }}
          />
          <Stack direction="row" spacing={1.5} sx={{ flexShrink: 0 }}>
            <Button type="submit" variant="contained" disabled={searching}>
              {searching ? "Searching…" : "Search"}
            </Button>
            <Button variant="contained" startIcon={<AddRoundedIcon />} onClick={openCreateModal}>
              New note
            </Button>
          </Stack>
        </Stack>

        {loadingNotes ? (
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: 320, py: 8 }}>
            <CircularProgress size={48} />
          </Box>
        ) : !hasNotes ? (
          <Paper
            variant="outlined"
            sx={{
              py: 8,
              px: 3,
              textAlign: "center",
              borderStyle: "dashed",
              borderColor: "divider",
              bgcolor: "action.hover",
            }}
          >
            <Stack alignItems="center" spacing={2}>
              <Box
                sx={{
                  width: 72,
                  height: 72,
                  borderRadius: 2,
                  bgcolor: "action.selected",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <AutoStoriesOutlinedIcon sx={{ fontSize: 40, color: "text.secondary" }} />
              </Box>
              <Typography variant="h6" fontWeight={600}>
                No notes yet
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 360 }}>
                Create your first note to get started. Use the search bar to find notes by meaning with AI.
              </Typography>
              <Button variant="contained" startIcon={<AddRoundedIcon />} onClick={openCreateModal} size="large">
                Create note
              </Button>
            </Stack>
          </Paper>
        ) : (
          <Grid container spacing={3}>
            {notes.map((note) => (
              <Grid item xs={12} sm={6} md={4} key={note._id}>
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
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      <Dialog open={open} onClose={() => !saving && setOpen(false)} fullWidth maxWidth="sm" PaperProps={{ sx: { borderRadius: 2 } }}>
        <DialogTitle>{editingNote ? "Edit note" : "New note"}</DialogTitle>
        <form onSubmit={saveNote}>
          <DialogContent>
            {createError && (
              <Alert severity="error" onClose={() => setCreateError("")} sx={{ mb: 2 }}>
                {createError}
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

      <Dialog open={!!deleteNoteId} onClose={() => setDeleteNoteId(null)} PaperProps={{ sx: { borderRadius: 2 } }}>
        <DialogTitle>Delete note?</DialogTitle>
        <DialogContent>
          <Typography color="text.secondary">This action cannot be undone.</Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setDeleteNoteId(null)}>Cancel</Button>
          <Button color="error" variant="contained" onClick={deleteNote}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
