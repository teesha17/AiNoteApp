import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Alert,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AutoStoriesRoundedIcon from "@mui/icons-material/AutoStoriesRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await api.post("/auth/login", { email, password });
      const token = res.data?.token ?? res.data?.accessToken;
      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("email", email);
        window.location.replace("/notes");
      }
    } catch (err) {
      setError(
        err.response?.data?.message ??
          err.response?.data?.error ??
          err.message ??
          "Login failed"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
        py: 4,
        background: "linear-gradient(135deg, #f0f4ff 0%, #e8ecff 40%, #f8fafc 100%)",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: "-20%",
          right: "-10%",
          width: "50%",
          height: "60%",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        },
        "&::after": {
          content: '""',
          position: "absolute",
          bottom: "-15%",
          left: "-5%",
          width: "40%",
          height: "50%",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99, 102, 241, 0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        },
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: 420,
          p: { xs: 3, sm: 4 },
          borderRadius: 3,
          border: "1px solid",
          borderColor: "rgba(99, 102, 241, 0.12)",
          bgcolor: "rgba(255, 255, 255, 0.85)",
          backdropFilter: "blur(20px)",
          boxShadow: "0 25px 50px -12px rgba(15, 23, 42, 0.1), 0 0 0 1px rgba(15, 23, 42, 0.03)",
          position: "relative",
          zIndex: 1,
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 4 }}>
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 2,
              background: "linear-gradient(135deg, #6366f1 0%, #818cf8 100%)",
              color: "#fff",
              boxShadow: "0 8px 24px -4px rgba(99, 102, 241, 0.35)",
            }}
          >
            <AutoStoriesRoundedIcon sx={{ fontSize: 28 }} />
          </Box>
          <Typography variant="h5" fontWeight={700} color="text.primary" letterSpacing="-0.02em">
            Welcome back
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Sign in to AiNote to continue
          </Typography>
        </Box>

        {error && (
          <Alert
            severity="error"
            onClose={() => setError("")}
            sx={{ mb: 2, borderRadius: 2 }}
          >
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleLogin} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
            autoComplete="email"
            autoFocus
            size="medium"
          />
          <TextField
            label="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
            autoComplete="current-password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword((p) => !p)}
                    edge="end"
                    aria-label="toggle password visibility"
                    size="small"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={loading}
            fullWidth
            endIcon={!loading && <ArrowForwardRoundedIcon />}
            sx={{ mt: 1, py: 1.5, borderRadius: 2 }}
          >
            {loading ? "Signing in…" : "Sign in"}
          </Button>
          <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center", mt: 2 }}>
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              style={{
                color: "#6366f1",
                fontWeight: 600,
                textDecoration: "none",
              }}
              className="hover-underline"
            >
              Create one
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}
