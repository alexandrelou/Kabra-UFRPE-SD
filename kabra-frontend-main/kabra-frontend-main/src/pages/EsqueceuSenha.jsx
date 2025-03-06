import * as React from "react";
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

export default function ForgotPassword() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
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
        Esqueceu a senha
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography component="h1" variant="h6">
              Digite seu email para recuperar a senha
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <StyledTextField
              required
              fullWidth
              id="email"
              label="Endereço de E-mail"
              name="email"
              autoComplete="email"
            />
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
              Não tem uma conta? Cadastre-se
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
