import React from 'react';
import '../styles/Table-Animals.css';

const DataTable = () => {
  const animals = [ 
    
    { id: 1, nome: 'Larry', espécie: 'Lontra', ração: 'Peixes e crustáceos ', quantity: '20 toneladas'},
    { id: 2, nome: 'Dolly & Molly', espécie: 'Golfinho', ração: 'Sardinhas', quantity: '12 toneladas'}, 
    { id: 3, nome: 'Nemo', espécie: 'Peixe-palhaço', ração: 'Comida de peixe normal ', quantity: '4 toneladas'},
    { id: 4, nome: 'Kroak', espécie: 'Tubarão-Branco', ração: 'Atum e outros peixes ', quantity: '20 toneladas'}
  ]; 


  const handleAddFood = (id) => {
    const amount = prompt('Definir quantidade de ração');
    const tons = parseFloat(amount)
  }

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
          {animals.map(animal => (
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
  );
};

export default DataTable;
