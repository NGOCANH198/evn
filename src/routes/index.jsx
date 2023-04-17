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
import UpdateMeter from "../pages/updateMeter";

const SwitchRoutes = () => {
  const { accountInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  if (accountInfo) {
    const userRoutes = [
      { path: "/", element: <Homepage />, title: "Trang chủ" },
      { path: "/payment", element: <Payment />, title: "Xem hoá đơn" },
      { path: "/changePassword", element: <ChangePassword />, title: "Đổi mật khẩu" },
    ];

    const adminRoutes = [
      { path: "/", element: <Homepage />, title: "Trang chủ" },
      { path: "/customerLookup", element: <CustomerLookup />, title: "Cập nhật số điện" },
      { path: "/updateMeter/:id", element: <UpdateMeter />, title: "Thông tin khách hàng", hidden: true },
      { path: "/changePassword", element: <ChangePassword />, title: "Đổi mật khẩu" },
    ];

    const routes = accountInfo.roles[0] === "ROLE_ADMIN" ? adminRoutes : userRoutes;
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
              {routes
                .filter((route) => !route.hidden)
                .map(({ path, title }) => (
                  <Button key={path} onClick={() => navigate(path)}>{title}</Button>
                ))}
            </Box>
            <Button variant="outlined" onClick={() => dispatch(setAccountInfo(undefined))}>
              Đăng xuất
            </Button>
          </Toolbar>
        </AppBar>
        <Routes>
          {routes.map(({ path, element }) => (
            <Route key={path} exact path={path} element={element} />
          ))}
          {/* <Route exact path="/customerInfo" element={<CustomerInfo />} />
          <Route exact path="/customerLookup" element={<CustomerLookup />} />
          <Route exact path="/changePassword" element={<ChangePassword />} />
          <Route exact path="/" element={<Homepage />} /> */}
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
