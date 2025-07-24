import React, { useState } from "react";
import { Box, Typography, Paper, Button, Avatar, Grid, Chip, Stack, Fade, Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton, AppBar, Toolbar, Container, InputAdornment, MenuItem, Select, FormControl, InputLabel, Fab, ButtonGroup, Tabs, Tab } from "@mui/material";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import SendIcon from '@mui/icons-material/Send';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CloseIcon from '@mui/icons-material/Close';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import AddIcon from '@mui/icons-material/Add';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import format from 'date-fns/format';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import Popover from '@mui/material/Popover';
import Badge from '@mui/material/Badge';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import ModernBg from './ModernBg';
import { isSameWeek, isSameMonth } from 'date-fns';
import Header from './Header';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import dayjs from 'dayjs';
import { useRef } from 'react';

const initialFeed = [
  {
    day: "Today",
    date: new Date(),
    hosts: [
      {
        id: 1,
        name: "Priya Sharma",
        food: "Homemade Biryani",
        time: "7:00 PM",
        location: "Bangalore, Indiranagar",
        spots: 3,
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        description: "Delicious biryani with raita and dessert included!",
      },
      {
        id: 2,
        name: "Rahul Verma",
        food: "Vegan Pasta Night",
        time: "8:30 PM",
        location: "Bangalore, Koramangala",
        spots: 2,
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        description: "Fresh vegan pasta with homemade sauce and garlic bread.",
      },
    ],
  },
  {
    day: "Tomorrow",
    date: (() => { const d = new Date(); d.setDate(d.getDate() + 1); return d; })(),
    hosts: [
      {
        id: 3,
        name: "Aisha Khan",
        food: "Mughlai Feast",
        time: "6:30 PM",
        location: "Bangalore, Whitefield",
        spots: 4,
        avatar: "https://randomuser.me/api/portraits/women/65.jpg",
        description: "A royal Mughlai spread with kebabs, curries, and naan.",
      },
    ],
  },
  {
    day: "Upcoming",
    date: (() => { const d = new Date(); d.setDate(d.getDate() + 3); return d; })(),
    hosts: [
      {
        id: 4,
        name: "Sandeep Singh",
        food: "Punjabi Thali",
        time: "Sunday, 1:00 PM",
        location: "Bangalore, Jayanagar",
        spots: 5,
        avatar: "https://randomuser.me/api/portraits/men/76.jpg",
        description: "Traditional Punjabi thali with lassi and sweets.",
      },
    ],
  },
];

const engagements = [
  {
    id: 1,
    name: "Olivia",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    title: "Dinner with Olivia",
    cuisine: "Italian",
    invites: 2,
    accepted: 1,
    date: "Saturday, July 20, 7:00 PM",
    location: "Bangalore, Indiranagar",
  },
  {
    id: 2,
    name: "Ethan",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    title: "Lunch with Ethan",
    cuisine: "Mexican",
    invites: 1,
    accepted: 1,
    date: "Sunday, July 21, 1:00 PM",
    location: "Bangalore, Koramangala",
  },
  {
    id: 3,
    name: "Chloe",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    title: "Dinner with Chloe",
    cuisine: "Indian",
    invites: 3,
    accepted: 2,
    date: "Monday, July 22, 6:30 PM",
    location: "Bangalore, Whitefield",
  },
  {
    id: 4,
    name: "Ryan",
    avatar: "https://randomuser.me/api/portraits/men/76.jpg",
    title: "Lunch with Ryan",
    cuisine: "Japanese",
    invites: 1,
    accepted: 0,
    date: "Tuesday, July 23, 12:00 PM",
    location: "Bangalore, Jayanagar",
  },
  {
    id: 5,
    name: "Sophia",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    title: "Dinner with Sophia",
    cuisine: "American",
    invites: 2,
    accepted: 1,
    date: "Wednesday, July 24, 7:30 PM",
    location: "Bangalore, HSR Layout",
  },
  {
    id: 6,
    name: "Noah",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    title: "Lunch with Noah",
    cuisine: "Thai",
    invites: 1,
    accepted: 1,
    date: "Thursday, July 25, 1:30 PM",
    location: "Bangalore, MG Road",
  },
];

