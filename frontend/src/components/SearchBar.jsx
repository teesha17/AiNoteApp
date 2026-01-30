import { Stack, TextField, Button, InputAdornment } from "@mui/material";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

export default function SearchBar({ search, setSearch, onSearch, onCreate, searching }) {
  return (
    <Stack component="form" onSubmit={onSearch} direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mb: 4 }}>
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
            <Button variant="contained" startIcon={<AddRoundedIcon />} onClick={onCreate}>
              New note
            </Button>
          </Stack>
        </Stack>
  );
}
