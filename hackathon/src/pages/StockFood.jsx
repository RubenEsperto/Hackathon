import React from 'react';
import Food from '../components/FeedTable.jsx';
import SmallCard from '../components/SmallCard.jsx';

const FoodStock = () => {
  return (
    <div>
      <div className="small-card-wrap">
              <SmallCard titulo="Estimativa de Duração" valor="150dias"/>
              <SmallCard titulo="Total" valor="790ton"/>
              <SmallCard titulo="Tipos de Ração" valor="6"/>
      </div>
      <h1>Lista de Ração</h1>
   <Food/>
    </div>
  );
};

export default FoodStock;
