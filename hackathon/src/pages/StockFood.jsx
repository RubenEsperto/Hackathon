import React, { useEffect, useState } from 'react';
import Food from '../components/FeedTable.jsx';
import SmallCard from '../components/SmallCard.jsx';

const FoodStock = () => {
  const [rations, setRations] = useState([]);
  const [animals, setAnimals] = useState([]);

  // Função para converter string de quantidade para toneladas (float)
  const parseToTons = (valueStr) => {
    if (!valueStr || typeof valueStr !== 'string') return 0;

    const normalized = valueStr.trim().toLowerCase().replace(/\s+/g, '');

    if (normalized.endsWith('kg')) {
      const val = parseFloat(normalized.replace('kg', ''));
      return isNaN(val) ? 0 : val / 1000;
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

  // Buscar rações da API
  const fetchRations = async () => {
    try {
      const res = await fetch('http://localhost:3034/rations', {
        headers: { Authorization: localStorage.getItem('token') },
      });
      const data = await res.json();
      setRations(data);
    } catch (error) {
      console.error('Erro ao buscar rações:', error);
    }
  };

  // Buscar animais da API
  const fetchAnimals = async () => {
    try {
      const res = await fetch('http://localhost:3034/animals', {
        headers: { Authorization: localStorage.getItem('token') },
      });
      const data = await res.json();
      setAnimals(data);
    } catch (error) {
      console.error('Erro ao buscar animais:', error);
    }
  };

  // Calcular estimativa geral de duração do estoque (em dias)
  // A lógica: tempo médio que o estoque total dura considerando o consumo diário dos animais
  const calcularEstimativaDuracao = () => {
    if (rations.length === 0 || animals.length === 0) return '-';

    // Total estoque em toneladas
    const totalEstoque = rations.reduce((acc, r) => acc + parseToTons(r.quantity), 0);

    // Consumo diário total de ração em toneladas (somar consumo dos animais)
    const consumoDiarioTotal = animals.reduce((acc, animal) => {
      if (!animal.ration || !animal.ration.quantity) return acc;
      return acc + parseToTons(animal.ration.quantity);
    }, 0);

    if (consumoDiarioTotal === 0) return '∞';

    // Duração em dias = total estoque / consumo diário
    const duracaoDias = totalEstoque / consumoDiarioTotal;

    return `${duracaoDias.toFixed(0)} dias`;
  };

  useEffect(() => {
    fetchRations();
    fetchAnimals();
  }, []);

  return (
    <div>
      <div className="small-card-wrap">
        <SmallCard titulo="Estimativa de Duração" valor={calcularEstimativaDuracao()} />
        <SmallCard
          titulo="Total"
          valor={`${rations.reduce((acc, r) => acc + parseToTons(r.quantity), 0).toFixed(2)}t`}
        />
        <SmallCard titulo="Tipos de Ração" valor={rations.length} />
      </div>

      <h1>Lista de Ração</h1>
      <Food />
    </div>
  );
};

export default FoodStock;