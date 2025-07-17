import React, { useEffect, useState } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import '../styles/BarGraph.css';

const chartSetting = {
  yAxis: [
    {
      label: 'Consumo (kg)',
      width: 60,
    },
  ],
  height: 300,
};

const valueFormatter = (value) => `${value}kg`;

export default function BarsDataset() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchSpentData = async () => {
      try {
        const res = await fetch('http://localhost:3034/spent', {
          headers: {
            Authorization: localStorage.getItem('token'), // ajuste conforme seu método de auth
          },
        });
        const raw = await res.json();

        // Agrupar por mês e por tipo de ração
        const monthlyTotals = {};

        raw.forEach((entry) => {
          const date = new Date(entry.date);
          const month = date.toLocaleString('default', { month: 'short' });
          const ration = entry.rationName || entry.name || 'Ração Gasta';
          const quantity = parseFloat(entry.quantity.replace('kg', '').replace('t', '000')) || 0;

          if (!monthlyTotals[month]) monthlyTotals[month] = {};
          if (!monthlyTotals[month][ration]) monthlyTotals[month][ration] = 0;

          monthlyTotals[month][ration] += quantity;
        });

        // Converter para array no formato do BarChart
        const formatted = Object.entries(monthlyTotals).map(([month, rations]) => ({
          month,
          ...rations,
        }));

        setData(formatted);
      } catch (error) {
        console.error('Erro ao buscar /spent:', error);
      }
    };

    fetchSpentData();
  }, []);

  // Extrair chaves únicas (nomes de ração) para gerar `series`
  const uniqueKeys = Array.from(
    data.reduce((keys, item) => {
      Object.keys(item).forEach((k) => {
        if (k !== 'month') keys.add(k);
      });
      return keys;
    }, new Set())
  );

  return (
    <div className="bar-wrap">
      <h2>Média de Consumo Anual</h2>
      <BarChart
        dataset={data}
        xAxis={[{ dataKey: 'month' }]}
        series={uniqueKeys.map((key) => ({
          dataKey: key,
          label: key,
          valueFormatter,
        }))}
        {...chartSetting}
      />
    </div>
  );
}