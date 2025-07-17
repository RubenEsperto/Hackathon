import React, { useState, useEffect } from 'react';
import '../styles/AddAnimal.css';

const AddAnimalForm = ({ onAdd, rations }) => {
  const [formData, setFormData] = useState({
    nome: '',
    espécie: '',
    ração: '',
    quantidade: '',
  });

  // If you still want to fetch rations here instead of parent, keep this.
  // But since DataTable already has rations, you can remove the fetch here
  // and just use the prop.
  useEffect(() => {
    // … opcional: remover se parent já faz fetch …
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { nome, espécie, ração, quantidade } = formData;

    const unitRegex = /^\d*\.?\d+\s?(g|kg|t)$/;

    if (!unitRegex.test(formData.quantidade)) {
        alert('Por favor insira a quantidade no formato correto (ex: 10g, 2.5kg, 0.01t)');
        return;
    }

    if (!nome || !espécie || !ração || !quantidade) {
      alert('Preencha todos os campos!');
      return;
    }

    // Encontra a ração pelo ID (vindo do <select> do pai)
    const selected = rations.find(r => r._id === ração);
    if (!selected) {
      alert('Tipo de ração não encontrado.');
      return;
    }

    // Garante que quantity é string não-vazia antes de concatenar
    const qtyTrimmed = quantidade.trim();
    const finalQty = qtyTrimmed.endsWith('t')
      ? qtyTrimmed
      : `${qtyTrimmed}`;

    const payload = {
      name: nome,
      species: espécie,
      ration: {
        type: selected._id,
        quantity: finalQty,
      },
    };

    try {
      const res = await fetch('http://localhost:3034/animals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('token'),
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert('Animal adicionado com sucesso!');
        // limpa o form
        setFormData({ nome: '', espécie: '', ração: '', quantidade: '' });
        // aciona o callback do pai (fecha + recarrega lista)
        onAdd();
      } else {
        const err = await res.json();
        alert(`Erro: ${err.error || err.message}`);
      }
    } catch (err) {
      console.error(err);
      alert('Erro ao enviar dados do animal.');
    }
  };

  return (
    <div className="form-flex">
      <form onSubmit={handleSubmit} className="add-animal-form">
        <input
          type="text"
          name="nome"
          placeholder="Nome"
          className="input-row"
          value={formData.nome}
          onChange={handleChange}
        />
        <input
          type="text"
          name="espécie"
          placeholder="Espécie"
          className="input-row"
          value={formData.espécie}
          onChange={handleChange}
        />

        {/* aqui trocamos apenas o input de texto por um select */}
        <select
          name="ração"
          className="input-row"
          value={formData.ração}
          onChange={handleChange}
        >
          <option value="">Tipo de ração (selecione)</option>
          {rations.map(r => (
            <option key={r._id} value={r._id}>
              {r.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="quantidade"
          placeholder="Quantidade (g/kg/t)"
          className="input-row"
          value={formData.quantidade}
          onChange={handleChange}
        />

        <button type="submit">Adicionar Animal</button>
      </form>
    </div>
  );
};

export default AddAnimalForm;