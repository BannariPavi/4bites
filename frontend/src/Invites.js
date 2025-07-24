import React, { useState } from "react";
import { Box, Typography, Paper, Button, Avatar, Stack, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Container, Chip } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import ModernBg from './ModernBg';
import Header from './Header';

const mockInvites = [
  {
    id: 1,
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    name: "Olivia",
    message: "Olivia invited you to dinner",
    time: "2m ago",
    status: null, // 'accepted' | 'declined'
    event: {
      date: "Saturday, July 20, 7:00 PM",
      location: "Bangalore, Indiranagar",
      cuisine: "Italian",
      details: "Let's enjoy Italian food together!"
    },
    bio: "Foodie, chef, and host. Loves Italian cuisine!"
  },
  {
    id: 2,
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    name: "Ethan",
    message: "Ethan invited you to lunch",
    time: "1h ago",
    status: "accepted",
    event: {
      date: "Sunday, July 21, 1:00 PM",
      location: "Bangalore, Koramangala",
      cuisine: "Mexican",
      details: "Join me for a spicy Mexican lunch!"
    },
    bio: "Adventurous eater. Always up for new cuisines."
  },
  {
    id: 3,
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    name: "Chloe",
    message: "Chloe invited you to dinner",
    time: "3h ago",
    status: "declined",
    event: {
      date: "Monday, July 22, 6:30 PM",
      location: "Bangalore, Whitefield",
      cuisine: "Indian",
      details: "Home-cooked Indian feast!"
    },
    bio: "Home chef. Loves to host and meet new people."
  },
];

