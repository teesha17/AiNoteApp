import { CircularProgress, Box } from "@mui/material";
import Masonry from "@mui/lab/Masonry";
import { useEffect, useRef } from "react";
import NoteCard from "./NoteCard";

export default function NotesGrid({ 
  notes, 
  openEditModal, 
  setDeleteNoteId, 
  timeAgo, 
  loadMore, 
  hasMore, 
  loadingNotes 
}) {

  const observerRef = useRef(null);

  useEffect(() => {
    if (!hasMore || loadingNotes) return;

    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) loadMore();
    });

    if (observerRef.current) observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [hasMore, loadingNotes, loadMore]);

  return (
    <>
      <Masonry
        columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}
        spacing={2}
      >
        {notes.map(note => (
          <NoteCard
            key={note._id}
            note={note}
            openEditModal={openEditModal}
            setDeleteNoteId={setDeleteNoteId}
            timeAgo={timeAgo}
          />
        ))}
      </Masonry>

      {hasMore && (
        <Box ref={observerRef} sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          {loadingNotes && <CircularProgress />}
        </Box>
      )}
    </>
  );
}
