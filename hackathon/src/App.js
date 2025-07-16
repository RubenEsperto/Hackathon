import './App.css';
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import SmallCard from './components/SmallCard.jsx';
import FoodTable from './components/FeedTable.jsx';
import BasicPie from './components/PieChart.jsx';
import LineClick from './components/lineChart.jsx'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SidebarMenu from './components/SideBarMenu';
import ListadeAnimais from './pages/StockAnimals';
import FoodStock from './pages/StockFood';
import SignIn from './pages/SignIn.jsx';

const drawerWidth = 240;

function App() {
  return (
    <Router>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />

        <AppBar
          position="fixed"
          sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
        >
          <Toolbar>
            <Typography variant="h6" noWrap component="div">
              Olá, admin! Bem-vindo ao painel de controle.
            </Typography>
          </Toolbar>
        </AppBar>

        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Toolbar />
          <Divider />
          <SidebarMenu />
          <Divider />
        </Drawer>

        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
        >
          <Toolbar />

          <Routes>
            <Route path="/stock/animais" element={<ListadeAnimais />} />
            <Route path="/stock/comida" element={<FoodStock />} />
            <Route path="/dashboard" element={<div>Dashboard</div>} />
            <Route path="/signin" element={<SignIn/>} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default App;