import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import axios from "axios";
import { useSelector } from "react-redux";
import { baseUrl } from "../../apis/baseUrl";
import logo from "../../assets/img/logo.jpg";

export default function ChangePassword() {
  const { username } = useSelector((state) => state.auth.accountInfo);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const oldPassword = data.get("oldPassword");
    const newPassword = data.get("newPassword");

    axios
      .put(`${baseUrl}/changepassword/${username}`, undefined, {
        params: { oldpassword: oldPassword, newpassword: newPassword },
      })
      .then((res) => alert(res.data));
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
          Đổi mật khẩu
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField required type="password" fullWidth id="oldPassword" label="Mật khẩu cũ" name="oldPassword" />
            </Grid>
            <Grid item xs={12}>
              <TextField required type="password" fullWidth name="newPassword" label="Mật khẩu mới" id="newPassword" />
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Đổi mật khẩu
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