const cuisineOptions = ["All", "Italian", "Mexican", "Indian", "Japanese", "American", "Thai"];
const locationOptions = ["All", "Indiranagar", "Koramangala", "Whitefield", "Jayanagar", "HSR Layout", "MG Road"];

const exampleHosts = [
  {
    id: 201,
    name: "Arun",
    food: "Dining Engagement • Regular",
    time: "Sat, 19 Jul 2025, 08:00 PM - 09:00 PM",
    location: "The Spice Room, Mumbai",
    spots: 0, // PLATE FULL
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    description: "Special dinner event. Join for a great meal and company!",
    karma: 396,
    distance: "~5.97 Kms",
    level: "Intermediate - Professional",
    gender: "MH"
  }
];

function Feed() {
  const [fadeIn, setFadeIn] = React.useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [dialog, setDialog] = useState({ open: false, type: '', host: null });
  const [inviteEmail, setInviteEmail] = useState('');
  const [requestMsg, setRequestMsg] = useState('');
  const [feed, setFeed] = useState(initialFeed);
  const [postHotel, setPostHotel] = useState('');
  const [postDate, setPostDate] = useState(null);
  const [postMsg, setPostMsg] = useState('');
  const [posting, setPosting] = useState(false);
  const [cuisine, setCuisine] = useState("All");
  const [location, setLocation] = useState("All");
  const [viewDialog, setViewDialog] = useState({ open: false, engagement: null });
  const [shareDialog, setShareDialog] = useState(false);
  const [postSpots, setPostSpots] = useState(1);
  const [notifAnchor, setNotifAnchor] = useState(null);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      message: "Olivia invited you to dinner",
      time: "2m ago",
      unread: true,
      type: 'invite',
      status: null, // 'accepted' | 'declined'
    },
    {
      id: 2,
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      message: "Your request to join Ethan's lunch was accepted",
      time: "1h ago",
      unread: true,
      type: 'info',
      status: null,
    },
    {
      id: 3,
      avatar: "https://randomuser.me/api/portraits/women/65.jpg",
      message: "Chloe commented on your post",
      time: "3h ago",
      unread: false,
      type: 'comment',
      status: null,
    },
  ]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [timeFilter, setTimeFilter] = useState('all'); // 'all' | 'week' | 'month'
  const [tab, setTab] = useState('dining'); // 'dining' or 'feed'
  const [editDialog, setEditDialog] = useState({ open: false, sectionIdx: null, hostIdx: null, data: null });
  const navigate = useNavigate();

  const unreadCount = notifications.filter(n => n.unread).length;

  const handleNotifClick = (event) => {
    setNotifAnchor(event.currentTarget);
  };
  const handleNotifClose = () => {
    setNotifAnchor(null);
  };
  const handleNotifRead = (id) => {
    setNotifications(notifications => notifications.map(n => n.id === id ? { ...n, unread: false } : n));
  };
  const handleNotifAction = (id, action) => {
    setNotifications(notifications => notifications.map(n => n.id === id ? { ...n, unread: false, status: action } : n));
    setSnackbar({ open: true, message: action === 'accepted' ? 'Invitation accepted!' : 'Invitation declined.', severity: action === 'accepted' ? 'success' : 'info' });
  };
  const notifOpen = Boolean(notifAnchor);

  // Filter pending invites from notifications
  const pendingInvites = notifications.filter(n => n.type === 'invite' && !n.status);

  React.useEffect(() => { setFadeIn(true); }, []);

  // Filter hosts by selected date and time filter
  let filteredSections = feed;
  if (selectedDate) {
    filteredSections = feed
      .map(section => ({
        ...section,
        hosts: section.hosts.filter(() => {
          return format(section.date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd');
        })
      }))
      .filter(section => section.hosts.length > 0);
  } else if (timeFilter !== 'all') {
    const now = new Date();
    filteredSections = feed
      .map(section => ({
        ...section,
        hosts: section.hosts.filter(() => {
          if (timeFilter === 'week') return isSameWeek(section.date, now, { weekStartsOn: 1 });
          if (timeFilter === 'month') return isSameMonth(section.date, now);
          return true;
        })
      }))
      .filter(section => section.hosts.length > 0);
  }

  // Filter engagements
  const filteredEngagements = engagements.filter(e =>
    (cuisine === "All" || e.cuisine === cuisine) &&
    (location === "All" || e.location.includes(location))
  );

  const openDialog = (type, host) => setDialog({ open: true, type, host });
  const closeDialog = () => {
    setDialog({ open: false, type: '', host: null });
    setInviteEmail('');
    setRequestMsg('');
  };

  const handleEditOpen = (sectionIdx, hostIdx, host) => {
    setEditDialog({ open: true, sectionIdx, hostIdx, data: { ...host } });
  };
  const handleEditChange = (field, value) => {
    setEditDialog(prev => ({ ...prev, data: { ...prev.data, [field]: value } }));
  };
  const handleEditSave = () => {
    const { sectionIdx, hostIdx, data } = editDialog;
    setFeed(prevFeed => {
      const newFeed = [...prevFeed];
      newFeed[sectionIdx] = { ...newFeed[sectionIdx], hosts: [...newFeed[sectionIdx].hosts] };
      newFeed[sectionIdx].hosts[hostIdx] = { ...newFeed[sectionIdx].hosts[hostIdx], ...data };
      return newFeed;
    });
    setEditDialog({ open: false, sectionIdx: null, hostIdx: null, data: null });
  };
  const handleDelete = (sectionIdx, hostIdx) => {
    setFeed(prevFeed => {
      const newFeed = [...prevFeed];
      newFeed[sectionIdx] = { ...newFeed[sectionIdx], hosts: [...newFeed[sectionIdx].hosts] };
      newFeed[sectionIdx].hosts.splice(hostIdx, 1);
      // Remove section if no hosts left
      if (newFeed[sectionIdx].hosts.length === 0) newFeed.splice(sectionIdx, 1);
      return newFeed;
    });
  };

  // Handle new post
  const handlePost = () => {
    if (!postHotel || !postDate) return;
    setPosting(true);
    setTimeout(() => {
      // Add to feed as a new section or to Today if today
      const todayStr = format(new Date(), 'yyyy-MM-dd');
      const postDateStr = format(postDate, 'yyyy-MM-dd');
      let newFeed = [...feed];
      let sectionIdx = newFeed.findIndex(section => format(section.date, 'yyyy-MM-dd') === postDateStr);
      const newHost = {
        id: Date.now(),
        name: "You",
        food: `Going to ${postHotel}`,
        time: format(postDate, 'p'),
        location: postHotel,
        spots: postSpots,
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        description: postMsg || 'Join me if you like!'
      };
      if (sectionIdx === -1) {
        // New section
        newFeed.unshift({
          day: postDateStr === todayStr ? 'Today' : format(postDate, 'EEEE, MMM d'),
          date: postDate,
          hosts: [newHost]
        });
      } else {
        newFeed[sectionIdx].hosts.unshift(newHost);
      }
      setFeed(newFeed);
      setPostHotel('');
      setPostDate(null);
      setPostMsg('');
      setPostSpots(1);
      setPosting(false);
      setShareDialog(false);
    }, 600);
  };

  const handleRequestToJoin = (host) => {
    // Add a notification for the host (simulate by adding to notifications array)
    setNotifications(prev => [
      ...prev,
      {
        id: Date.now(),
        avatar: host.avatar,
        message: `Join request from You for ${host.food}`,
        time: 'Just now',
        unread: true,
        type: 'join_request',
        status: null,
        hostId: host.id,
        hostName: host.name,
        event: host.food,
      }
    ]);
  };

  // Parse event date and time
  const getEventDateTime = (host) => {
    // Try to parse host.date and host.time
    // host.date may be a string like 'Sunday, July 21, 7:00 PM' or a Date object
    if (host.date && host.time) {
      return dayjs(`${host.date} ${host.time}`);
    } else if (host.date) {
      return dayjs(host.date);
    } else {
      return dayjs(); // fallback to now
    }
  };

  // Trending Host Feed UI
  const featuredEvents = filteredSections.flatMap(section => section.hosts).slice(0, 5);
  const scrollRef = useRef(null);

  return (
    <>
      <Header onNotificationsClick={handleNotifClick} />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ModernBg>
          <Box sx={{ minHeight: "100vh", position: 'relative' }}>
            {/* Remove <Toolbar /> spacer for tighter layout */}
            <Container maxWidth="md" sx={{ pt: 2, pb: 6, mt: 0 }}>
              {/* Tab Navigation */}
              <Box sx={{ mb: 3, display: 'flex', justifyContent: 'center' }}>
                <Tabs value={tab} onChange={(e, v) => setTab(v)} centered>
                  <Tab label="Dining Engagements" value="dining" sx={{ fontWeight: 700, color: tab === 'dining' ? '#e94f37' : '#474554' }} />
                  <Tab label="Host Feed" value="feed" sx={{ fontWeight: 700, color: tab === 'feed' ? '#e94f37' : '#474554' }} />
                </Tabs>
              </Box>
              {/* Dining Engagements Tab (always vertical list) */}
              {tab === 'dining' && (
                <Paper elevation={1} sx={{ mb: 4, p: 3, borderRadius: 4, background: '#fff' }}>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center" sx={{ mb: 2 }}>
                    <FormControl sx={{ minWidth: 120 }} size="small">
                      <InputLabel>Cuisine</InputLabel>
                      <Select value={cuisine} label="Cuisine" onChange={e => setCuisine(e.target.value)}>
                        {cuisineOptions.map(opt => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
                      </Select>
                    </FormControl>
                    <FormControl sx={{ minWidth: 120 }} size="small">
                      <InputLabel>Location</InputLabel>
                      <Select value={location} label="Location" onChange={e => setLocation(e.target.value)}>
                        {locationOptions.map(opt => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
                      </Select>
                    </FormControl>
                  </Stack>
                  <Typography variant="h6" fontWeight={700} sx={{ mb: 2, color: '#e94f37' }}>
                    Upcoming Dining Engagements
                  </Typography>
                  <Box>
                    {filteredEngagements.map(e => {
                      const isFull = e.invites === e.accepted;
                      return (
                        <Stack key={e.id} direction="row" alignItems="center" spacing={2} sx={{ mb: 3, p: 1, borderRadius: 2, '&:hover': { background: isFull ? undefined : '#fff7e6' }, opacity: isFull ? 0.5 : 1, pointerEvents: isFull ? 'none' : 'auto', background: isFull ? '#f8d7da' : undefined }}>
                          <Avatar src={e.avatar} alt={e.name} sx={{ width: 56, height: 56, border: '2px solid #fcb900' }} />
                          <Box sx={{ flex: 1 }}>
                            <Typography fontWeight={700} sx={{ color: '#222' }}>{e.title}</Typography>
                            <Typography variant="body2" color="text.secondary">
                              {e.cuisine} | {e.invites} invite{e.invites > 1 ? 's' : ''} received, {e.accepted} accepted
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {e.date}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {e.location}
                            </Typography>
                            {isFull ? (
                              <Typography sx={{ color: '#e94f37', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', mt: 0.5 }}>
                                🍽️ PLATE FULL
                              </Typography>
                            ) : (
                              <Typography sx={{ color: '#43cea2', fontWeight: 700, letterSpacing: 1, mt: 0.5 }}>
                                {e.invites - e.accepted} slots left
                              </Typography>
                            )}
                          </Box>
                          {!isFull && (
                            <Button variant="text" onClick={() => setViewDialog({ open: true, engagement: e })} sx={{ fontWeight: 700, color: '#e94f37' }}>View</Button>
                          )}
                        </Stack>
                      );
                    })}
                    {filteredEngagements.length === 0 && (
                      <Typography color="text.secondary" align="center">No engagements found.</Typography>
                    )}
                  </Box>
                </Paper>
              )}
              {/* Host Feed Tab (remove Pending Invitations section) */}
              {tab === 'feed' && (
                <Fade in={fadeIn} timeout={900}>
                  <Box>
                    {/* Restore calendar/date picker at the top of Host Feed */}
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
                      <DatePicker
                        label="Select Date"
                        value={selectedDate}
                        onChange={setSelectedDate}
                        slotProps={{ textField: { size: 'medium', sx: { background: 'rgba(255,255,255,0.97)', borderRadius: 2, minWidth: 200 } } }}
                      />
                      <Button onClick={() => setSelectedDate(null)} sx={{ ml: 2, color: '#e94f37', fontWeight: 700 }}>Clear</Button>
                    </Box>
                    {/* Trending/Featured Events Horizontal Scroll */}
                    <Box sx={{ mb: 4, overflowX: 'auto', whiteSpace: 'nowrap', pb: 1 }} ref={scrollRef}>
                      {featuredEvents.map((host, idx) => (
                        <Box
                          key={host.id}
                          sx={{
                            display: 'inline-block',
                            minWidth: 260,
                            maxWidth: 320,
                            mr: 2,
                            background: 'linear-gradient(90deg, #fcb900 0%, #e94f37 100%)',
                            borderRadius: 4,
                            boxShadow: '0 4px 24px 0 rgba(44,62,80,0.10)',
                            p: 3,
                            color: '#fff',
                            position: 'relative',
                            verticalAlign: 'top',
                          }}
                        >
                          <Avatar src={host.avatar} alt={host.name} sx={{ width: 56, height: 56, border: '2px solid #fff', mb: 1 }} />
                          <Typography variant="h6" fontWeight={900} sx={{ letterSpacing: 1, mb: 0.5 }}>{host.food}</Typography>
                          <Typography variant="body2" sx={{ opacity: 0.9, mb: 1 }}>Hosted by {host.name}</Typography>
                          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                            <CalendarTodayIcon fontSize="small" />
                            <Typography variant="body2">{host.time}</Typography>
                            <LocationOnIcon fontSize="small" sx={{ ml: 1 }} />
                            <Typography variant="body2">{host.location}</Typography>
                          </Stack>
                          <Chip label={`${host.spots} spots left`} color="warning" sx={{ fontWeight: 700, background: '#fff', color: '#e94f37', mb: 1 }} />
                          <Stack direction="row" spacing={1} mt={2}>
                            <Button
                              variant="contained"
                              sx={{ flex: 1, fontWeight: 700, background: 'rgba(255,255,255,0.15)', color: '#fff', boxShadow: 'none' }}
                              onClick={() => handleRequestToJoin(host)}
                              disabled={host.spots === 0}
                            >
                              Request to Join
                            </Button>
                          </Stack>
                        </Box>
                      ))}
                    </Box>
                    {/* Minimalist List of All Events */}
                    <Box>
                      {filteredSections.map((section, sectionIdx) => (
                        <Box key={section.day} sx={{ mb: 2 }}>
                          <Typography variant="subtitle2" fontWeight={700} sx={{ color: '#e94f37', mb: 1, textTransform: 'uppercase', letterSpacing: 1 }}>
                            {section.day}
                          </Typography>
                          <Stack spacing={2}>
                            {section.hosts.map((host, hostIdx) => (
                              <Box key={host.id} sx={{ display: 'flex', alignItems: 'center', background: '#fff', borderRadius: 3, boxShadow: '0 2px 8px 0 rgba(44,62,80,0.07)', p: 2, gap: 2, flexWrap: 'wrap' }}>
                                <Avatar src={host.avatar} alt={host.name} sx={{ width: 48, height: 48, border: '2px solid #fcb900', mr: 2 }} />
                                <Box sx={{ flex: 1, minWidth: 180 }}>
                                  <Typography fontWeight={700} sx={{ color: '#222', fontSize: 17 }}>{host.food}</Typography>
                                  <Typography variant="body2" color="text.secondary">{host.name} · {host.time} · {host.location}</Typography>
                                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>{host.description}</Typography>
                                </Box>
                                <Chip label={`${host.spots} spots left`} color="warning" sx={{ fontWeight: 700, height: 28, background: '#fcb900', color: '#fff', fontSize: 14 }} />
                                <Stack direction="row" spacing={1} sx={{ minWidth: 180 }}>
                                  <Button
                                    variant="contained"
                                    sx={{ flex: 1, fontWeight: 700, background: 'linear-gradient(90deg, #43cea2 0%, #185a9d 100%)', color: '#fff', borderRadius: 2 }}
                                    onClick={() => handleRequestToJoin(host)}
                                    disabled={host.spots === 0}
                                  >
                                    Request to Join
                                  </Button>
                                </Stack>
                              </Box>
                            ))}
                          </Stack>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                </Fade>
              )}
              {/* Dialogs */}
              <Dialog open={dialog.open && dialog.type === 'request'} onClose={closeDialog} maxWidth="md" fullWidth>
                <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pr: 2 }}>
                  Request to Join
                  <IconButton onClick={closeDialog}><CloseIcon /></IconButton>
                </DialogTitle>
                <DialogContent sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, alignItems: 'center', py: 4 }}>
                  {dialog.host && (
                    <Avatar src={dialog.host.avatar} alt={dialog.host.name} sx={{ width: 100, height: 100, border: '4px solid #fcb900', mb: { xs: 2, md: 0 } }} />
                  )}
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" fontWeight={700} sx={{ color: '#474554' }}>{dialog.host?.name}</Typography>
                    <Typography variant="body1" sx={{ color: '#e94f37', fontWeight: 500 }}>{dialog.host?.food}</Typography>
                    <Typography variant="body2" sx={{ color: '#474554', mb: 2 }}>{dialog.host?.description}</Typography>
                    <TextField
                      label="Message to Host (optional)"
                      value={requestMsg}
                      onChange={e => setRequestMsg(e.target.value)}
                      fullWidth
                      multiline
                      minRows={2}
                      sx={{ mb: 2 }}
                    />
                  </Box>
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 2 }}>
                  <Button onClick={closeDialog} color="inherit">Cancel</Button>
                  <Button variant="contained" sx={{ background: 'linear-gradient(90deg, #fcb900 0%, #e94f37 100%)', color: '#fff', fontWeight: 700 }} onClick={closeDialog}>
                    Send Request
                  </Button>
                </DialogActions>
              </Dialog>
              <Dialog open={dialog.open && dialog.type === 'invite'} onClose={closeDialog} maxWidth="md" fullWidth>
                <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pr: 2 }}>
                  Invite a Friend
                  <IconButton onClick={closeDialog}><CloseIcon /></IconButton>
                </DialogTitle>
                <DialogContent sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, alignItems: 'center', py: 4 }}>
                  {dialog.host && (
                    <Avatar src={dialog.host.avatar} alt={dialog.host.name} sx={{ width: 100, height: 100, border: '4px solid #e94f37', mb: { xs: 2, md: 0 } }} />
                  )}
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" fontWeight={700} sx={{ color: '#474554' }}>{dialog.host?.name}</Typography>
                    <Typography variant="body1" sx={{ color: '#e94f37', fontWeight: 500 }}>{dialog.host?.food}</Typography>
                    <Typography variant="body2" sx={{ color: '#474554', mb: 2 }}>{dialog.host?.description}</Typography>
                    <TextField
                      label="Friend's Email"
                      value={inviteEmail}
                      onChange={e => setInviteEmail(e.target.value)}
                      fullWidth
                      sx={{ mb: 2 }}
                    />
                  </Box>
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 2 }}>
                  <Button onClick={closeDialog} color="inherit">Cancel</Button>
                  <Button variant="contained" sx={{ background: 'linear-gradient(90deg, #e94f37 0%, #fcb900 100%)', color: '#fff', fontWeight: 700 }} onClick={closeDialog}>
                    Send Invite
                  </Button>
                </DialogActions>
              </Dialog>
              {/* Ensure the View Dialog is present and uses viewDialog.open and viewDialog.engagement */}
              <Dialog open={viewDialog.open} onClose={() => setViewDialog({ open: false, engagement: null })} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pr: 2 }}>
                  Engagement Details
                  <IconButton onClick={() => setViewDialog({ open: false, engagement: null })}><CloseIcon /></IconButton>
                </DialogTitle>
                <DialogContent>
                  {viewDialog.engagement && (
                    <Stack spacing={2} alignItems="center" sx={{ py: 2 }}>
                      <Avatar src={viewDialog.engagement.avatar} alt={viewDialog.engagement.name} sx={{ width: 80, height: 80, border: '2px solid #fcb900' }} />
                      <Typography fontWeight={700}>{viewDialog.engagement.title}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {viewDialog.engagement.cuisine} | {viewDialog.engagement.invites} invite{viewDialog.engagement.invites > 1 ? 's' : ''} received, {viewDialog.engagement.accepted} accepted
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {viewDialog.engagement.date}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {viewDialog.engagement.location}
                      </Typography>
                    </Stack>
                  )}
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => setViewDialog({ open: false, engagement: null })} color="inherit">Close</Button>
                </DialogActions>
              </Dialog>
              <Dialog open={editDialog.open} onClose={() => setEditDialog({ open: false, sectionIdx: null, hostIdx: null, data: null })} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pr: 2 }}>
                  Edit Host Feed
                  <IconButton onClick={() => setEditDialog({ open: false, sectionIdx: null, hostIdx: null, data: null })}><CloseIcon /></IconButton>
                </DialogTitle>
                <DialogContent>
                  {editDialog.data && (
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center" sx={{ mb: 2 }}>
                      <TextField
                        label="Hotel/Restaurant Name"
                        value={editDialog.data.location}
                        onChange={e => handleEditChange('location', e.target.value)}
                        fullWidth
                        InputProps={{ startAdornment: <InputAdornment position="start"><AddLocationAltIcon color="warning" /></InputAdornment> }}
                        sx={{ background: '#fff', borderRadius: 2 }}
                      />
                      <DatePicker
                        label="Date & Time"
                        value={editDialog.data.time ? new Date(`1970-01-01T${editDialog.data.time}`) : null}
                        onChange={date => handleEditChange('time', date ? date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '')}
                        slotProps={{ textField: { sx: { background: '#fff', borderRadius: 2, minWidth: 140 } } }}
                      />
                    </Stack>
                  )}
                  <TextField
                    label="How many can you invite?"
                    type="number"
                    value={editDialog.data?.spots || 1}
                    onChange={e => handleEditChange('spots', Math.max(1, Math.min(20, Number(e.target.value))))}
                    inputProps={{ min: 1, max: 20 }}
                    fullWidth
                    sx={{ background: '#fff', borderRadius: 2, mb: 2 }}
                  />
                  <TextField
                    label="Message (optional)"
                    value={editDialog.data?.description || ''}
                    onChange={e => handleEditChange('description', e.target.value)}
                    fullWidth
                    multiline
                    minRows={2}
                    sx={{ background: '#fff', borderRadius: 2 }}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => setEditDialog({ open: false, sectionIdx: null, hostIdx: null, data: null })} color="inherit">Cancel</Button>
                  <Button variant="contained" sx={{ background: 'linear-gradient(90deg, #fcb900 0%, #e94f37 100%)', color: '#fff', fontWeight: 700 }} onClick={handleEditSave}>
                    Save
                  </Button>
                </DialogActions>
              </Dialog>
            </Container>
            {/* Floating Action Button for Share */}
            <Fab color="primary" aria-label="add" sx={{ position: 'fixed', bottom: 32, right: 32, background: 'linear-gradient(90deg, #fcb900 0%, #e94f37 100%)', color: '#fff', fontWeight: 700 }} onClick={() => setShareDialog(true)}>
              <AddIcon />
            </Fab>
            {/* Share Dialog */}
            <Dialog open={shareDialog} onClose={() => setShareDialog(false)} maxWidth="sm" fullWidth>
              <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pr: 2 }}>
                Share where you're going!
                <IconButton onClick={() => setShareDialog(false)}><CloseIcon /></IconButton>
              </DialogTitle>
              <DialogContent>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center" sx={{ mb: 2 }}>
                  <TextField
                    label="Hotel/Restaurant Name"
                    value={postHotel}
                    onChange={e => setPostHotel(e.target.value)}
                    fullWidth
                    InputProps={{ startAdornment: <InputAdornment position="start"><AddLocationAltIcon color="warning" /></InputAdornment> }}
                    sx={{ background: '#fff', borderRadius: 2 }}
                  />
                  <DatePicker
                    label="Date & Time"
                    value={postDate}
                    onChange={setPostDate}
                    slotProps={{ textField: { sx: { background: '#fff', borderRadius: 2, minWidth: 140 } } }}
                    disablePast
                    showTimeSelect
                  />
                </Stack>
                <TextField
                  label="How many can you invite?"
                  type="number"
                  value={postSpots}
                  onChange={e => setPostSpots(Math.max(1, Math.min(20, Number(e.target.value))))}
                  inputProps={{ min: 1, max: 20 }}
                  fullWidth
                  sx={{ background: '#fff', borderRadius: 2, mb: 2 }}
                />
                <TextField
                  label="Message (optional)"
                  value={postMsg}
                  onChange={e => setPostMsg(e.target.value)}
                  fullWidth
                  multiline
                  minRows={2}
                  sx={{ background: '#fff', borderRadius: 2 }}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setShareDialog(false)} color="inherit">Cancel</Button>
                <Button
                  variant="contained"
                  startIcon={<SendIcon />}
                  sx={{ background: 'linear-gradient(90deg, #fcb900 0%, #e94f37 100%)', color: '#fff', fontWeight: 700, px: 4, borderRadius: 2 }}
                  onClick={handlePost}
                  disabled={!postHotel || !postDate || posting}
                >
                  {posting ? 'Posting...' : 'Post'}
                </Button>
              </DialogActions>
            </Dialog>
            <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
              <MuiAlert elevation={6} variant="filled" onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
                {snackbar.message}
              </MuiAlert>
            </Snackbar>
          </Box>
        </ModernBg>
      </LocalizationProvider>
      <Popover
        open={notifOpen}
        anchorEl={notifAnchor}
        onClose={handleNotifClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Box sx={{ p: 2, minWidth: 220 }}>
          <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 1 }}>Notifications</Typography>
          {notifications.length === 0 ? (
            <Typography color="text.secondary">No notifications</Typography>
          ) : (
            notifications.map(n => (
              <Box key={n.id} sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                <Avatar src={n.avatar} alt={n.message} sx={{ width: 28, height: 28 }} />
                <Box sx={{ flex: 1 }}>
                  <Typography fontWeight={700} sx={{ fontSize: 14 }}>{n.message}</Typography>
                  <Typography variant="caption" color="text.secondary">{n.time}</Typography>
                  {n.type === 'invite' && !n.status && (
                    <Box sx={{ mt: 0.5, display: 'flex', gap: 1 }}>
                      <Button size="small" color="success" variant="contained" sx={{ minWidth: 0, px: 1, fontSize: 12 }} onClick={() => handleNotifAction(n.id, 'accepted')}>Accept</Button>
                      <Button size="small" color="error" variant="outlined" sx={{ minWidth: 0, px: 1, fontSize: 12 }} onClick={() => handleNotifAction(n.id, 'declined')}>Decline</Button>
                    </Box>
                  )}
                  {n.type === 'invite' && n.status && (
                    <Chip label={n.status === 'accepted' ? 'Accepted' : 'Declined'} color={n.status === 'accepted' ? 'success' : 'error'} size="small" sx={{ mt: 0.5 }} />
                  )}
                  {n.type === 'join_request' && !n.status && (
                    <Box sx={{ mt: 0.5, display: 'flex', gap: 1 }}>
                      <Button size="small" color="success" variant="contained" sx={{ minWidth: 0, px: 1, fontSize: 12 }} onClick={() => handleNotifAction(n.id, 'accepted')}>Accept</Button>
                      <Button size="small" color="error" variant="outlined" sx={{ minWidth: 0, px: 1, fontSize: 12 }} onClick={() => handleNotifAction(n.id, 'declined')}>Decline</Button>
                    </Box>
                  )}
                  {n.type === 'join_request' && n.status && (
                    <Chip label={n.status === 'accepted' ? 'Accepted' : 'Declined'} color={n.status === 'accepted' ? 'success' : 'error'} size="small" sx={{ mt: 0.5 }} />
                  )}
                </Box>
              </Box>
            ))
          )}
        </Box>
      </Popover>
    </>
  );
}

export default Feed; 