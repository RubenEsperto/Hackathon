import * as React from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { LineChart } from '@mui/x-charts/LineChart';

export default function RationStockLineChart() {
  const [chartData, setChartData] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const [spentRes, rationsRes] = await Promise.all([
          fetch('http://localhost:3034/spent', {
            headers: { Authorization: localStorage.getItem('token') },
          }),
          fetch('http://localhost:3034/rations', {
            headers: { Authorization: localStorage.getItem('token') },
          }),
        ]);

        const spent = await spentRes.json();
        const rations = await rationsRes.json();

        const rationMap = {};
        rations.forEach((r) => {
          rationMap[r._id] = r.name;
        });

        const initialStocks = {
          'Peixe Congelado': 15,
          'Camarão Fresco': 8,
          'Moluscos Variados': 10,
          'Plâncton Seco': 9,
          'Ração para Tartarugas': 11,
          'Krill Congelado': 7,
        };

        const rationMonthly = {};
        const months = [
          'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
          'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
        ];

        // Inicializa cada ração com o estoque fixo no primeiro mês e 0 nos demais
        Object.values(rationMap).forEach((name) => {
          const initialStock = initialStocks[name] || 50; // padrão 50 se não achar
          rationMonthly[name] = [initialStock, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        });

        // Adiciona/subtrai as quantidades gastas no mês correspondente
        spent.forEach((entry) => {
          const date = new Date(entry.date);
          const monthIndex = date.getMonth();
          const rationName = rationMap[entry.rationId];
          if (!rationName) return;

          const rawQty = entry.quantity.replace('kg', '').replace('t', '000');
          const quantity = parseFloat(rawQty);

          rationMonthly[rationName][monthIndex] += quantity;
        });

        // Calcula o acumulado mês a mês
        Object.keys(rationMonthly).forEach((name) => {
          const values = rationMonthly[name];
          for (let i = 1; i < values.length; i++) {
            values[i] += values[i - 1];
          }
        });

        const series = Object.keys(rationMonthly).map((name, i) => ({
          id: `series-${i}`,
          label: name,
          data: rationMonthly[name],
          area: true,
          stack: 'total',
          highlightScope: { highlight: 'item' },
        }));

        const xAxis = [
          {
            id: 'months',
            scaleType: 'point',
            data: months,
          },
        ];

        setChartData({ series, xAxis, height: 400 });
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Stack direction="column" spacing={2} sx={{ width: '100%' }}>
      <Box sx={{ flexGrow: 1 }}>
        {chartData ? (
          <LineChart {...chartData} />
        ) : (
          <p>Carregando gráfico...</p>
        )}
      </Box>
    </Stack>
  );
}