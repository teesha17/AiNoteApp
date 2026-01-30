import { AppBar, Toolbar, Typography, Button, Stack, Box } from "@mui/material";
import AutoStoriesRoundedIcon from "@mui/icons-material/AutoStoriesRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { useNavigate } from "react-router-dom";

export default function Header({ onlogout }) {
  const navigate = useNavigate();
  const user = localStorage.getItem("email");

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: "rgba(255, 255, 255, 0.9)",
        backdropFilter: "blur(12px)",
        color: "text.primary",
        borderBottom: "1px solid",
        borderColor: "rgba(15, 23, 42, 0.08)",
      }}
    >
      <Toolbar sx={{ minHeight: { xs: 56, sm: 64 }, px: { xs: 2, sm: 3 } }}>
        <Stack
          direction="row"
          alignItems="center"
          spacing={1.5}
          onClick={() => navigate("/notes")}
          sx={{ cursor: "pointer", flex: 1 }}
        >
          <Box
            sx={{
              width: 40,
              height: 40,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 1.5,
              background: "linear-gradient(135deg, #6366f1 0%, #818cf8 100%)",
              color: "#fff",
              boxShadow: "0 4px 12px -2px rgba(99, 102, 241, 0.35)",
            }}
          >
            <AutoStoriesRoundedIcon sx={{ fontSize: 22 }} />
          </Box>
          <Typography fontWeight={700} variant="h6" component="span" letterSpacing="-0.02em">
            AiNote
          </Typography>
        </Stack>

        <Stack direction="row" alignItems="center" spacing={2}>
          {user && (
            <Typography
              variant="body2"
              color="text.secondary"
              noWrap
              sx={{
                maxWidth: 180,
                display: { xs: "none", sm: "block" },
                fontWeight: 500,
              }}
            >
              {user}
            </Typography>
          )}
          <Button
            variant="outlined"
            startIcon={<LogoutRoundedIcon />}
            onClick={onlogout}
            sx={{
              textTransform: "none",
              fontWeight: 600,
              borderRadius: 2,
              borderColor: "rgba(15, 23, 42, 0.12)",
              "&:hover": {
                borderColor: "primary.main",
                bgcolor: "rgba(99, 102, 241, 0.04)",
              },
            }}
          >
            Logout
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
