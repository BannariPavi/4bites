import React from "react";
import { Box, Typography, Paper, Container, Stack, Chip, Avatar, Divider } from "@mui/material";
import RestaurantIcon from '@mui/icons-material/Restaurant';
import PersonIcon from '@mui/icons-material/Person';
import PaidIcon from '@mui/icons-material/Paid';
import Header from './Header';

const plateHistory = [
  {
    id: 1,
    title: "Dinner with Olivia",
    date: "2024-06-01",
    location: "Bangalore, Indiranagar",
    totalAmount: 1200,
    people: ["You", "Olivia", "Ethan", "Chloe"],
    paidBy: "You",
    split: 300,
    notes: "Great food, split equally."
  },
  {
    id: 2,
    title: "Lunch with Ethan",
    date: "2024-05-20",
    location: "Bangalore, Koramangala",
    totalAmount: 800,
    people: ["You", "Ethan"],
    paidBy: "Ethan",
    split: 400,
    notes: ""
  }
];

const totalSpent = plateHistory.reduce((sum, h) => sum + h.totalAmount, 0);
const totalMeals = plateHistory.length;

function PlateHistory() {
  return (
    <>
      <Header />
      <Container maxWidth="md" sx={{ pt: 2, pb: 8, mt: 0 }}>
        <Typography variant="h4" fontWeight={900} sx={{ mb: 2, color: '#e94f37', letterSpacing: 1, textAlign: 'center' }}>
          Plate History
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
          <Paper elevation={2} sx={{ px: 4, py: 2, borderRadius: 3, display: 'flex', gap: 4, alignItems: 'center', background: 'linear-gradient(90deg, #fff 70%, #ffe5e0 100%)' }}>
            <Typography sx={{ fontWeight: 700, color: '#e94f37', fontSize: 18 }}>Total spent: ₹{totalSpent}</Typography>
            <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
            <Typography sx={{ fontWeight: 700, color: '#43cea2', fontSize: 18 }}>Total meals: {totalMeals}</Typography>
          </Paper>
        </Box>
        <Stack spacing={4} alignItems="center">
          {plateHistory.map(h => (
            <Paper key={h.id}
              sx={{
                width: '100%',
                maxWidth: 500,
                p: 4,
                borderRadius: 5,
                boxShadow: '0 8px 32px 0 rgba(233,79,55,0.10)',
                background: 'linear-gradient(120deg, #fff 70%, #ffe5e0 100%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                position: 'relative'
              }}>
              <Avatar sx={{
                bgcolor: '#e94f37',
                width: 60,
                height: 60,
                position: 'absolute',
                left: -30,
                top: 30,
                boxShadow: '0 4px 16px 0 rgba(233,79,55,0.15)'
              }}>
                <RestaurantIcon sx={{ fontSize: 32 }} />
              </Avatar>
              <Box sx={{ width: '100%', pl: 6 }}>
                <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 1 }}>
                  <Typography fontWeight={700} sx={{ fontSize: 22 }}>{h.title}</Typography>
                  <Chip label={h.date} size="small" sx={{ bgcolor: '#fcb900', color: '#fff', fontWeight: 700 }} />
                </Stack>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  <PersonIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />
                  {h.location}
                </Typography>
                <Divider sx={{ my: 1 }} />
                <Typography variant="body1" sx={{ fontWeight: 700, color: '#e94f37' }}>
                  Total: ₹{h.totalAmount}
                </Typography>
                <Typography variant="body1" sx={{ color: '#43cea2', fontWeight: 700 }}>
                  Split: ₹{h.split} each
                </Typography>
                <Stack direction="row" spacing={1} sx={{ my: 1 }}>
                  {h.people.map(p => (
                    <Chip key={p} label={p} size="small" sx={{ bgcolor: '#f5f6fa', fontWeight: 700 }} />
                  ))}
                </Stack>
                <Chip
                  icon={<PaidIcon />}
                  label={`Paid by: ${h.paidBy}`}
                  size="small"
                  sx={{ bgcolor: '#43cea2', color: '#fff', fontWeight: 700, mb: 1 }}
                />
                {h.notes && <Typography variant="body2" sx={{ fontStyle: 'italic', color: '#474554', mt: 1 }}>Notes: {h.notes}</Typography>}
              </Box>
            </Paper>
          ))}
        </Stack>
      </Container>
    </>
  );
}

export default PlateHistory; 