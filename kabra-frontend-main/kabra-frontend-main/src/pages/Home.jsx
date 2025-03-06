import React from "react";
import { useNavigate } from "react-router-dom";
import Cartao from "../components/Card";
import Typography from "@mui/material/Typography";

const processos = ["Afastamento Integral de Curta Duração"];

export default function Home() {
  const navigate = useNavigate();

  const handleCardClick = (processo) => {
    const processoSemEspaco = processo.replace(/ /g, "_");
    navigate(`/processo/${processoSemEspaco}`);
  };

  return (
    <div className="flex flex-col grow space-y-4 h-full w-full justify-center items-center">
      <Typography
        gutterBottom
        variant="h4"
        component="div"
        sx={{ textAlign: "center" }}
      >
        Selecione seu processo
      </Typography>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {processos.map((processo) => (
          <Cartao
            key={processo}
            texto={processo}
            onClick={() => handleCardClick(processo)}
          />
        ))}
      </div>
    </div>
  );
}
