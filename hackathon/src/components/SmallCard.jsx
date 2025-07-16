import * as React from 'react';
import '../styles/SmallCard.css'

export default function SmallCard(props) {
  
    return (
        <div className="card">
            <h3 className="card-title">
             {props.titulo}
            </h3>
            <p className="card-value">
            {props.valor}
            </p>
        </div>
      ) 
}