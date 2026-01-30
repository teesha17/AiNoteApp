import { useEffect, useState } from "react";
import api from "../api/api";
import { Container, Paper, Typography, Button, Box } from "@mui/material";
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

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <SearchBar search={search} setSearch={setSearch} onSearch={searchNotes} onCreate={openCreateModal} searching={searching} />
        {isEmpty ? (
          <Paper
            variant="outlined"
            sx={{
              p: 5,
              textAlign: "center",
              borderRadius: 2,
              borderStyle: "dashed",
              borderWidth: 2,
              bgcolor: "action.hover",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mb: 2,
                color: "text.secondary",
              }}
            >
              {isSearchEmpty ? (
                <SearchOffOutlinedIcon sx={{ fontSize: 56 }} />
              ) : (
                <NoteAddOutlinedIcon sx={{ fontSize: 56 }} />
              )}
            </Box>
            <Typography variant="h6" fontWeight={600} color="text.primary" gutterBottom>
              {isSearchEmpty ? "No notes match your search" : "No notes yet"}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3, maxWidth: 320, mx: "auto" }}>
              {isSearchEmpty
                ? "Try a different search term or clear the search to see all notes."
                : "Create your first note to get started."}
            </Typography>
            {isSearchEmpty ? (
              <Button variant="outlined" onClick={() => { setSearch(""); loadNotes(); }}>
                Clear search
              </Button>
            ) : (
              <Button variant="contained" startIcon={<NoteAddOutlinedIcon />} onClick={openCreateModal}>
                Create your first note
              </Button>
            )}
          </Paper>
        ) : (
          <NotesGrid notes={notes} openEditModal={openEditModal} setDeleteNoteId={setDeleteNoteId} timeAgo={timeAgo} />
        )}
      </Container>

      <NoteEditorDialog open={open} editingNote={editingNote} title={title} setTitle={setTitle} content={content} setContent={setContent} onSave={saveNote} saving={saving} error={createError} onClose={() => !saving && setOpen(false)}/>

      <DeleteConfirmDialog
        open={!!deleteNoteId}
        onClose={() => setDeleteNoteId(null)}
        onConfirm={deleteNote}
      />

    </>
  );
}
