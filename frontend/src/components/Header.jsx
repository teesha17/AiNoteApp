import { AppBar, Toolbar, Typography, Button, Stack, Box } from "@mui/material";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { useNavigate } from "react-router-dom";

export default function Header({onlogout}) {
    const navigate = useNavigate();
    const user = localStorage.getItem("email");

    return (
        <AppBar
            position="sticky"
            elevation={0}
            sx={{ bgcolor: "background.paper", color: "text.primary", borderBottom: 1, borderColor: "divider" }}
        >
            <Toolbar>
                <Stack direction="row" alignItems="center" spacing={1.5} onClick={() => navigate("/notes")} sx={{ cursor: "pointer", flex: 1 }}>
                    <Box
                        sx={{
                            width: 40,
                            height: 40,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 1.5,
                            bgcolor: "primary.main",
                            color: "primary.contrastText",
                        }}
                    >
                        <AutoStoriesOutlinedIcon />
                    </Box>
                    <Typography fontWeight={700} variant="h6" component="span">
                        AiNote
                    </Typography>
                </Stack>

                <Stack direction="row" alignItems="center" spacing={2}>
                    {user && (
                        <Typography variant="body2" color="text.secondary" noWrap sx={{ maxWidth: 180 }}>
                            {user}
                        </Typography>
                    )}
                    <Button
                        variant="outlined"
                        startIcon={<LogoutRoundedIcon />}
                        onClick={onlogout}
                        sx={{ textTransform: "none", fontWeight: 600, borderColor: "divider" }}
                    >
                        Logout
                    </Button>
                </Stack>
            </Toolbar>
        </AppBar>
    );
}
