import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

export default function Cartao({ imagem, texto, onClick }) {
  return (
    <Card className="max-w-md mx-auto rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <CardActionArea className="md:flex" onClick={onClick}>
        <div className="md:shrink-0">
          {imagem && (
            <CardMedia
              component="img"
              className="h-48 w-full object-cover md:h-72 md:w-48"
              image={imagem}
              alt={texto}
            />
          )}
        </div>
        <div className="m-2 text-center justify-center">
          {texto && (
            <Typography gutterBottom variant="h5" component="div">
              {texto}
            </Typography>
          )}
        </div>
      </CardActionArea>
    </Card>
  );
}
