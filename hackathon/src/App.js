import './App.css';
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
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
import LineClick from './components/lineChart'


const drawerWidth = 240;

function App() {
  return (
    <div className="App">
    <div>
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Olá, username
          </Typography>
        </Toolbar>
      </AppBar>

      {/*SIDEBAR*/}
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
        <List>
          {['Dashboard', 'Animais', 'Stock'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        </Drawer>
      </Box>
{/*MAIN CONTENT*/}
    <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}>
        <Toolbar /> 
        <div class="small-card-wrap">
          <SmallCard titulo="Estoque Total"  valor="1000(ton)"/>
          <SmallCard titulo="Estoque Gasto este mês"  valor="1000(ton)"/>
          <SmallCard titulo="Estoque Sobra"  valor="1000(ton)"/>
          <SmallCard titulo="Próxima Encomenda"  valor="3 meses" quantia="(300ton/sardinhas)"/>
          <SmallCard titulo="Última Encomenda"  valor="2 semanas"  quantia="(200ton/crustaceos)"/>
        </div>

  <div clasName="chart-wrap">
    <div className="pie-div">
      <BasicPie/>
    </div>

    <div className="line-div">
      <LineClick/>
  </div>

  </div>
      </Box>
     <FoodTable/> 
     </div>
     </div>
  );
}

export default App;
