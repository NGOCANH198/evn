import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Button, Grid } from "@mui/material";

const customerDetails = [
  { fieldName: "Mã khách hàng", value: "HNHD01" },
  { fieldName: "Tên khách hàng" },
  { fieldName: "Địa chỉ", value: "Trần Phú - Mộ Lao - Hà Đông - Hà Nội" },
  { fieldName: "Ngày sinh", value: "dd/mm/yyyy" },
  { fieldName: "Số điện thoại", value: "0123456789" },
  { fieldName: "Email", value: "email@gmail.com" },
];

export default function CustomerInfo() {
  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Thông tin khách hàng
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Grid container>
            {customerDetails.map((detail) => (
              <React.Fragment key={detail.fieldName}>
                <Grid item xs={4}>
                  <Typography gutterBottom sx={{ fontWeight: 700 }}>
                    {detail.fieldName}
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography gutterBottom>{detail.value}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 5 }}>
            <Button variant="outlined">Huỷ</Button>
            <Button variant="contained">Xác nhận</Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
