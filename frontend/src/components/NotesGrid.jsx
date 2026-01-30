import { Grid, CircularProgress, Box } from "@mui/material";
import { useEffect, useRef } from "react";
import NoteCard from "./NoteCard";

export default function NotesGrid({ notes, openEditModal, setDeleteNoteId, timeAgo, loadMore, hasMore, loadingNotes }) {

  const observerRef = useRef(null);

  useEffect(() => {
    if (!hasMore || loadingNotes) return;

    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        loadMore();
      }
    });

    if (observerRef.current) observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [hasMore, loadingNotes, loadMore]);

  return (
    <>
      <Grid container spacing={3}>
        {notes.map(note => (
          <Grid item xs={12} sm={6} md={4} key={note._id}>
            <NoteCard
              note={note}
              openEditModal={openEditModal}
              setDeleteNoteId={setDeleteNoteId}
              timeAgo={timeAgo}
            />
          </Grid>
        ))}
      </Grid>

      {/* Scroll Trigger */}
      {hasMore && (
        <Box ref={observerRef} sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          {loadingNotes && <CircularProgress />}
        </Box>
      )}
    </>
  );
}
