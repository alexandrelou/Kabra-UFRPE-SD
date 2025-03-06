import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateAccessToken } from "../store/userSlice";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
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

const Perfil = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.user.accessToken);
  const refreshToken = useSelector((state) => state.user.refreshToken);
  const [userId, setUserId] = React.useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  React.useEffect(() => {
    if (accessToken) {
      const decodedToken = jwtDecode(accessToken);
      const userId = decodedToken.user_id;

      axios
        .get(`http://localhost:8000/api/customUser/${userId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          setUserId(response.data.id);
          setValue("nome", response.data.nome);
          setValue("matricula", response.data.matricula);
          setValue("cargo", response.data.cargo);
          setValue("numeroCelular", response.data.numeroCelular);
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    }
  }, [accessToken, setValue]);

  React.useEffect(() => {
    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          const response = await axios.post(
            "http://localhost:8000/api/token/refresh/",
            {
              refresh: refreshToken,
            }
          );
          dispatch(updateAccessToken({ accessToken: response.data.access }));
          return axios(originalRequest);
        }
        return Promise.reject(error);
      }
    );
  }, [dispatch, refreshToken]);

  const onSubmit = async (data) => {};

  return (
    <Box
      sx={{
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
        Perfil
      </Typography>
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        sx={{ mt: 3 }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">Nome</Typography>
            <StyledTextField
              autoComplete="given-name"
              name="nome"
              required
              fullWidth
              id="nome"
              autoFocus
              defaultValue={register("nome").value}
              {...register("nome", { required: true })}
            />
            {errors.nome && <span>Nome é obrigatório.</span>}
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">N. matricula</Typography>
            <StyledTextField
              required
              fullWidth
              id="matricula"
              name="matricula"
              {...register("matricula", { required: true })}
            />
            {errors.matricula && <span>Matrícula é obrigatória.</span>}
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">Cargo</Typography>
            <StyledTextField
              required
              fullWidth
              id="cargo"
              name="cargo"
              {...register("cargo", { required: true })}
            />
            {errors.cargo && <span>Cargo é obrigatório.</span>}
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">Número de Celular</Typography>
            <StyledTextField
              required
              fullWidth
              id="numeroCelular"
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
      </Box>
    </Box>
  );
};

export default Perfil;
