import React, { useEffect, useState } from 'react';
import DataTable from '../components/Table-Animals.jsx';
import SmallCard from '../components/SmallCard.jsx';

const ListadeAnimais = () => {
  const [totalAnimais, setTotalAnimais] = useState(0);
  const [totalEspecies, setTotalEspecies] = useState(0);

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const res = await fetch('http://localhost:3034/animals', {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });
        const data = await res.json();

        setTotalAnimais(data.length);

        const especiesSet = new Set();
        data.forEach((animal) => {
          if (animal.species) {
            especiesSet.add(animal.species);
          }
        });

        setTotalEspecies(especiesSet.size);
      } catch (error) {
        console.error('Erro ao buscar animais:', error);
      }
    };

    fetchAnimals();
  }, []);

  return (
    <div>
      <div className="small-card-wrap">
        <SmallCard titulo="Número Total de Animais" valor={totalAnimais} />
        <SmallCard titulo="Número de Espécies Diferentes" valor={totalEspecies} />
      </div>
      <h1>Lista de Animais</h1>
      <DataTable />
    </div>
  );
};

export default ListadeAnimais;