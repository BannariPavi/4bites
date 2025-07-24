import React, { useState } from "react";
import { Box, Typography, Paper, Button, Avatar, Stack, Chip, Divider, Container } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PaidIcon from '@mui/icons-material/Paid';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Header from './Header';
import ModernBg from './ModernBg';

// Mock data for events I'm hosting
const myHostedEvents = [
  {
    id: 1,
    title: "Going to Pizza Palace",
    time: "7:00 PM",
    location: "Bangalore, Indiranagar",
    spots: 3,
    description: "Join me for delicious pizza!",
    attendees: ["You", "Rahul", "Priya"],
  },
  {
    id: 2,
    title: "Homemade Pasta Night",
    time: "6:30 PM",
    location: "Bangalore, Koramangala",
    spots: 2,
    description: "Fresh pasta with homemade sauce.",
    attendees: ["You", "Ethan"],
  },
];

// Mock data for events I've joined
const myJoinedEvents = [
  {
    id: 3,
    title: "Dinner with Olivia",
    hostName: "Olivia",
    hostAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
    time: "7:00 PM",
    location: "Bangalore, Indiranagar",
    totalAmount: 1200,
    split: 300,
    paid: false,
    people: ["You", "Olivia", "Ethan", "Chloe"],
  },
  {
    id: 4,
    title: "Lunch with Ethan",
    hostName: "Ethan",
    hostAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
    time: "1:00 PM",
    location: "Bangalore, Koramangala",
    totalAmount: 800,
    split: 400,
    paid: true,
    people: ["You", "Ethan"],
  },
];

function MyEvents() {
  const navigate = useNavigate();
  const [hostedEvents, setHostedEvents] = useState(myHostedEvents);
  const [joinedEvents, setJoinedEvents] = useState(myJoinedEvents);

  const handleDeleteHostedEvent = (id) => {
    setHostedEvents(prev => prev.filter(event => event.id !== id));
  };

  const handlePayment = (event) => {
    navigate('/pay', {
      state: {
        eventTitle: event.title,
        hostName: event.hostName,
        hostAvatar: event.hostAvatar,
        venue: event.location,
        totalAmount: event.totalAmount,
        people: event.people,
        paidBy: event.hostName
      }
    });
  };

  return (
    <>
      <Header />
      <ModernBg>
        <Container maxWidth="md" sx={{ pt: 2, pb: 6, mt: 0 }}>
          <Typography variant="h5" fontWeight={900} sx={{ mb: 3, color: '#e94f37', letterSpacing: 1 }}>
            My Events
          </Typography>

          {/* Events I'm Hosting */}
          <Paper elevation={1} sx={{ mb: 4, p: 3, borderRadius: 4, background: '#fff' }}>
            <Typography variant="h6" fontWeight={700} sx={{ mb: 2, color: '#222' }}>Events I'm Hosting</Typography>
            {hostedEvents.length === 0 ? (
              <Typography color="text.secondary" align="center">No hosted events</Typography>
            ) : (
              <Stack spacing={2}>
                {hostedEvents.map(event => (
                  <Box key={event.id} sx={{ display: 'flex', alignItems: 'center', background: '#fff7e6', borderRadius: 3, p: 2, gap: 2 }}>
                    <Box sx={{ flex: 1 }}>
                      <Typography fontWeight={700} sx={{ color: '#222', fontSize: 17 }}>{event.title}</Typography>
                      <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 0.5 }}>
                        <CalendarTodayIcon fontSize="small" sx={{ color: '#fcb900' }} />
                        <Typography variant="body2">{event.time}</Typography>
                        <LocationOnIcon fontSize="small" sx={{ color: '#e94f37', ml: 1 }} />
                        <Typography variant="body2">{event.location}</Typography>
                      </Stack>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>{event.description}</Typography>
                      <Typography variant="body2" sx={{ mt: 0.5, color: '#43cea2', fontWeight: 700 }}>
                        {event.attendees.length} attendees: {event.attendees.join(', ')}
                      </Typography>
                    </Box>
                    <Stack direction="row" spacing={1}>
                      <Button variant="outlined" size="small" startIcon={<EditIcon />} sx={{ color: '#fcb900', borderColor: '#fcb900' }}>
                        Edit
                      </Button>
                      <Button variant="outlined" size="small" startIcon={<DeleteIcon />} sx={{ color: '#e94f37', borderColor: '#e94f37' }} onClick={() => handleDeleteHostedEvent(event.id)}>
                        Delete
                      </Button>
                    </Stack>
                  </Box>
                ))}
              </Stack>
            )}
          </Paper>

          <Divider sx={{ my: 3 }} />

          {/* Events I've Joined */}
          <Paper elevation={1} sx={{ mb: 4, p: 3, borderRadius: 4, background: '#fff' }}>
            <Typography variant="h6" fontWeight={700} sx={{ mb: 2, color: '#222' }}>Events I've Joined</Typography>
            {joinedEvents.length === 0 ? (
              <Typography color="text.secondary" align="center">No joined events</Typography>
            ) : (
              <Stack spacing={2}>
                {joinedEvents.map(event => (
                  <Box key={event.id} sx={{ display: 'flex', alignItems: 'center', background: event.paid ? '#f5fff7' : '#fff0f0', borderRadius: 3, p: 2, gap: 2 }}>
                    <Avatar src={event.hostAvatar} alt={event.hostName} sx={{ width: 48, height: 48, border: '2px solid #fcb900' }} />
                    <Box sx={{ flex: 1 }}>
                      <Typography fontWeight={700} sx={{ color: '#222', fontSize: 17 }}>{event.title}</Typography>
                      <Typography variant="body2" color="text.secondary">Hosted by {event.hostName}</Typography>
                      <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 0.5 }}>
                        <CalendarTodayIcon fontSize="small" sx={{ color: '#fcb900' }} />
                        <Typography variant="body2">{event.time}</Typography>
                        <LocationOnIcon fontSize="small" sx={{ color: '#e94f37', ml: 1 }} />
                        <Typography variant="body2">{event.location}</Typography>
                      </Stack>
                      <Typography variant="body2" sx={{ mt: 0.5, color: '#e94f37', fontWeight: 700 }}>
                        Your split: ₹{event.split}
                      </Typography>
                    </Box>
                    {event.paid ? (
                      <Chip icon={<PaidIcon />} label="Paid" color="success" sx={{ fontWeight: 700 }} />
                    ) : (
                      <Button
                        variant="contained"
                        sx={{ background: 'linear-gradient(90deg, #fcb900 0%, #e94f37 100%)', color: '#fff', fontWeight: 700 }}
                        onClick={() => handlePayment(event)}
                      >
                        Pay ₹{event.split}
                      </Button>
                    )}
                  </Box>
                ))}
              </Stack>
            )}
          </Paper>
        </Container>
      </ModernBg>
    </>
  );
}

export default MyEvents; 