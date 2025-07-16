import React from 'react';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import SetMealIcon from '@mui/icons-material/SetMeal';
import WavesIcon from '@mui/icons-material/Waves';

const navItems = [
  { text: 'Dashboard', path: '/dashboard' },
  { text: 'Animais', path: '/stock/animais' },
  { text: 'Stock', path: '/stock/comida' }
];

function SidebarMenu() {
  const location = useLocation();

  return (
    <List>
      {navItems.map((item, index) => (
        <ListItem key={item.text} disablePadding>
          <ListItemButton
            component={Link}
            to={item.path}
            selected={location.pathname === item.path}
          >
            <ListItemIcon>
              {index % 2 === 0 ? <SetMealIcon /> : <WavesIcon />}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}

export default SidebarMenu;