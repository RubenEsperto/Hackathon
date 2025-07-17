import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function BasicTable() {
  return (
    <div className="table-box">
    <TableContainer component={Paper} sx={{ backgroundColor: '#f5f5f5'}}>
  <Table sx={{ minWidth: 650 }} aria-label="simple table">
    <TableHead>
      <TableRow sx={{ backgroundColor: '#1976d2' }}>
        <TableCell sx={{ color: 'white', fontSize: '25px', fontFamily: 'Georgia, Times New Roman, serif' }}>ID </TableCell>
        <TableCell sx={{ color: 'white', fontSize: '25px', fontFamily: 'Georgia, Times New Roman, serif' }} align="right">Nome</TableCell>
        <TableCell sx={{ color: 'white', fontSize: '25px', fontFamily: 'Georgia, Times New Roman, serif' }} align="right">Espécie</TableCell>
        <TableCell sx={{ color: 'white', fontSize: '25px', fontFamily: 'Georgia, Times New Roman, serif' }} align="right">Carbs</TableCell>
        <TableCell sx={{ color: 'white', fontSize: '25px', fontFamily: 'Georgia, Times New Roman, serif' }} align="right">Protein&nbsp;(g)</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {rows.map((row) => (
        <TableRow
          key={row.name}
          sx={{
            '&:last-child td, &:last-child th': { border: 0 },
            '&:hover': { backgroundColor: '#e3f2fd' },
          }}
        >
          <TableCell component="th" scope="row">{row.name}</TableCell>
          <TableCell align="right">{row.calories}</TableCell>
          <TableCell align="right">{row.fat}</TableCell>
          <TableCell align="right">{row.carbs}</TableCell>
          <TableCell align="right">{row.protein}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>
</div> 
)
}