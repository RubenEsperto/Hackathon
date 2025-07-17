import * as React from 'react';
import { useEffect, useState } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import '../styles/PieChart.css';

// Função utilitária para converter para kg
function toKg(quantity) {
  if (!quantity) return 0;
  const match = quantity.trim().match(/^([\d.]+)\s*(g|kg|t)$/i);
  if (!match) return 0;

  const value = parseFloat(match[1]);
  const unit = match[2].toLowerCase();

  switch (unit) {
    case 'g':
      return value / 1000;
    case 'kg':
      return value;
    case 't':
      return value * 1000;
    default:
      return 0;
  }
}

export default function BasicPie() {
  const [rations, setRations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRations = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:3034/rations', {
          headers: {
            'Authorization': token
          }
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || 'Erro ao buscar dados');
        }

        setRations(data);
        setLoading(false);
      } catch (err) {
        console.error('Erro ao buscar rações:', err);
        setLoading(false);
      }
    };

    fetchRations();
  }, []);

  // Agrupar por tipo e somar quantidades convertidas para kg
  const groupedData = rations.reduce((acc, ration) => {
    const name = ration.name;
    const kg = toKg(ration.quantity);

    if (!acc[name]) acc[name] = 0;
    acc[name] += kg;
    return acc;
  }, {});

  // Transformar para o formato aceito pelo PieChart
  const chartData = Object.entries(groupedData).map(([label, value], index) => ({
    id: index,
    label,
    value: parseFloat(value.toFixed(2)),
  }));

  return (
    <div className="pie-wrap">
      <h2>Estoque dividido por tipo (kg)</h2>
      {loading ? (
        <p>Carregando gráfico...</p>
      ) : chartData.length === 0 ? (
        <p>Sem dados de ração disponíveis.</p>
      ) : (
        <PieChart
          series={[{ data: chartData }]}
          width={350}
          height={350}
        />
      )}
    </div>
  );
}