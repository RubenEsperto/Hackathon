import React, { useEffect, useState } from 'react';
import '../styles/Table-Animals.css';

const DataTable = () => {
  const [animals, setAnimals] = useState([]);

  const fetchAnimals = async () => {
    const res = await fetch('http://localhost:3034/animals');
    const data = await res.json();
    setAnimals(data);
  };

  useEffect(() => {
    fetchAnimals();
  }, []);

  const handleAddFood = async (id) => {
    const amount = prompt('Definir quantidade de ração');
    const tons = parseFloat(amount)

    if (isNaN(tons)) {
      alert('Por favor, insira um número válido.');
      return;
    }
    
    try {
      const res = await fetch(`http://localhost:3034/animals/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({ ration: tons })
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

  return (
    <div className="table-container">
        <h1>Lista de Animais</h1>
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
            <tr key={i}>
              <td>{i}</td>
              <td>{animal.name}</td>
              <td>{animal.species}</td>
              <td>{animal.ration.type}</td>
              <td>{animal.ration.quantity}</td>
              <td> <button className='addFood' onClick={() => handleAddFood(animal._id)}> Editar</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
