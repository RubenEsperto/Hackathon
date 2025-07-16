import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import '../styles/PieChart.css'
export default function BasicPie() {
  return (<>
    <h2>Estoque dividido por tipo</h2>
    <PieChart
      series={[
        {
          data: [
            { id: 0, value: 10, label: 'Sardinhas' },
            { id: 1, value: 15, label: 'Crustaceos' },
            { id: 2, value: 20, label: 'Moluscos' },
          ],
        },
      ]}
      width={200}
      height={200}
    />
    </>
  );
}
