import React, { useEffect, useState } from 'react';
import './Table-Animals'; // reutilizando estilos
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


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
    <TableContainer component={Paper} sx={{ backgroundColor: '#f5f5f5' }}>
  <Table sx={{ minWidth: 650 }} aria-label="simple table">
    <TableHead>
      <TableRow sx={{ backgroundColor: '#2b7a78' }}>
        <TableCell sx={{ color: 'white' , fontSize: '25px'}}>ID </TableCell>
        <TableCell sx={{ color: 'white' , fontSize: '25px'}} align="right">Tipo de Ração</TableCell>
        <TableCell sx={{ color: 'white' , fontSize: '25px'}} align="right">Quantidade</TableCell>
        <TableCell sx={{ color: 'white' , fontSize: '25px'}} align="right">Dueação Estimada</TableCell>
        <TableCell sx={{ color: 'white' , fontSize: '25px'}} align="right">Ações</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {rations.map((ration, i) => (
        <TableRow
          key={i}
          sx={{
            '&:last-child td, &:last-child th': { border: 0 },
            '&:hover': { backgroundColor: '#e3f2fd' },
          }}
        >
          <TableCell component="th" scope="row" >{i}</TableCell>
          <TableCell align="right" sx={{fontSize: '20px'}}>{ration.name}</TableCell>
          <TableCell align="right" sx={{fontSize: '20px'}}>{ration.quantity}</TableCell>
          <TableCell align="right" sx={{fontSize: '20px'}}>{getRemainingMonths(ration, ration.quantity)}</TableCell>
          <TableCell align="right" sx={{fontSize: '20px'}}> <button className='action-button edit-button'onClick={() => handleEditQuantidade(ration.id)}>
                   Editar
                 </button></TableCell>
        </TableRow>
))}
    </TableBody>
  </Table>
</TableContainer>
  )
}


export default FeedTable;
