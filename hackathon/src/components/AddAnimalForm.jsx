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

    const handleSubmit = (e) => { 
        e.preventDefault();
       
       
      
        if(formData.nome && formData.espécie && formData.ração && formData.quantidade) {
            onAdd(formData);
            setFormData({ nome: '', espécie: '', ração: '', quantidade: '' });
        } else { 
            alert("Preencha todos os campos!");
        }
    };
    
 
    
     
    return( 
        <form onSubmit={handleSubmit} className="add-animal-form">
            <input 
            type="text"
            name="nome"
            placeholder='Nome'
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
            placeholder="Tipo de ração"
            value={formData.ração}
            onChange={handleChange}
            />

            <input 
            type="text"
            name="quantidade"
            placeholder="Quantidade (ex: 10 toneladas)"
            value={formData.quantity}
            onChange={handleChange}
            />
            <button type="submit"> Adicionar Animal </button> 
            </form>

    ); 
}; 

export default AddAnimalForm;