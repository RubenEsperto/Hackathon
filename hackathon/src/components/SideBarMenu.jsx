import React from 'react';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Link, useLocation } from 'react-router-dom';

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
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}

export default SidebarMenu;