import React from "react";
import ModernBg from './ModernBg';
import { Box, Typography, Paper, Fade } from "@mui/material";

function Dashboard() {
  const token = localStorage.getItem("access_token");
  const [show, setShow] = React.useState(false);
  React.useEffect(() => { setShow(true); }, []);

  if (!token) {
    return (
      <ModernBg>
        <Box
          sx={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Fade in={show} timeout={900}>
            <Paper elevation={6} sx={{ p: { xs: 2, sm: 4 }, minWidth: { xs: 'unset', sm: 370 }, borderRadius: 3, width: { xs: '95vw', sm: 'auto' }, background: 'rgba(255,255,255,0.97)' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
                <span style={{ fontSize: 48, marginBottom: 8 }}>🍽️</span>
                <Typography variant="h3" align="center" fontWeight={900} sx={{ color: '#474554', letterSpacing: 2, fontFamily: 'Montserrat, sans-serif', mb: 0 }}>
                  SPLITEBITE
                </Typography>
                <Typography variant="subtitle1" align="center" sx={{ color: '#e94f37', fontWeight: 500, fontFamily: 'Montserrat, sans-serif', mt: 0 }}>
                  ONE BITE, MANY FRIENDS.
                </Typography>
              </Box>
              <Typography align="center">Please log in to view the dashboard.</Typography>
            </Paper>
          </Fade>
        </Box>
      </ModernBg>
    );
  }

  return (
    <ModernBg>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Fade in={show} timeout={900}>
          <Paper elevation={6} sx={{ p: { xs: 2, sm: 4 }, minWidth: { xs: 'unset', sm: 370 }, borderRadius: 3, width: { xs: '95vw', sm: 'auto' }, background: 'rgba(255,255,255,0.97)' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
              <span style={{ fontSize: 48, marginBottom: 8 }}>🍽️</span>
              <Typography variant="h3" align="center" fontWeight={900} sx={{ color: '#474554', letterSpacing: 2, fontFamily: 'Montserrat, sans-serif', mb: 0 }}>
                SPLITEBITE
              </Typography>
              <Typography variant="subtitle1" align="center" sx={{ color: '#e94f37', fontWeight: 500, fontFamily: 'Montserrat, sans-serif', mt: 0 }}>
                ONE BITE, MANY FRIENDS.
              </Typography>
            </Box>
            <Typography align="center">Welcome! You are logged in.</Typography>
          </Paper>
        </Fade>
      </Box>
    </ModernBg>
  );
}

export default Dashboard; 