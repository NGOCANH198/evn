import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAccountInfo } from "../../redux/slices/authSlice";
import { baseUrl } from "../../apis/baseUrl";
import logo from "../../assets/img/logo.jpg";

export default function Login() {
  const dispatch = useDispatch();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data);
    axios
      .post(`${baseUrl}/signin`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        dispatch(setAccountInfo(res.data));
      })
      .catch((e) => alert("Tài khoản hoặc mật khẩu không đúng!"));
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box>
          <img src={logo} height={96} />
        </Box>
        <Typography component="h1" variant="h5">
          Đăng nhập
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField margin="normal" required fullWidth id="username" label="Tên đăng nhập" name="username" autoFocus />
          <TextField margin="normal" required fullWidth name="password" label="Mật khẩu" type="password" id="password" />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Đăng nhập
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
