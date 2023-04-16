import { Box, Container, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

const Homepage = () => {
  const { accountInfo } = useSelector((state) => state.auth);
  return (
    <Container component="main" maxWidth="md">
      <Box sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        <Typography component="h1" variant="h4" align="center">
          Công ty điện lực quận Hà Đông
        </Typography>
        <Typography component="h2" variant="h5" align="center">
          Xin chào, {accountInfo.username}!
        </Typography>
      </Box>
    </Container>
  );
};

export default Homepage;
