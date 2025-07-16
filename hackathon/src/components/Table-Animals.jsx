import React, { useEffect, useState } from 'react';
import '../styles/Table-Animals.css';
import AddAnimalForm from './AddAnimalForm';

const DataTable = () => {
  const [animals, setAnimals] = useState([]);
  const [showForm, setShowForm] = useState(false);

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
    const tons = parseFloat(amount);
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
          Authorization: localStorage.getItem("token"),
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
          {setAnimals.map(animal => (
            <tr key={animal.id}>
              <td>{animal.id}</td>
              <td>{animal.nome}</td>
              <td>{animal.espécie}</td>
              <td>{animal.ração}</td>
              <td>{animal.quantity}</td>
              <td> <button className='addFood' onClick={() => handleAddFood(animal.id)}> Editar</button></td>
            </tr>
          ))}
        </tbody> 
              </table>
     
    </div> 
    <button onClick={()=> setShowForm(prev=>!prev )} className="add-animal-btn"> 
          {showForm ? 'Cancelar' : 'Adicionar Animal' }
          </button>
          
         {showForm && <AddAnimalForm onAdd={handleAddAnimal} />}
    </>
  );
};

export default DataTable;