function Invites() {
  const [invites, setInvites] = useState(mockInvites);
  const [profileDialog, setProfileDialog] = useState({ open: false, invite: null });

  const handleAction = (id, action) => {
    setInvites(invites => invites.map(i => i.id === id ? { ...i, status: action } : i));
  };

  const pending = invites.filter(i => !i.status);
  const accepted = invites.filter(i => i.status === 'accepted');
  const declined = invites.filter(i => i.status === 'declined');

  return (
    <>
      <Header />
      <ModernBg>
        <Container maxWidth="md" sx={{ pt: 2, pb: 6, mt: 0 }}>
          <Typography variant="h5" fontWeight={900} sx={{ mb: 1.5, color: '#e94f37', letterSpacing: 1 }}>
            Invites
          </Typography>
          {/* Pending Invites */}
          {pending.length > 0 && (
            <Paper elevation={1} sx={{ mb: 4, p: 3, borderRadius: 4, background: '#fff', position: 'relative', zIndex: 1 }}>
              <Typography variant="h6" fontWeight={700} sx={{ mb: 2, color: '#222' }}>Pending</Typography>
              {pending.map(i => (
                <Box key={i.id} sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 1, borderRadius: 2, background: '#fff7e6', mb: 2 }}>
                  <Avatar src={i.avatar} alt={i.name} sx={{ width: 44, height: 44, border: '2px solid #fcb900', cursor: 'pointer' }} onClick={() => setProfileDialog({ open: true, invite: i })} />
                  <Box sx={{ flex: 1 }}>
                    <Typography fontWeight={700} sx={{ color: '#222', cursor: 'pointer' }} onClick={() => setProfileDialog({ open: true, invite: i })}>{i.message}</Typography>
                    <Typography variant="caption" color="text.secondary">{i.time}</Typography>
                  </Box>
                  <Stack direction="row" spacing={1}>
                    <Button size="small" variant="contained" sx={{ background: 'linear-gradient(90deg, #43cea2 0%, #185a9d 100%)', color: '#fff', fontWeight: 700, px: 2, borderRadius: 2, minWidth: 0 }} onClick={() => handleAction(i.id, 'accepted')}>Accept</Button>
                    <Button size="small" variant="outlined" sx={{ borderColor: '#e94f37', color: '#e94f37', fontWeight: 700, px: 2, borderRadius: 2, minWidth: 0 }} onClick={() => handleAction(i.id, 'declined')}>Decline</Button>
                  </Stack>
                </Box>
              ))}
            </Paper>
          )}
          {/* Accepted Invites */}
          {accepted.length > 0 && (
            <Paper elevation={1} sx={{ mb: 4, p: 3, borderRadius: 4, background: '#fff', position: 'relative', zIndex: 1 }}>
              <Typography variant="h6" fontWeight={700} sx={{ mb: 2, color: '#43cea2' }}>Accepted</Typography>
              {accepted.map(i => (
                <Box key={i.id} sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 1, borderRadius: 2, background: '#f5fff7', mb: 2 }}>
                  <Avatar src={i.avatar} alt={i.name} sx={{ width: 44, height: 44, border: '2px solid #43cea2', cursor: 'pointer' }} onClick={() => setProfileDialog({ open: true, invite: i })} />
                  <Box sx={{ flex: 1 }}>
                    <Typography fontWeight={700} sx={{ color: '#222', cursor: 'pointer' }} onClick={() => setProfileDialog({ open: true, invite: i })}>{i.message}</Typography>
                    <Typography variant="caption" color="text.secondary">{i.time}</Typography>
                  </Box>
                  <Chip label="Accepted" color="success" />
                </Box>
              ))}
            </Paper>
          )}
          {/* Declined Invites */}
          {declined.length > 0 && (
            <Paper elevation={1} sx={{ mb: 4, p: 3, borderRadius: 4, background: '#fff', position: 'relative', zIndex: 1 }}>
              <Typography variant="h6" fontWeight={700} sx={{ mb: 2, color: '#e94f37' }}>Declined</Typography>
              {declined.map(i => (
                <Box key={i.id} sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 1, borderRadius: 2, background: '#fff0f0', mb: 2 }}>
                  <Avatar src={i.avatar} alt={i.name} sx={{ width: 44, height: 44, border: '2px solid #e94f37', cursor: 'pointer' }} onClick={() => setProfileDialog({ open: true, invite: i })} />
                  <Box sx={{ flex: 1 }}>
                    <Typography fontWeight={700} sx={{ color: '#222', cursor: 'pointer' }} onClick={() => setProfileDialog({ open: true, invite: i })}>{i.message}</Typography>
                    <Typography variant="caption" color="text.secondary">{i.time}</Typography>
                  </Box>
                  <Chip label="Declined" color="error" />
                </Box>
              ))}
            </Paper>
          )}
          {/* Profile/Event Details Dialog */}
          <Dialog open={profileDialog.open} onClose={() => setProfileDialog({ open: false, invite: null })} maxWidth="xs" fullWidth>
            <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pr: 2 }}>
              Invite Details
              <IconButton onClick={() => setProfileDialog({ open: false, invite: null })}><CloseIcon /></IconButton>
            </DialogTitle>
            <DialogContent>
              {profileDialog.invite && (
                <Stack spacing={2} alignItems="center" sx={{ py: 2 }}>
                  <Avatar src={profileDialog.invite.avatar} alt={profileDialog.invite.name} sx={{ width: 80, height: 80, border: '2px solid #fcb900' }} />
                  <Typography fontWeight={700}>{profileDialog.invite.name}</Typography>
                  <Typography variant="body2" color="text.secondary">{profileDialog.invite.bio}</Typography>
                  <Typography variant="subtitle2" sx={{ mt: 2, color: '#e94f37' }}>Event Details</Typography>
                  <Typography variant="body2" color="text.secondary">{profileDialog.invite.event.date}</Typography>
                  <Typography variant="body2" color="text.secondary">{profileDialog.invite.event.location}</Typography>
                  <Typography variant="body2" color="text.secondary">{profileDialog.invite.event.cuisine} | {profileDialog.invite.event.details}</Typography>
                </Stack>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setProfileDialog({ open: false, invite: null })} color="inherit">Close</Button>
            </DialogActions>
          </Dialog>
        </Container>
      </ModernBg>
    </>
  );
}

export default Invites; 