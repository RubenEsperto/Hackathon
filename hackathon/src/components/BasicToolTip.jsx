import * as React from 'react';
import Tooltip from '@mui/material/Tooltip';
import SmallCard from '../components/SmallCard.jsx'
import '../styles/BasicToolTip.css'

export default function BasicTooltip() {
  return (
    <Tooltip title="Data: 23/07/2025" placement="bottom">
      <SmallCard titulo="Próxima Encomenda" valor="Em 3 meses"/><button className="tool-button"></button>
    </Tooltip>
  );
}