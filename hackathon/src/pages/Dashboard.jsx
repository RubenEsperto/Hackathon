import LineChart from '../components/lineChart.jsx'
import React from 'react'
import '../styles/Dashboard.css'
import PieChart from '../components/PieChart.jsx'
import SmallCard from '../components/SmallCard.jsx'
import BarGraph from '../components/BarGraph.jsx'
import BasicTooltip from '../components/BasicToolTip.jsx'

export default function Dashboard(){
    return( 
    <>
<div class="small-card-wrap">
        <SmallCard titulo="Estoque Disponível" valor="100ton"/>
        <SmallCard titulo="Estoque Total" valor="100ton"/>
        <SmallCard titulo="Estoque Gasto Este Mês" valor="100ton"/>
        <BasicTooltip/>
</div>
    <div class="card-double">
    <PieChart/>
    <BarGraph/>
    </div>

    <div class="line-chart">
            <h2>Estoque dividido por tipo</h2>
                <LineChart/>
    </div>
    
    <div class="div7">
    Table?</div>
</>
    )
}