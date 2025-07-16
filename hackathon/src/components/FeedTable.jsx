import React, { use, useState } from 'react';
import './Table-Animals'; // reutilizando estilos

const FeedTable = () => {
  const [rations, setRations] = useState([]);
  const [animals, setAnimals] = useState([]);
   
  const fetchFeedData = async () => {
    const res = await fetch('http://localhost:3034/rations');
    const data = await res.json();
    setRations(data);
  }

  const fetchAnimals = async () => {
    const res = await fetch('http://localhost:3034/animals'); 
    const data = await res.json();
    setAnimals(data);
  }

  const getRemainingMonths = (feedName, feedQuantityStr) => {
    const feedQuantity = Number(feedQuantityStr.replace('t', '').trim());

    const dailyUsage = animals
    .filter(animal =>
      animal.ration &&
      animal.ration.type &&
      animal.ration.type.trim().toLowerCase() === feedName.trim().toLowerCase()
    )
    .reduce((total, animal) => {
      const quantity = Number(animal.ration.quantity.replace('t', '').trim());
      return total + (isNaN(quantity) ? 0 : quantity);
    }, 0);

    const monthlyUsage = dailyUsage * 30;
    if (monthlyUsage === 0) return '∞';

    const months = feedQuantity / monthlyUsage;

    return `${months.toFixed(1)} meses`;
  };

  useEffect(() => {
    fetchFeedData();
    fetchAnimals();
  }, []);

  return (
    <div className="table-container">
      <h1>Estoque de Ração</h1>
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
          {feedData.map((feed, i) => (
            <tr key={i}>
              <td>{i}</td>
              <td>{feed.name}</td>
              <td>{feed.animal}</td>
              <td>{feed.quantity}</td>
              <td>{getRemainingMonths(feed.name, feed.quantity)}</td>
              <td>
                <button className='addFood'onClick={() => alert('Funcionalidade em desenvolvimento')}>
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
