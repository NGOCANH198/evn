import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Button, Grid, TextField } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../apis/baseUrl";
import { useSelector } from "react-redux";

export default function UpdateMeter() {
  const [customer, setCustomer] = useState();
  // const [period, setPeriod] = useState(new Date());
  // const [timeRead, setTimeRead] = useState(new Date());
  // const [oldNumber, setOldNumber] = useState(0);
  const [newNumber, setNewNumber] = useState(0);
  const { id } = useParams();
  const navigate = useNavigate();
  const { customers: customerList } = useSelector((state) => state.customer);
  React.useEffect(() => {
    const currentCustomer = customerList.find((c) => c.id === Number(id));
    if (!currentCustomer) navigate("/customerLookup");
    setCustomer(currentCustomer);
  }, [customerList]);
  React.useEffect(() => {
    if (!customer?.newNumber) return;
    setNewNumber(customer.newNumber);
  }, [customer]);
  const customerDetails = !customer
    ? []
    : [
        { fieldName: "Mã khách hàng", value: customer.username },
        { fieldName: "Tên khách hàng", value: customer.customerName },
        { fieldName: "Địa chỉ", value: customer.address },
        { fieldName: "Kì hoá đơn", value: customer.period },
        { fieldName: "Thời gian lấy chỉ số điện", value: customer.timeReadMeter },
        { fieldName: "Thời gian cập nhật", value: customer.timeUpdate },
        { fieldName: "Chỉ số điện tháng trước", value: customer.oldNumber },
        // { fieldName: "Chỉ số điện tháng này", value: customer.newNumber },
      ];
  const onSave = () => {
    if (!customer) return;
    const { newNumber } = customer;
    const payload = {
      newNumber,
    };
    axios
      .post(`${baseUrl}/board/update/${id}`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => alert("Thành công"))
      .then(() => navigate("/customerLookup"))
      .catch((e) => alert(e));
  };
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
          Cập nhật số điện
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Grid container>
            {customerDetails.map((detail) =>
              detail.value ? (
                <React.Fragment key={detail.fieldName}>
                  <Grid item xs={7}>
                    <Typography gutterBottom sx={{ fontWeight: 700, marginLeft: 0 }}>
                      {detail.fieldName}
                    </Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Typography gutterBottom>{detail.value}</Typography>
                  </Grid>
                </React.Fragment>
              ) : (
                <></>
              )
            )}
            <Grid item xs={7}>
              <Typography gutterBottom lineHeight={2.5} sx={{ fontWeight: 700, marginLeft: 0 }}>
                Chỉ số điện tháng này
              </Typography>
            </Grid>
            <Grid item xs={5}>
              <Typography gutterBottom lineHeight={2.5}>
                <TextField size="small" sx={{ maxWidth: 96 }} type="number" value={newNumber} onChange={(e) => setNewNumber(Number(e.target.value))} /> kWh
              </Typography>
            </Grid>
          </Grid>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 5, gap: 5 }}>
            <Button variant="outlined" onClick={() => navigate("/customerLookup")}>
              Huỷ
            </Button>
            <Button variant="contained" onClick={onSave}>
              Lưu
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
