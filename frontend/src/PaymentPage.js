import React, { useState, useEffect } from "react";
import { Box, Typography, Paper, Button, Divider, Chip, Avatar, Stack, Alert } from "@mui/material";
import { useLocation, useNavigate } from 'react-router-dom';
import PaidIcon from '@mui/icons-material/Paid';

// Razorpay script loader
function loadRazorpayScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  // Expecting payment details to be passed via location.state
  const {
    eventTitle = "Dinner with Olivia",
    hostName = "Olivia",
    hostAvatar = "https://randomuser.me/api/portraits/women/44.jpg",
    venue = "Bangalore, Indiranagar",
    totalAmount = 1200,
    people = ["You", "Olivia", "Ethan", "Chloe"],
    paidBy = "You",
  } = location.state || {};
  const split = Math.round(totalAmount / people.length);
  // Payment status for each user
  const [paymentStatus, setPaymentStatus] = useState(() => Object.fromEntries(people.map(p => [p, false])));

  // Mock current user
  const currentUser = "You";
  const isHost = hostName === currentUser || currentUser === "You";

  useEffect(() => {
    loadRazorpayScript("https://checkout.razorpay.com/v1/checkout.js");
  }, []);

  const handleRazorpayPay = async () => {
    const res = await loadRazorpayScript("https://checkout.razorpay.com/v1/checkout.js");
    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }
    const options = {
      key: "rzp_test_1DP5mmOlF5G5ag", // Razorpay test key
      amount: split * 100, // in paise
      currency: "INR",
      name: eventTitle,
      description: `Pay your split to ${hostName}`,
      image: hostAvatar,
      handler: function (response) {
        setPaymentStatus(prev => ({ ...prev, [currentUser]: true }));
      },
      prefill: {
        name: currentUser,
        email: "test@example.com",
        contact: "9999999999"
      },
      notes: {
        event: eventTitle,
        host: hostName
      },
      theme: {
        color: "#e94f37"
      }
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handleUserPay = async (user) => {
    const res = await loadRazorpayScript("https://checkout.razorpay.com/v1/checkout.js");
    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }
    const options = {
      key: "rzp_test_1DP5mmOlF5G5ag",
      amount: split * 100,
      currency: "INR",
      name: eventTitle,
      description: `Pay your split to ${hostName}`,
      image: hostAvatar,
      handler: function (response) {
        setPaymentStatus(prev => ({ ...prev, [user]: true }));
      },
      prefill: {
        name: user,
        email: `${user.toLowerCase()}@example.com`,
        contact: "9999999999"
      },
      notes: {
        event: eventTitle,
        host: hostName
      },
      theme: {
        color: "#e94f37"
      }
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f6fa' }}>
      <Paper elevation={6} sx={{ p: 4, borderRadius: 4, minWidth: 350, maxWidth: 400, width: '100%', background: '#fff' }}>
        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
          <Avatar src={hostAvatar} alt={hostName} sx={{ width: 56, height: 56, border: '2px solid #fcb900' }} />
          <Box>
            <Typography variant="h6" fontWeight={700}>{eventTitle}</Typography>
            <Typography variant="body2" color="text.secondary">Host: {hostName}</Typography>
            <Typography variant="body2" color="text.secondary">Venue: {venue}</Typography>
          </Box>
        </Stack>
        <Divider sx={{ my: 2 }} />
        <Typography variant="body1" sx={{ fontWeight: 700, color: '#e94f37', mb: 1 }}>
          Total Bill: ₹{totalAmount}
        </Typography>
        <Typography variant="body1" sx={{ color: '#43cea2', fontWeight: 700, mb: 1 }}>
          Split: ₹{split} per person
        </Typography>
        <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
          {people.map(p => (
            <Chip key={p} label={p} size="small" sx={{ bgcolor: '#f5f6fa', fontWeight: 700 }} />
          ))}
        </Stack>
        <Chip
          icon={<PaidIcon />}
          label={`Paid by: ${paidBy}`}
          size="small"
          sx={{ bgcolor: '#43cea2', color: '#fff', fontWeight: 700, mb: 2 }}
        />
        <Divider sx={{ my: 2 }} />
        <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 700 }}>Pay your share:</Typography>
        <Stack spacing={2} sx={{ mb: 2 }}>
          {people.map(user => (
            <Box key={user} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Chip label={user} sx={{ minWidth: 80, fontWeight: 700 }} />
              {paymentStatus[user] ? (
                <Chip label="Paid" color="success" size="small" />
              ) : (
                <Button
                  variant="contained"
                  size="small"
                  sx={{ background: 'linear-gradient(90deg, #fcb900 0%, #e94f37 100%)', color: '#fff', fontWeight: 700 }}
                  onClick={() => handleUserPay(user)}
                  disabled={paymentStatus[user]}
                >
                  Pay
                </Button>
              )}
            </Box>
          ))}
        </Stack>
        <Divider sx={{ my: 2 }} />
        <Button variant="outlined" fullWidth onClick={() => navigate(-1)}>
          Back
        </Button>
      </Paper>
    </Box>
  );
}

export default PaymentPage; 