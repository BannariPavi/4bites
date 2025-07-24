import React, { useState } from "react";
import axios from "axios";
import { Box, Button, TextField, Typography, Snackbar, Alert, Paper, Fade } from "@mui/material";
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [token, setToken] = useState("");
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);

  const navigate = useNavigate();

  React.useEffect(() => {
    setShow(true);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/feed");
  };

  const handleClose = () => setOpen(false);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #474554 0%, #fcb900 60%, #e94f37 100%)",
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
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
              margin="normal"
              autoFocus
              sx={{ background: 'rgba(252,185,0,0.08)', borderRadius: 1 }}
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
              margin="normal"
              sx={{ background: 'rgba(252,185,0,0.08)', borderRadius: 1 }}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 2, mb: 1, fontWeight: 700, fontSize: '1.1rem', background: 'linear-gradient(90deg, #fcb900 0%, #e94f37 100%)', color: '#fff', letterSpacing: 1 }}
            >
              Login
            </Button>
          </form>
          <Snackbar open={open} autoHideDuration={4000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} TransitionComponent={Fade}>
            {error ? (
              <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                {error}
              </Alert>
            ) : token ? (
              <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                Login successful! Token saved.
              </Alert>
            ) : null}
          </Snackbar>
        </Paper>
      </Fade>
    </Box>
  );
}

export default Login; 