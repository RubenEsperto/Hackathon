import React from 'react';
import DataTable from '../components/Table-Animals.jsx';
import SmallCard from '../components/SmallCard.jsx';
import SearchBar from '../components/SearchBar.jsx';
import BasicTable from '../components/TableModern.jsx'

const ListadeAnimais = (props) => {

    const handleSearch = async (query) => {
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      console.log('Search results:', data);
    } catch (err) {
      console.error('Search failed:', err);
    }
  };
  
  return (
    <div>
      <div className="small-card-wrap">
        <SmallCard titulo="Número Total de Animais" valor="1500"/>
        <SmallCard titulo="Número de Espécies Diferentes" valor="790"/>
      </div>
      <h1>Lista de Animais</h1>
      <SearchBar onSearch={handleSearch}/>
      <BasicTable/>
    </div>
  );
};

export default ListadeAnimais;
