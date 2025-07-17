import React, { useEffect, useState } from 'react';
import './Table-Animals'; // reutilizando estilos

const FeedTable = () => {
  const [rations, setRations] = useState([]);
  const [animals, setAnimals] = useState([]);
  const [feedData, setFeedData] = useState([]);
   
  const fetchFeedData = async () => {
    const res = await fetch('http://localhost:3034/rations');
    const data = await res.json();
    setRations(data);
  }
  
const handleEditQuantidade = (id) => {
  const amount = prompt('Nova quantidade (em toneladas):');
  const tons = parseFloat(amount);
  if (!isNaN(tons) && tons >= 1 && tons <= 100) {
    setRations(prev =>
      prev.map(ration =>
        ration._id === id ? { ...ration, quantity: `${tons}t` } : ration
      )
    );
  } else {
    alert('Por favor, insira um valor entre 1 e 100 toneladas.');
  }
};

  const fetchAnimals = async () => {
    const res = await fetch('http://localhost:3034/animals'); 
    const data = await res.json();
    setAnimals(data);
  }

  const getRemainingMonths = (ration, feedQuantityStr) => {
    if (!ration || !ration._id) return '-';

    const feedQuantity = parseToTons(feedQuantityStr);
    if (feedQuantity === 0) return '-';

    const animaisFiltrados = animals.filter(animal =>
      animal.ration &&
      animal.ration.type &&
      animal.ration.type.toString() === ration._id.toString()
    );

    const dailyUsage = animaisFiltrados.reduce((total, animal) => {
      const quantity = parseToTons(animal.ration.quantity);
      console.log(`[${animal.name}] Consome por dia: ${quantity}t`);
      return total + quantity;
    }, 0);

    const monthlyUsage = dailyUsage * 30;
    if (monthlyUsage === 0) return '∞';

    const months = feedQuantity / monthlyUsage;

    console.log(`Ração: ${ration.name}`);
    console.log(`Quantidade disponível: ${feedQuantity}t`);
    console.log(`Uso diário total: ${dailyUsage}t`);
    console.log(`Uso mensal: ${monthlyUsage}t`);
    console.log(`Meses restantes: ${months.toFixed(1)}\n`);

    return `${months.toFixed(1)} meses`;
  };

  const parseToTons = (valueStr) => {
    if (!valueStr || typeof valueStr !== 'string') return 0;

    const normalized = valueStr.trim().toLowerCase().replace(/\s+/g, '');

    if (normalized.endsWith('kg')) {
      const val = parseFloat(normalized.replace('kg', ''));
      return isNaN(val) ? 0 : val / 1_000;
    }

    if (normalized.endsWith('g')) {
      const val = parseFloat(normalized.replace('g', ''));
      return isNaN(val) ? 0 : val / 1_000_000;
    }

    if (normalized.endsWith('t')) {
      const val = parseFloat(normalized.replace('t', ''));
      return isNaN(val) ? 0 : val;
    }

    const val = parseFloat(normalized);
    return isNaN(val) ? 0 : val;
  };

  useEffect(() => {
    fetchFeedData();
    fetchAnimals();
  }, []);

  return (
    <div className="table-container">
    
      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tipo de Ração</th>
            <th>Quantidade</th>
            <th>Duração Estimada</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {rations.map((ration, i) => (
            <tr key={i}>
              <td>{i}</td>
              <td>{ration.name}</td>
              <td>{ration.quantity}</td>
              <td>{getRemainingMonths(ration, ration.quantity)}</td>
              <td>
                <button className='addFood'onClick={() => handleEditQuantidade(ration.id)}>
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
