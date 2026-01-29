import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import AutoStoriesOutlined from "@mui/icons-material/AutoStoriesOutlined";

export default function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await api.post("/auth/register", { email, password });
      navigate("/", { replace: true });
    } catch (err) {
      setError(
        err.response?.data?.message ??
          err.response?.data?.error ??
          err.message ??
          "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-svh flex items-center justify-center bg-gradient-to-br from-slate-50 via-indigo-50/30 to-slate-100 px-4 py-8">
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: 420,
          p: 4,
          borderRadius: 3,
          border: "1px solid",
          borderColor: "divider",
          bgcolor: "background.paper",
          boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.08)",
        }}
      >
        <Box className="flex flex-col items-center mb-6">
          <Box
            className="flex items-center justify-center w-14 h-14 rounded-2xl mb-4"
            sx={{ bgcolor: "primary.main", color: "primary.contrastText" }}
          >
            <AutoStoriesOutlined sx={{ fontSize: 32 }} />
          </Box>
          <Typography variant="h5" fontWeight={700} color="text.primary">
            Create account
          </Typography>
          <Typography variant="body2" color="text.secondary" className="mt-1">
            Get started with AiNote
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

        <Box component="form" onSubmit={handleRegister} className="flex flex-col gap-3">
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
            autoComplete="email"
            autoFocus
          />
          <TextField
            label="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
            autoComplete="new-password"
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
            sx={{ mt: 1, py: 1.5, borderRadius: 2 }}
          >
            {loading ? "Creating account…" : "Create account"}
          </Button>
          <Typography variant="body2" color="text.secondary" className="text-center mt-3">
            Already have an account?{" "}
            <Link
              to="/"
              className="font-medium no-underline hover:underline"
              style={{ color: "var(--mui-palette-primary-main)" }}
            >
              Sign in
            </Link>
          </Typography>
        </Box>
      </Paper>
    </div>
  );
}
