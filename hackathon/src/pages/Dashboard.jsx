import React, { useEffect, useState } from 'react';
import LineChart from '../components/lineChart.jsx';
import PieChart from '../components/PieChart.jsx';
import SmallCard from '../components/SmallCard.jsx';
import BarGraph from '../components/BarGraph.jsx';
import BasicTooltip from '../components/BasicToolTip.jsx';
import '../styles/Dashboard.css';

// 📌 Converte "500g", "1.2kg", "0.01t" para kg
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

export default function Dashboard() {
  const [totalKg, setTotalKg] = useState(0);
  const [monthlyUsageKg, setMonthlyUsageKg] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchRations = async () => {
      try {
        const res = await fetch('http://localhost:3034/rations', {
          headers: { Authorization: token },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Erro ao buscar rações');

        const total = data.reduce((sum, ration) => {
          return sum + toKg(ration.quantity);
        }, 0);

        setTotalKg(total.toFixed(2));
      } catch (err) {
        console.error('Erro ao buscar rações:', err);
      }
    };

    const fetchAnimals = async () => {
      try {
        const res = await fetch('http://localhost:3034/animals', {
          headers: { Authorization: token },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Erro ao buscar animais');

        const monthlyTotal = data.reduce((sum, animal) => {
          const daily = toKg(animal.ration?.quantity);
          return sum + daily * 30;
        }, 0);

        setMonthlyUsageKg(monthlyTotal.toFixed(2));
      } catch (err) {
        console.error('Erro ao buscar animais:', err);
      }
    };

    fetchRations();
    fetchAnimals();
  }, []);

  return (
    <>
      <div className="small-card-wrap">
        <SmallCard titulo="Stock Disponível" valor={`${totalKg} kg`} />
        <SmallCard titulo="Stock Gasto Este Mês" valor={`${monthlyUsageKg} kg`} />
        <BasicTooltip />
      </div>

      <div className="card-double">
        <PieChart />
        <BarGraph />
      </div>

      <div className="line-chart">
        <h2>Estoque dividido por tipo</h2>
        <LineChart />
      </div>

      <div className="div7">Table?</div>
    </>
  );
}