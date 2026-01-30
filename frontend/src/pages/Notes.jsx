import { useEffect, useState } from "react";
import api from "../api/api";
import { Container, Paper, Typography, Button, Box, CircularProgress } from "@mui/material";
import NoteAddOutlinedIcon from "@mui/icons-material/NoteAddOutlined";
import SearchOffOutlinedIcon from "@mui/icons-material/SearchOffOutlined";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import NotesGrid from "../components/NotesGrid";
import NoteEditorDialog from "../components/NoteEditorDialog";
import DeleteConfirmDialog from "../components/DeleteConfirmDialog";
export default function Notes() {
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
    } catch { }
  }

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    window.location.replace("/");
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
  const isEmpty = !loadingNotes && notes.length === 0;
  const isSearchEmpty = isEmpty && search.trim() !== "";

  return (
    <>
      <Header onlogout={handleLogout} />

      <Box
        sx={{
          minHeight: "calc(100vh - 64px)",
          background: "linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)",
        }}
      >
        <Container maxWidth="lg" sx={{ py: 4, px: { xs: 2, sm: 3 } }}>
          <SearchBar search={search} setSearch={setSearch} onSearch={searchNotes} onCreate={openCreateModal} searching={searching} />
          {isEmpty ? (
            <Paper
              variant="outlined"
              sx={{
                p: { xs: 4, sm: 6 },
                textAlign: "center",
                borderRadius: 3,
                borderStyle: "dashed",
                borderWidth: 2,
                borderColor: "rgba(99, 102, 241, 0.2)",
                bgcolor: "rgba(255, 255, 255, 0.7)",
                backdropFilter: "blur(8px)",
                boxShadow: "0 4px 24px -4px rgba(15, 23, 42, 0.06)",
              }}
            >
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: 3,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mx: "auto",
                  mb: 2,
                  bgcolor: "rgba(99, 102, 241, 0.08)",
                  color: "primary.main",
                }}
              >
                {isSearchEmpty ? (
                  <SearchOffOutlinedIcon sx={{ fontSize: 40 }} />
                ) : (
                  <NoteAddOutlinedIcon sx={{ fontSize: 40 }} />
                )}
              </Box>
              <Typography variant="h6" fontWeight={700} color="text.primary" gutterBottom letterSpacing="-0.01em">
                {isSearchEmpty ? "No notes match your search" : "No notes yet"}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3, maxWidth: 320, mx: "auto", lineHeight: 1.6 }}>
                {isSearchEmpty
                  ? "Try a different search term or clear the search to see all notes."
                  : "Create your first note to get started."}
              </Typography>
              {isSearchEmpty ? (
                <Button variant="outlined" onClick={() => { setSearch(""); loadNotes(); }} sx={{ borderRadius: 2 }}>
                  Clear search
                </Button>
              ) : (
                <Button
                  variant="contained"
                  startIcon={<NoteAddOutlinedIcon />}
                  onClick={openCreateModal}
                  sx={{ borderRadius: 2, boxShadow: "0 4px 14px rgba(99, 102, 241, 0.35)" }}
                >
                  Create your first note
                </Button>
              )}
            </Paper>
          ) : loadingNotes && notes.length === 0 ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
              <CircularProgress size={40} thickness={4} sx={{ color: "primary.main" }} />
            </Box>
          ) : (
            <NotesGrid notes={notes} openEditModal={openEditModal} setDeleteNoteId={setDeleteNoteId} timeAgo={timeAgo} />
          )}
        </Container>
      </Box>

      <NoteEditorDialog open={open} editingNote={editingNote} title={title} setTitle={setTitle} content={content} setContent={setContent} onSave={saveNote} saving={saving} error={createError} onClose={() => !saving && setOpen(false)}/>

      <DeleteConfirmDialog
        open={!!deleteNoteId}
        onClose={() => setDeleteNoteId(null)}
        onConfirm={deleteNote}
      />

    </>
  );
}
