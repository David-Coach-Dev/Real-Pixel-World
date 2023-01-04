import { useNotification } from "@/context";
import { LoginValidate } from "@/utils";
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
export interface LoginInterface {}
type LogonType = {
  username: string;
  password: string;
};
export const Login: React.FC<LoginInterface> = () => {
  const { getSuccess, getError } = useNotification();
  const [loginData, setLoginData] = useState<LogonType>({
    username: "",
    password: "",
  });
  const dataLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    LoginValidate.validate(loginData)
      .then(() => {
        getSuccess(JSON.stringify(loginData));
      })
      .catch((error) => {
        getError(error.message);
      });
    console.log(loginData);
  };
  return (
    <Container maxWidth="sm">
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: "90vh" }}
      >
        <Grid item>
          <Paper sx={{ padding: "1.2em", borderRadius: "0.5em" }}>
            <Typography variant="h4" sx={{ mt: 1, mb: 1 }}>
              Iniciar sesión.
            </Typography>
            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                margin="normal"
                name="username"
                type="text"
                fullWidth
                label="User :"
                sx={{ mt: 2, mb: 1.5 }}
                onChange={dataLogin}
              />
              <TextField
                margin="normal"
                name="password"
                fullWidth
                type="password"
                label="Password :"
                sx={{ mt: 1.5, mb: 1.5 }}
                onChange={dataLogin}
              />
              <Button
                fullWidth
                type="submit"
                variant="contained"
                sx={{ mt: 1.5, mb: 3 }}
              >
                Iniciar sesión.
              </Button>
            </Box>
          </Paper>
        </Grid>
        <Grid item></Grid>
      </Grid>
    </Container>
  );
};
export default Login;
