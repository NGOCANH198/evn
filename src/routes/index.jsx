import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from "../pages/login";
import Payment from "../pages/payment";
import CustomerInfo from "../pages/customerInfo";
import CustomerLookup from "../pages/customerLookup";
import { useDispatch, useSelector } from "react-redux";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { setAccountInfo } from "../redux/slices/authSlice";
import { Box, Button } from "@mui/material";
import Homepage from "../pages/homepage";
import ChangePassword from "../pages/changePassword";

const SwitchRoutes = () => {
  const { accountInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  if (accountInfo) {
    return (
      <>
        <CssBaseline />
        <AppBar
          position="sticky"
          color="default"
          elevation={0}
          sx={{
            // position: "relative",
            borderBottom: (t) => `1px solid ${t.palette.divider}`,
          }}
        >
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
              {accountInfo.username}
            </Typography>
            <Box display="flex" flex="1 0 auto" flexDirection="row" alignItems="center" justifyContent="space-evenly">
              <Button onClick={() => navigate("/")}>Trang chủ</Button>
              <Button onClick={() => navigate("/payment")}>Xem hoá đơn</Button>
              <Button onClick={() => navigate("/changePassword")}>Đổi mật khẩu</Button>
            </Box>
            <Button variant="outlined" onClick={() => dispatch(setAccountInfo(undefined))}>
              Đăng xuất
            </Button>
          </Toolbar>
        </AppBar>
        <Routes>
          <Route exact path="/payment" element={<Payment />} />
          <Route exact path="/customerInfo" element={<CustomerInfo />} />
          <Route exact path="/customerLookup" element={<CustomerLookup />} />
          <Route exact path="/changePassword" element={<ChangePassword />} />
          <Route exact path="/" element={<Homepage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </>
    );
  }
  return (
    <Routes>
      <Route exact path="/login" element={<Login />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default SwitchRoutes;
