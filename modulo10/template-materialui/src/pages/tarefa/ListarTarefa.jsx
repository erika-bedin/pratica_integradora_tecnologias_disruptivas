import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Modal from '@mui/material/Modal';

import CriarTarefa from './CriarTarefa';
import EditarTarefa from './EditarTarefa';

function createData(
  idTarefa,
  tituloTarefa,
  descricaoTarefa,
  inicioTarefa,
  fimTarefa,
  statusTarefa,
  recursoTarefa,
) {
  return { idTarefa, tituloTarefa, descricaoTarefa, inicioTarefa, fimTarefa, statusTarefa, recursoTarefa };
}

const initialRows = [
  createData(1, 'Tarefa 1', 'Descrição da Tarefa 1', '2022-01-01', '2022-01-02', 'Concluída', 'Recurso 1'),
  createData(2, 'Tarefa 2', 'Descrição da Tarefa 2', '2022-01-03', '2022-01-04', 'Em Andamento', 'Recurso 2'),
  createData(3, 'Tarefa 3', 'Descrição da Tarefa 3', '2022-01-04', '2022-01-05', 'Em Andamento', 'Recurso 3'),
  createData(4, 'Tarefa 4', 'Descrição da Tarefa 4', '2022-01-05', '2022-01-06', 'Em Andamento', 'Recurso 4'),
  createData(5, 'Tarefa 5', 'Descrição da Tarefa 5', '2022-01-06', '2022-01-07', 'Em Andamento', 'Recurso 5'),
  createData(6, 'Tarefa 6', 'Descrição da Tarefa 6', '2022-01-07', '2022-01-08', 'Aguardando', 'Recurso 6'),
];

const ListarTarefa = () => {
  const [open, setOpen] = useState(false);
  const [openEditar, setOpenEditar] = useState(false);
  const [tarefas, setTarefas] = useState([]);
  const [tarefa, setTarefa] = useState();
  const [idTarefaSelecionada, setIdTarefaSelecionada] = useState(null);

  useEffect(() => {
    setTarefas(initialRows);
  }, []);

  const handleEditar = (id) => {
    setIdTarefaSelecionada(id);

    const tarefaParaEditar = tarefas.find(obj => obj.idTarefa === id);
    setTarefa(tarefaParaEditar);

    setOpenEditar(true);
  };

  const handleDeletar = (id) => {
    setTarefas(current => current.filter(tarefa => tarefa.idTarefa !== id));
  };

  return (
    <>
      <Card>
        <CardHeader
          title="Tarefas"
          subheader="Listagem de Tarefas"
        />
        <CardContent>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Título</TableCell>
                  <TableCell align="right">Descrição</TableCell>
                  <TableCell align="right">Data de Início</TableCell>
                  <TableCell align="right">Data de Finalização</TableCell>
                  <TableCell align="right">Status</TableCell>
                  <TableCell align="right">Recurso</TableCell>
                  <TableCell align="center">Ação</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tarefas.map((row) => (
                  <TableRow key={row.idTarefa}>
                    <TableCell>{row.idTarefa}</TableCell>
                    <TableCell>{row.tituloTarefa}</TableCell>
                    <TableCell align="right">{row.descricaoTarefa}</TableCell>
                    <TableCell align="right">{row.inicioTarefa}</TableCell>
                    <TableCell align="right">{row.fimTarefa}</TableCell>
                    <TableCell align="right">{row.statusTarefa}</TableCell>
                    <TableCell align="right">{row.recursoTarefa}</TableCell>
                    <TableCell align="center">
                      <Button variant="contained" color="primary" onClick={() => handleEditar(row.idTarefa)}>
                        <EditIcon />
                      </Button>
                      <Button variant="contained" color="secondary" onClick={() => handleDeletar(row.idTarefa)}>
                        <DeleteIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
        <CardActions>
          <Button size="small" variant="contained" onClick={() => setOpen(true)}>Criar Tarefa</Button>
          <Button size="small" variant="outlined">Cancelar</Button>
        </CardActions>
      </Card>

      <Modal open={open} onClose={() => setOpen(false)}>
        <CriarTarefa handleClose={() => setOpen(false)} tarefas={tarefas} setTarefas={setTarefas} />
      </Modal>

      <Modal open={openEditar} onClose={() => setOpenEditar(false)}>
        <EditarTarefa handleCloseEditar={() => setOpenEditar(false)} idTarefaSelecionada={idTarefaSelecionada} tarefas={tarefas} tarefa={tarefa} setTarefas={setTarefas} />
      </Modal>
    </>
  );
};

export default ListarTarefa;