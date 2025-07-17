import React, { useEffect, useState } from 'react';
import '../styles/Table-Animals.css';
import AddAnimalForm from './AddAnimalForm';

const DataTable = () => {
  const [animals, setAnimals] = useState([]);
  const [rations, setRations] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // Busca todos os animais
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

  // Busca todas as rações
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

  // Retorna o nome da ração dado o rationid
  const getRationName = (rationTypeId) => {
    if (!rationTypeId) return '-';
    const r = rations.find(r => r._id === rationTypeId);
    return r ? r.name : '-';
  };

  const handleAddFood = async (id) => {
    const amount = prompt('Definir quantidade de ração (apenas número):');
    const unit = prompt('Definir unidade de peso (g, kg ou t):').toLowerCase();

    const quantity = parseFloat(amount);
    if (isNaN(quantity)) {
      alert('Por favor, insira um número válido para a quantidade.');
      return;
    }

    if (!['g', 'kg', 't'].includes(unit)) {
      alert('Unidade inválida. Use g, kg ou t.');
      return;
    }

    if (quantity <= 0) {
      alert('Quantidade deve ser maior que zero.');
      return;
    }

    const quantityString = `${quantity}${unit}`;

    try {
      const res = await fetch(`http://localhost:3034/animals/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('token'),
        },
        body: JSON.stringify({ ration: quantityString }),
      });

      const data = await res.json();
      if (res.ok) {
        alert('Atualização feita com sucesso!');
        fetchAnimals();
      } else {
        alert(`Erro: ${data.error || data.message}`);
      }
    } catch (err) {
      console.error('Erro na atualização:', err);
      alert('Erro ao tentar atualizar a ração.');
    }
  };

  const handleAddAnimal = async (newAnimal) => {
    try {
      const payload = {
        name: newAnimal.name,
        species: newAnimal.species,
        ration: {
          rationid: newAnimal.rationid,
          quantity: newAnimal.quantity,
        }
      };

      const res = await fetch('http://localhost:3034/animals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('token'),
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        alert("Animal adicionado com sucesso!");
        fetchAnimals();
        setShowForm(false);
      } else {
        const data = await res.json();
        alert(`Erro: ${data.message || 'Não foi possível adicionar o animal'}`);
      }
    } catch (err) {
      console.error(err);
      alert("Erro ao adicionar animal.");
    }
  };

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
              <th>Adicionar Comida</th>
            </tr>
          </thead>
          <tbody>
            {animals.map((animal, i) => (
              <tr key={animal._id}>
                <td>{i + 1}</td>
                <td>{animal.name}</td>
                <td>{animal.species}</td>
                <td>{getRationName(animal.ration?.type)}</td>
                <td>{animal.ration?.quantity || '-'}</td>
                <td>
                  <button
                    className='addFood'
                    onClick={() => handleAddFood(animal._id)}
                  >
                    Editar
                  </button>
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

      {showForm && <AddAnimalForm onAdd={handleAddAnimal} />}
    </>
  );
};

export default DataTable;