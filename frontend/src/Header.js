import React from "react";
import { useState, useEffect } from 'react';
import { AppBar, Toolbar, Box, Typography, Button, IconButton, Badge, Avatar, InputBase } from "@mui/material";
import { Link as RouterLink, useLocation } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

function Header({ onNotificationsClick }) {
  const location = useLocation();
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDateTime = (date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    }) + ' • ' + date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  // Example: hardcoded notification count and avatar
  const unreadCount = 2;
  const avatarUrl = "https://randomuser.me/api/portraits/women/44.jpg";

  return (
    <AppBar position="static" elevation={1} sx={{ background: '#fff', color: '#222', boxShadow: '0 2px 8px 0 rgba(44,62,80,0.07)' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', px: { xs: 1, sm: 3 } }}>
        {/* Left: Logo and app name */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <span style={{ fontSize: 32, marginRight: 8, lineHeight: 1 }}>🍽️</span>
          <Typography variant="h6" fontWeight={900} sx={{ letterSpacing: 1, fontFamily: 'Montserrat, sans-serif', color: '#222', mr: 3 }}>
            Splitbite
          </Typography>
          <Button component={RouterLink} to="/feed" sx={{ color: location.pathname === '/feed' ? '#e94f37' : '#222', fontWeight: 600, textTransform: 'none', mx: 1 }} disableRipple>Home</Button>
          <Button component={RouterLink} to="/invites" sx={{ color: location.pathname === '/invites' ? '#e94f37' : '#222', fontWeight: 600, textTransform: 'none', mx: 1 }} disableRipple>Invites</Button>
          <Button component={RouterLink} to="/myevents" sx={{ color: location.pathname === '/myevents' ? '#e94f37' : '#222', fontWeight: 600, textTransform: 'none', mx: 1 }} disableRipple>MyEvents</Button>
          <Button component={RouterLink} to="/history" sx={{ color: location.pathname === '/history' ? '#e94f37' : '#222', fontWeight: 600, textTransform: 'none', mx: 1 }} disableRipple>History</Button>
        </Box>
        {/* Right: Date/Time, notifications, avatar */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="body2" sx={{ color: '#474554', fontWeight: 500, background: '#f5f6fa', px: 2, py: 1, borderRadius: 2 }}>
            📅 {formatDateTime(currentDateTime)}
          </Typography>
          <Badge badgeContent={unreadCount} color="error" overlap="circular" sx={{ mr: 1 }}>
            <IconButton sx={{ background: '#f5f6fa' }} onClick={onNotificationsClick}>
              <NotificationsNoneIcon sx={{ color: '#b0b0b0' }} />
            </IconButton>
          </Badge>
          <Avatar src={avatarUrl} alt="Profile" sx={{ width: 36, height: 36, border: '2px solid #fcb900' }} />
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header; 