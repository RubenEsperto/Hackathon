import React, { useState } from 'react';
import './Table-Animals'; // reutilizando estilos

const FeedTable = () => {
const [feedData, setFeedData] = useState([
  {
    id: 1,
    type: 'Sardinhas',
    animal: 'Larry',
    quantity: 12,
    duration: '14 dias',
  },
  {
    id: 2,
    type: 'Peixes pequenos',
    animal: 'Dolly & Molly',
    quantity: 50,
    duration: '30 dias',
  },
  {
    id: 3, 
    type: 'Comida de peixe normal',
    animal: 'Nemo',
    quantity: 4,
    duration: '10 dias',
  },
  {
    id: 4, 
    type: 'Atum',
    animal: 'Kroak',
    quantity: 29,
    duration: '1 mês',
  }
]);

const handleEditQuantidade = (id) => {
  const amount = prompt('Nova quantidade(toneladas):');
  const tons = parseFloat(amount);
  if(!isNaN(tons) && tons >= 1 && tons <= 100) { 
    setFeedData(prev => 
      prev.map(feed => 
        feed.id === id ? {...feed, quantity: tons } : feed
      )
    );
  }else{ 
    alert ('Por favor, insira um valor entre 1 e 100 toneladas.')
  }
  };


  return (
    <div className="table-container">
    
      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tipo de Ração</th>
            <th>Animal</th>
            <th>Quantidade (ton)</th>
            <th>Duração Estimada</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {feedData.map(feed => (
            <tr key={feed.id}>
              <td>{feed.id}</td>
              <td>{feed.type}</td>
              <td>{feed.animal}</td>
              <td>{feed.quantity}</td>
              <td>{feed.duration}</td>
              <td>
                <button className='addFood'onClick={() => handleEditQuantidade(feed.id)}>
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FeedTable;
