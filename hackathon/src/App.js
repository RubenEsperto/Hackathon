import './App.css';
import PermanentDrawerLeft from './components/sidebar';
import SmallCard from './components/SmallCard.jsx';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import FoodTable from './components/FeedTable.jsx';

function App() {
  return (
    <div className="App">
     <PermanentDrawerLeft/>
     <FoodTable/> 
     </div>
  );
}

export default App;
