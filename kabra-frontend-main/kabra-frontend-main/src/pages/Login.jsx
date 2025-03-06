import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../store/userSlice";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
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

export default function SignIn() {
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
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
        Login
      </Typography>
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        sx={{ mt: 1 }}
      >
        <StyledTextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Endereço de E-mail"
          name="email"
          autoComplete="email"
          autoFocus
          variant="outlined"
          {...register("email", { required: true })}
        />
        {errors.email && <span>Email é obrigatório.</span>}
        <StyledTextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Senha"
          type="password"
          id="password"
          autoComplete="current-password"
          {...register("password", { required: true })}
        />
        {errors.password && <span>Senha é obrigatória.</span>}
        <div>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Lembrar de mim"
          />
        </div>
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
        <Grid container>
          <Grid item xs>
            <Link
              href="esqueceusenha"
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
              Esqueci a senha
            </Link>
          </Grid>
          <Grid item>
            <Link
              href="registrar"
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
              Cadastre-se
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
