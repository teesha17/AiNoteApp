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

export default function Login() {
    const navigate = useNavigate();
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
            }
            navigate("/notes", { replace: true });
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
                        Welcome back
                    </Typography>
                    <Typography variant="body2" color="text.secondary" className="mt-1">
                        Sign in to AiNote
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

                <Box component="form" onSubmit={handleLogin} className="flex flex-col gap-3">
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
                        sx={{ mt: 1, py: 1.5, borderRadius: 2 }}
                    >
                        {loading ? "Signing in…" : "Sign in"}
                    </Button>
                    <Typography variant="body2" color="text.secondary" className="text-center mt-3">
                        Don&apos;t have an account?{" "}
                        <Link
                            to="/register"
                            className="text-primary-600 font-medium no-underline hover:underline"
                            style={{ color: "var(--mui-palette-primary-main)" }}
                        >
                            Create one
                        </Link>
                    </Typography>
                </Box>
            </Paper>
        </div>
    );
}
