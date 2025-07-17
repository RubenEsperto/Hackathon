import React, { useEffect, useState } from 'react';
import '../styles/Table-Animals.css';
import AddAnimalForm from './AddAnimalForm';

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
    <>
      <div className="table-container">
        <table className="data-table">
          <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Espécie</th>
            <th>Tipo de Ração</th>
            <th>Quantidade</th>
            <th>Ações</th>
          </tr>
        </thead>
          <tbody>
            {animals.map((animal, i) => (
              <tr key={animal._id}>
                <td>{i + 1}</td>
                <td>{animal.name}</td>
                <td>{animal.species}</td>
                <td>{rations.find(r => r._id === animal.ration?.type)?.name || '-'}</td>
                <td>{animal.ration?.quantity || '-'}</td>
                <td>
                  <button
                    className="action-button edit-button"
                    onClick={() => handleAddFood(animal._id)}
                  >
                    Editar
                  </button>
                  <button
                      className='action-button delete-button'
                      onClick={() => handleDeleteAnimal(animal._id)}
                      >Apagar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
    </>
  );
};

export default DataTable;

