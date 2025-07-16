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
            setFormData({ nome: '', 
                espécie: '', 
                ração: '', 
                quantidade: '' });
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

            <select 
            name="ração"
            value={formData.ração}
            onChange={handleChange}
            >
                <option value="">Selecione o tipo de ração</option>
                <option value="Peixes e crustáceos">Peixes e crustáceos</option>
                <option value="Sardinhas">Sardinhas</option>
                <option value="Comida de peixe normal">Comida de peixe normal</option>
                <option value="Atum e outros peixes">Atum e outros peixes</option>
            </select>

            

            <input 
            type="text"
            name="quantidade"
            placeholder="Quantidade (ex: 10 toneladas)"
            value={formData.quantity}
            onChange={handleChange}
            />
            <button type="submit" className='add-animal'> Adicionar Animal </button> 
            </form>

    ); 
}; 

export default AddAnimalForm;