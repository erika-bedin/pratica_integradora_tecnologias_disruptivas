import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Input, FormHelperText } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';

const CriarTarefa = ({ handleClose, tarefas, setTarefas }) => {
  const [idTarefa, setIdTarefa] = useState();
  const [tituloTarefa, setTituloTarefa] = useState('');
  const [descricaoTarefa, setDescricaoTarefa] = useState('');
  const [inicioTarefa, setInicioTarefa] = useState('');
  const [fimTarefa, setFimTarefa] = useState('');
  const [recursoTarefa, setRecursoTarefa] = useState('');
  const [statusTarefa, setStatusTarefa] = useState('');
  const [tituloError, setTituloError] = useState(false); // Estado para controlar o erro no campo de título

  useEffect(() => {
    let proximoId = Math.max(...tarefas.map(tarefa => tarefa.idTarefa)) + 1;
    setIdTarefa(proximoId);
  }, []);

  const handleRecurso = (event) => {
    setRecursoTarefa(event.target.value);
  };

  const handleStatus = (event) => {
    setStatusTarefa(event.target.value);
  };

  const handleSalvar = () => {
    // Verificação básica se o título está vazio
    if (tituloTarefa.trim() === '') {
      setTituloError(true);
      return; // Se estiver vazio, não permita salvar
    }

    setTarefas([...tarefas, {
      idTarefa,
      tituloTarefa,
      descricaoTarefa,
      inicioTarefa,
      fimTarefa,
      recursoTarefa,
      statusTarefa
    }]);
    handleClose();
  };

  return (
    <Grid container spacing={2}>
      <Card sx={style}>
        <CardHeader
          title="Tarefas"
          subheader="Cadastro de Tarefas"
        />
        <CardContent sx={{
          width: '95%',
          maxWidth: '100%',
        }}>
          <Grid item xs={12}>
            <FormControl fullWidth error={tituloError}> {/* Aplica o estado de erro ao FormControl */}
              <Input id="tarefa_titulo" aria-describedby="tarefa_titulo_helper_text" value={tituloTarefa} onChange={e => { setTituloTarefa(e.target.value); setTituloError(false); }} />
              <FormHelperText id="tarefa_titulo_helper_text">Título da Tarefa.</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <Input id="tarefa_descricao" aria-describedby="tarefa_descricao_helper_text" value={descricaoTarefa} onChange={e => { setDescricaoTarefa(e.target.value) }} />
              <FormHelperText id="tarefa_descricao_helper_text">Descrição da Tarefa.</FormHelperText>
            </FormControl>
          </Grid>
          {/* Restante do código permanece o mesmo */}
        </CardContent>
        <CardActions>
          <Button size="small" variant="contained" onClick={handleSalvar}>Salvar</Button>
          <Button size="small" variant="outlined" onClick={handleClose}>Cancelar</Button>
        </CardActions>
      </Card>
    </Grid>
  );
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '60%',
  bgcolor: 'background.paper',
  p: 4,
};

export default CriarTarefa;