import { Box, Button, Container, DialogActions, DialogContent, Typography } from "@mui/material";
import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import { baseUrl } from "../../apis/baseUrl";
import BootstrapDialog, { BootstrapDialogTitle } from "../../components/Dialog";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const [meterInfo, setMeterInfo] = React.useState();
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const navigate = useNavigate();

  const handleClickOpen = () => {
    setDialogOpen(true);
  };
  const handleClose = () => {
    setDialogOpen(false);
  };
  const { username, status } = useSelector((state) => state.auth.accountInfo);
  React.useEffect(() => {
    axios.get(`${baseUrl}/invoice/getAllByUsername`, { params: { username } }).then((res) => {
      const data = res.data.pop();
      setMeterInfo(data);
      if (status === "INACTIVE") {
        handleClickOpen();
      } 
    });
  }, []);
  return (
    <Container component="main" maxWidth="md">
      <Box sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        <Typography component="h1" variant="h4" align="center">
          Công ty điện lực quận Hà Đông
        </Typography>
        <Typography component="h2" variant="h5" align="center">
          Xin chào, {username}!
        </Typography>
      </Box>
      <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={dialogOpen}>
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Thông báo
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            Bạn có 1 hoá đơn hết hạn vào ngày {meterInfo?.lastTimePay}. Vui lòng đến chi nhánh gần nhất để đóng tiền.
          </Typography>
          
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => navigate("/payment")}>
            Xem hoá đơn
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </Container>
  );
};

export default Homepage;
