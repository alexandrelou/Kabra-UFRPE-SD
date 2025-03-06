import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&::before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function CustomizedAccordions() {
  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
        <div>
            <h5 style={{ backgroundColor: '#AC79FA', color: 'white', fontSize: '2.5rem', padding: '0.5rem', borderRadius: '1.5rem', fontFamily: 'serif', textAlign: 'center', marginBottom: '1.5rem', marginTop: '1rem' }}>
                Perguntas Frequentes
            </h5>
      </div>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography style={{fontSize: '2rem'}}>Como funciona o Kabra?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
        <div style={{ marginBottom: '10px', fontSize: '1.5rem' }}>
            <strong>Passo 1:</strong> Selecione a Universidade que deseja.
        </div>  
        <div style={{ marginBottom: '10px', fontSize: '1.5rem' }}>
                <strong>Passo 2:</strong> Selecione o tipo de processo desejado.
        </div>
        <div style={{ marginBottom: '10px', fontSize: '1.5rem' }}>
            <strong>Passo 3:</strong> Preencha todos os campos do formulário de acordo com as especificações.
        </div>
        <div style={{fontSize: '1.5rem'}}>
            <strong>Passo 4:</strong> Após a conclusão, salve o documento como PDF ou Word.
        </div>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography style={{fontSize: '2rem'}}>Não encontrei o documento que queria, o que faço?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <div style={{fontSize: '1.5rem'}}>Infelizmente, o projeto Kabra ainda se encontra em desenvolvimento, possuir todos os documentos utilizados em uma Universidade é a prioridade, mas nem sempre podemos alcançar. Portanto, contate o diretor do seu departamento para saber como prosseguir. 
            </div>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography style={{fontSize: '2rem'}}>...</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            ...
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}