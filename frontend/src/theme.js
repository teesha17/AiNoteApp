import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#6366f1",
      light: "#818cf8",
      dark: "#4f46e5",
      contrastText: "#fff",
    },
    secondary: {
      main: "#64748b",
      light: "#94a3b8",
      dark: "#475569",
    },
    background: {
      default: "#f8fafc",
      paper: "#ffffff",
    },
    success: {
      main: "#10b981",
    },
    error: {
      main: "#ef4444",
    },
    text: {
      primary: "#0f172a",
      secondary: "#64748b",
      disabled: "#94a3b8",
    },
    divider: "rgba(15, 23, 42, 0.08)",
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: '"Plus Jakarta Sans", "Inter", "Segoe UI", system-ui, sans-serif',
    h4: {
      fontWeight: 700,
      letterSpacing: "-0.02em",
    },
    h5: {
      fontWeight: 700,
      letterSpacing: "-0.01em",
    },
    h6: {
      fontWeight: 600,
    },
    subtitle1: {
      fontWeight: 600,
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },
  shadows: [
    "none",
    "0 1px 2px rgba(15, 23, 42, 0.05)",
    "0 1px 3px rgba(15, 23, 42, 0.08)",
    "0 4px 6px -1px rgba(15, 23, 42, 0.08), 0 2px 4px -2px rgba(15, 23, 42, 0.06)",
    "0 10px 15px -3px rgba(15, 23, 42, 0.08), 0 4px 6px -4px rgba(15, 23, 42, 0.06)",
    "0 20px 25px -5px rgba(15, 23, 42, 0.08), 0 8px 10px -6px rgba(15, 23, 42, 0.06)",
    "0 25px 50px -12px rgba(15, 23, 42, 0.12)",
    "0 25px 50px -12px rgba(15, 23, 42, 0.12)",
    "0 25px 50px -12px rgba(15, 23, 42, 0.12)",
    "0 25px 50px -12px rgba(15, 23, 42, 0.12)",
    "0 25px 50px -12px rgba(15, 23, 42, 0.12)",
    "0 25px 50px -12px rgba(15, 23, 42, 0.12)",
    "0 25px 50px -12px rgba(15, 23, 42, 0.12)",
    "0 25px 50px -12px rgba(15, 23, 42, 0.12)",
    "0 25px 50px -12px rgba(15, 23, 42, 0.12)",
    "0 25px 50px -12px rgba(15, 23, 42, 0.12)",
    "0 25px 50px -12px rgba(15, 23, 42, 0.12)",
    "0 25px 50px -12px rgba(15, 23, 42, 0.12)",
    "0 25px 50px -12px rgba(15, 23, 42, 0.12)",
    "0 25px 50px -12px rgba(15, 23, 42, 0.12)",
    "0 25px 50px -12px rgba(15, 23, 42, 0.12)",
    "0 25px 50px -12px rgba(15, 23, 42, 0.12)",
    "0 25px 50px -12px rgba(15, 23, 42, 0.12)",
    "0 25px 50px -12px rgba(15, 23, 42, 0.12)",
    "0 25px 50px -12px rgba(15, 23, 42, 0.12)",
  ],
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#f8fafc",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: "10px 20px",
          boxShadow: "none",
          transition: "all 0.2s ease",
          "&:hover": {
            boxShadow: "0 4px 14px rgba(99, 102, 241, 0.25)",
            transform: "translateY(-1px)",
          },
          "&:active": {
            transform: "translateY(0)",
          },
        },
        contained: {
          "&:hover": {
            boxShadow: "0 4px 14px rgba(99, 102, 241, 0.35)",
          },
        },
        outlined: {
          "&:hover": {
            borderColor: "primary.main",
            bgcolor: "rgba(99, 102, 241, 0.04)",
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
        size: "medium",
      },
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 10,
            backgroundColor: "#fff",
            transition: "border-color 0.2s, box-shadow 0.2s",
            "&:hover": { backgroundColor: "#fff" },
            "&.Mui-focused": { backgroundColor: "#fff" },
            "& .MuiOutlinedInput-input": { backgroundColor: "transparent" },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "primary.light",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderWidth: 2,
              borderColor: "primary.main",
            },
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0 1px 3px 0 rgba(15, 23, 42, 0.06), 0 1px 2px -1px rgba(15, 23, 42, 0.06)",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          boxShadow: "0 1px 3px 0 rgba(15, 23, 42, 0.06), 0 1px 2px -1px rgba(15, 23, 42, 0.04)",
          transition: "box-shadow 0.25s ease, transform 0.25s ease, border-color 0.25s ease",
          "&:hover": {
            boxShadow: "0 12px 24px -8px rgba(15, 23, 42, 0.1), 0 4px 8px -4px rgba(15, 23, 42, 0.06)",
            transform: "translateY(-2px)",
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "0 1px 3px 0 rgba(15, 23, 42, 0.06)",
          backdropFilter: "blur(12px)",
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 20,
          padding: 0,
          overflow: "hidden",
          boxShadow: "0 25px 50px -12px rgba(15, 23, 42, 0.2)",
        },
        root: {
          "& .MuiDialogContent-root": {
            padding: "8px 24px 24px",
          },
          "& .MuiDialogTitle-root": {
            padding: "24px 24px 8px",
            fontSize: "1.25rem",
            fontWeight: 700,
          },
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});
