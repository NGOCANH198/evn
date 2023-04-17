import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Button, Grid, TextField } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../apis/baseUrl";

export default function UpdateMeter() {
  const [customer, setCustomer] = useState([]);
  const [period, setPeriod] = useState(new Date());
  const [timeRead, setTimeRead] = useState(new Date());
  const [oldNumber, setOldNumber] = useState(0);
  const [newNumber, setNewNumber] = useState(0);
  const { id } = useParams();
  const navigate = useNavigate();
  React.useEffect(() => {
    axios.get(`${baseUrl}/getListCustomersInfo`).then((res) => {
      setCustomer(res.data.find((c) => c.id === id));
    });
  }, []);
  const customerDetails = [
    { fieldName: "Mã khách hàng", value: customer.id },
    { fieldName: "Tên khách hàng", value: customer.name },
    { fieldName: "Địa chỉ", value: customer.address },
  ];
  const onSave = () => {
    const payload = {
      meterCode: customer.meterCode,
      oldNumber,
      newNumber,
      period,
      timeReadMeter: new Date(timeRead).toISOString().substring(0, 10),
      customerCode: id,
    };
    axios
      .post(`${baseUrl}/board/create`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => alert("Thành công"))
      .then(() => navigate("/customerLookup"))
      .catch((e) => alert(e));
  };
  return (
    <Container component="main" maxWidth="lg">
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
            <Grid item xs={4}>
              <Typography gutterBottom lineHeight={2.5} sx={{ fontWeight: 700 }}>
                Kỳ hoá đơn
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography gutterBottom lineHeight={2.5}>
                Tháng{" "}
                <TextField size="small" sx={{ maxWidth: 120 }} placeholder="mm/yyyy" type="month" value={period} onChange={(e) => setPeriod(e.target.value)} />{" "}
                từ ngày <TextField size="small" sx={{ maxWidth: 160 }} placeholder="dd/mm/yyyy" type="date" /> đến ngày{" "}
                <TextField size="small" sx={{ maxWidth: 160 }} placeholder="dd/mm/yyyy" type="date" />
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography gutterBottom lineHeight={2.5} sx={{ fontWeight: 700 }}>
                Thời gian lấy chỉ số điện
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <TextField
                size="small"
                sx={{ maxWidth: 160 }}
                placeholder="dd/mm/yyyy"
                type="date"
                value={timeRead}
                onChange={(e) => setTimeRead(e.target.value)}
              />
            </Grid>
            <Grid item xs={4}>
              <Typography gutterBottom lineHeight={2.5} sx={{ fontWeight: 700 }}>
                Chỉ số điện tháng trước
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography gutterBottom lineHeight={2.5}>
                <TextField size="small" sx={{ maxWidth: 96 }} type="number" value={oldNumber} onChange={(e) => setOldNumber(Number(e.target.value))} /> kWh
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography gutterBottom lineHeight={2.5} sx={{ fontWeight: 700 }}>
                Chỉ số điện tháng này
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography gutterBottom lineHeight={2.5}>
                <TextField size="small" sx={{ maxWidth: 96 }} type="number" value={newNumber} onChange={(e) => setNewNumber(Number(e.target.value))} /> kWh
              </Typography>
            </Grid>
          </Grid>
          <Box sx={{ display: "flex", justifyContent: "space-around", mt: 5 }}>
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
