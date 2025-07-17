import './App.css';
import * as React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import SidebarMenu from './components/SideBarMenu';
import ListadeAnimais from './pages/StockAnimals';
import FoodStock from './pages/StockFood';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';

const drawerWidth = 240;

function Layout({ children }) {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`, background: '#2b7a78' }}
      >
        <Toolbar>
          <Typography  variant="h4" noWrap component="div">
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
        {children}
      </Box>
    </Box>
  );
}

// Wrapper para aplicar layout apenas às rotas protegidas
function ProtectedRoute({ element }) {
  return <Layout>{element}</Layout>;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<SignIn />} />

        {/* Páginas com layout */}
        <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
        <Route path="/stock/animais" element={<ProtectedRoute element={<ListadeAnimais />} />} />
        <Route path="/stock/comida" element={<ProtectedRoute element={<FoodStock />} />} />

        {/* Redirecionamento padrão */}
        <Route path="*" element={<SignIn />} />
      </Routes>
    </Router>
  );
}

export default App;