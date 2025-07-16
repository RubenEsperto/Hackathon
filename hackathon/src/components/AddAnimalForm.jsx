import React, { useState, useEffect } from 'react';
import '../styles/Table-Animals.css';

const AddAnimalForm = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    nome: '',
    espécie: '',
    ração: '',
    quantidade: '',
  });

  const [rations, setRations] = useState([]);

  useEffect(() => {
    const fetchRations = async () => {
      try {
        const res = await fetch('http://localhost:3034/rations', {
          headers: {
            Authorization: localStorage.getItem("token"),
          }
        });
        const data = await res.json();
        setRations(data);
      } catch (err) {
        console.error('Erro ao buscar rações:', err);
      }
    };

    fetchRations();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { nome, espécie, ração, quantidade } = formData;

    if (!nome || !espécie || !ração || !quantidade) {
      alert("Preencha todos os campos!");
      return;
    }

    const selectedRation = rations.find(r => r.name.toLowerCase() === ração.toLowerCase());

    if (!selectedRation) {
      alert("Tipo de ração não encontrado.");
      return;
    }

    const animal = {
      name: nome,
      species: espécie,
      ration: {
        rationid: selectedRation._id,
        quantity: quantidade.endsWith('t') ? quantidade : `${quantidade}t`,
      }
    };

    try {
      const res = await fetch('http://localhost:3034/animals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify(animal)
      });

      const data = await res.json();
      if (res.ok) {
        onAdd({ ...animal, _id: data.id });
        setFormData({ nome: '', espécie: '', ração: '', quantidade: '' });
      } else {
        alert(`Erro: ${data.error || data.message}`);
      }
    } catch (err) {
      console.error('Erro ao adicionar animal:', err);
      alert('Erro ao enviar dados do animal.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-animal-form">
      <input
        type="text"
        name="nome"
        placeholder="Nome"
        value={formData.nome}
        onChange={handleChange}
      />
      <input
        type="text"
        name="espécie"
        placeholder="Espécie"
        value={formData.espécie}
        onChange={handleChange}
      />
      <input
        type="text"
        name="ração"
        placeholder="Tipo de ração (ex: Milho)"
        value={formData.ração}
        onChange={handleChange}
      />
      <input
        type="text"
        name="quantidade"
        placeholder="Quantidade (ex: 10t)"
        value={formData.quantidade}
        onChange={handleChange}
      />
      <button type="submit">Adicionar Animal</button>
    </form>
  );
};

export default AddAnimalForm;