import './App.css';
import PermanentDrawerLeft from './components/sidebar';
import FoodTable from './components/FeedTable';


function App() {
  return (
    <div className="App">
     <PermanentDrawerLeft/>
     <FoodTable/> 
     </div>
  );
}

export default App;
