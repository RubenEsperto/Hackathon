import React, { useState } from 'react';
import '../styles/Table-Animals.css';

const AddAnimalForm = ({ onAdd}) => { 
    const [formData, setFormData] = useState({ 
        nome: '', 
        espécie: '',
        ração: '',
        quantidade: '',
    });  

    const QUANTIDADE_MAXIMA = 250 //Limite máximo de comida para cada animal.
    
    const handleChange = (e) => { 
        const { nome, valor } = e.target;
        setFormData(prev => ({...prev, [nome]: valor })); 
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