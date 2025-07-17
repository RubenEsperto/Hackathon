import React, { useEffect, useState } from 'react';
import '../styles/Table-Animals.css';
import AddAnimalForm from './AddAnimalForm';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const DataTable = () => {
  const [animals, setAnimals] = useState([]);
  const [rations, setRations] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const fetchAnimals = async () => {
    try {
      const res = await fetch('http://localhost:3034/animals', {
        headers: { Authorization: localStorage.getItem('token') },
      });
      const data = await res.json();
      setAnimals(data);
    } catch (err) {
      console.error('Erro ao buscar animais:', err);
    }
  };

  const fetchRations = async () => {
    try {
      const res = await fetch('http://localhost:3034/rations', {
        headers: { Authorization: localStorage.getItem('token') },
      });
      const data = await res.json();
      setRations(data);
    } catch (err) {
      console.error('Erro ao buscar rações:', err);
    }
  };

  useEffect(() => {
    fetchAnimals();
    fetchRations();
  }, []);

  const handleAddFood = async (id) => {
  const amount = prompt('Nova quantidade (ex: 500g, 2kg, 3.5t):');

  const unitRegex = /^\d*\.?\d+\s*(g|kg|t)$/i;

  if (amount && unitRegex.test(amount.trim())) {
    const cleanedAmount = amount.trim().toLowerCase();

    try {
      const token = localStorage.getItem('token'); // adjust this if you store token differently

      const response = await fetch(`http://localhost:3034/animals/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify({ ration: cleanedAmount })
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message || 'Animal atualizado com sucesso!');
        setRations(prev =>
          prev.map(ration =>
            ration._id === id ? { ...ration, quantity: cleanedAmount } : ration
          )
        );
      } else {
        alert(data.error || data.message || 'Erro ao atualizar o animal.');
      }
    } catch (err) {
      alert('Erro de rede ou do servidor.');
      console.error(err);
    }

  } else {
    alert('Por favor, insira uma quantidade válida (ex: 500g, 2kg, 3.5t).');
  }
};

  // **Novo**: só fecha o form e recarrega a lista
  const handleAddAnimal = () => {
    setShowForm(false);
    fetchAnimals();
  };

  const handleDeleteAnimal = async (id) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Você precisa estar logado para deletar um animal.');
      return;
    }
    try {
      const res = await fetch(`http://localhost:3034/animals/${id}`, {
        method: 'DELETE',
        headers: { Authorization: token },
      });

      if (res.ok) {
        alert('Animal deletado com sucesso!');
        fetchAnimals(); // Recarrega a lista de animais
      } else {
        const err = await res.json();
        alert(`Erro ao deletar animal: ${err.error || err.message}`);
      }
    } catch (err) {
      console.error('Erro ao deletar animal:', err);
      alert('Erro ao deletar animal.');
    } finally {
      setShowForm(false); // Fecha o formulário se estiver aberto
    }
  }
  
  return (
    <div>
    <TableContainer component={Paper} sx={{ backgroundColor: '#f5f5f5' }}>
  <Table sx={{ minWidth: 650 }} aria-label="simple table">
    <TableHead>
      <TableRow sx={{ backgroundColor: '#2b7a78' }}>
        <TableCell sx={{ color: 'white' , fontSize: '25px'}}>ID </TableCell>
        <TableCell sx={{ color: 'white' , fontSize: '25px'}} align="right">Nome</TableCell>
        <TableCell sx={{ color: 'white' , fontSize: '25px'}} align="right">Espécie</TableCell>
        <TableCell sx={{ color: 'white' , fontSize: '25px'}} align="right">Tipo de Ração</TableCell>
        <TableCell sx={{ color: 'white' , fontSize: '25px'}} align="right">Quantidade</TableCell>
        <TableCell sx={{ color: 'white' , fontSize: '25px'}} align="right">Ações</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {animals.map((animal, i) => (
        <TableRow
          key={animal.name}
          sx={{
            '&:last-child td, &:last-child th': { border: 0 },
            '&:hover': { backgroundColor: '#e3f2fd' },
          }}
        >
          <TableCell component="th" scope="row" sx={{fontSize: '20px'}}>{i}</TableCell>
          <TableCell align="right" sx={{fontSize: '20px'}}>{animal.name}</TableCell>
          <TableCell align="right" sx={{fontSize: '20px'}}>{animal.species}</TableCell>
          <TableCell align="right" sx={{fontSize: '20px'}}>{rations.find(r => r._id === animal.ration?.type)?.name || '-'}</TableCell>
          <TableCell align="right" sx={{fontSize: '20px'}}>{animal.ration?.quantity || '-'}</TableCell>
          <TableCell align="right">
            <button
              className="action-button edit-button"
              onClick={() => handleAddFood(animal._id)}
            >
              Editar
            </button>
            <button
              className="action-button delete-button"
              onClick={() => handleDeleteAnimal(animal._id)}
            >
              Apagar
            </button>
          </TableCell>
        </TableRow> 
))}
    </TableBody>
  </Table>
</TableContainer>
      <button
        onClick={() => setShowForm(prev => !prev)}
        className="add-animal-btn"
      >
        {showForm ? 'Cancelar' : 'Adicionar Animal'}
      </button>

      {showForm && (
        <AddAnimalForm
          onAdd={handleAddAnimal}
          rations={rations}
        />
      )}  
</div>
  )
}

export default DataTable;

