import { Stack, TextField, Button, InputAdornment, Box } from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

export default function SearchBar({ search, setSearch, onSearch, onCreate, searching }) {
  return (
    <Stack
      component="form"
      onSubmit={onSearch}
      direction={{ xs: "column", sm: "row" }}
      spacing={2}
      sx={{ mb: 4 }}
    >
      <TextField
        fullWidth
        size="small"
        placeholder="Search notes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchRoundedIcon sx={{ color: "text.secondary", fontSize: 22 }} />
            </InputAdornment>
          ),
          sx: {
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: "0 1px 2px rgba(15, 23, 42, 0.05)",
            "& fieldset": {
              borderColor: "rgba(15, 23, 42, 0.08)",
            },
            "&:hover fieldset": {
              borderColor: "rgba(99, 102, 241, 0.3)",
            },
            "&.Mui-focused fieldset": {
              borderWidth: 2,
              borderColor: "primary.main",
            },
          },
        }}
      />
      <Stack direction="row" spacing={1.5} sx={{ flexShrink: 0 }}>
        <Button
          type="submit"
          variant="outlined"
          disabled={searching}
          sx={{ borderRadius: 2, minWidth: 100 }}
        >
          {searching ? "Searching…" : "Search"}
        </Button>
        <Button
          variant="contained"
          startIcon={<AddRoundedIcon />}
          onClick={onCreate}
          sx={{
            borderRadius: 2,
            boxShadow: "0 4px 14px rgba(99, 102, 241, 0.35)",
            "&:hover": {
              boxShadow: "0 6px 20px rgba(99, 102, 241, 0.4)",
            },
          }}
        >
          New note
        </Button>
      </Stack>
    </Stack>
  );
}
