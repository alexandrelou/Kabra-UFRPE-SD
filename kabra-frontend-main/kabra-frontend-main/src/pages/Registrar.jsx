import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../store/userSlice";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";

const StyledTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderRadius: "20px",
    },
    "&:hover fieldset": {
      borderColor: "transparent",
    },
    "&.Mui-focused fieldset": {
      borderColor: "transparent",
    },
  },
  "& .MuiOutlinedInput-input": {
    backgroundColor: "#D2D2D2",
    border: "1px solid #D2D2D21A",
    borderRadius: "20px",
  },
});

export default function SignUp() {
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const jsonData = {
        email: data.email,
        nome: data.nome,
        matricula: parseInt(data.matricula),
        cargo: data.cargo,
        num_celular: parseInt(data.numeroCelular),
        password: data.password,
      };
      console.log(jsonData);
      const response = await axios.post(
        "http://localhost:8000/api/customUser/",
        jsonData
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
      try {
        const jsonData = {
          email: data.email,
          password: data.password,
        };
        const response = await axios.post(
          "http://localhost:8000/api/token/",
          jsonData
        );

        if (response.data && response.data.access && response.data.refresh) {
          console.log("Login successful", response.data);
          dispatch(
            login({
              accessToken: response.data.access,
              refreshToken: response.data.refresh,
            })
          );
          navigate("/");
        } else {
          throw new Error("Token de acesso não recebido");
        }
      } catch (error) {
        console.error("Login failed", error.message);
        alert("Login failed. Please check your credentials.");
      }
    }
  };

  return (
    <Box
      sx={{
        my: 8,
        mx: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        component="h1"
        variant="h5"
        style={{
          fontFamily: "'Moul', sans-serif",
          fontSize: "45px",
          fontWeight: 400,
          lineHeight: "81px",
          letterSpacing: "0em",
          textAlign: "center",
          color: "#AC79FC",
        }}
      >
        Cadastrar
      </Typography>
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        sx={{ mt: 3 }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <StyledTextField
              required
              fullWidth
              id="email"
              label="Endereço de E-mail"
              name="email"
              autoComplete="email"
              {...register("email", { required: true })}
            />
            {errors.email && <span>Email é obrigatório.</span>}
          </Grid>
          <Grid item xs={12}>
            <StyledTextField
              required
              fullWidth
              name="password"
              label="Senha"
              type="password"
              id="password"
              autoComplete="new-password"
              {...register("password", { required: true })}
            />
            {errors.password && <span>Senha é obrigatória.</span>}
          </Grid>
          <Grid item xs={12} sm={6}>
            <StyledTextField
              autoComplete="given-name"
              name="nome"
              required
              fullWidth
              id="nome"
              label="Nome"
              autoFocus
              {...register("nome", { required: true })}
            />
            {errors.nome && <span>Nome é obrigatório.</span>}
          </Grid>
          <Grid item xs={12} sm={6}>
            <StyledTextField
              required
              fullWidth
              id="matricula"
              label="N. matricula"
              name="matricula"
              {...register("matricula", { required: true })}
            />
            {errors.matricula && <span>Matrícula é obrigatória.</span>}
          </Grid>
          <Grid item xs={12}>
            <StyledTextField
              required
              fullWidth
              id="cargo"
              label="Cargo"
              name="cargo"
              {...register("cargo", { required: true })}
            />
            {errors.cargo && <span>Cargo é obrigatório.</span>}
          </Grid>
          <Grid item xs={12}>
            <StyledTextField
              required
              fullWidth
              id="numeroCelular"
              label="Número de Celular"
              name="numeroCelular"
              {...register("numeroCelular", { required: true })}
            />
            {errors.numeroCelular && (
              <span>Número de celular é obrigatório.</span>
            )}
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          style={{
            backgroundColor: "#AB79FC",
            fontFamily: "Moul",
            fontSize: "20px",
            fontWeight: "400",
            lineHeight: "20px",
            letterSpacing: "0em",
            textAlign: "center",
            color: "white",
            borderRadius: "20px",
            border: "1px solid",
          }}
        >
          Continuar
        </Button>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link
              href="login"
              variant="body2"
              style={{
                fontFamily: "Monda",
                fontSize: "15px",
                fontWeight: 400,
                lineHeight: "24px",
                letterSpacing: "0em",
                textAlign: "left",
                color: "#832CD4",
              }}
            >
              Já tem uma conta? Faça login
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
