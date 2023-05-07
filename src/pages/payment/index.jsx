import * as React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import { useSelector } from "react-redux";
import { baseUrl } from "../../apis/baseUrl";
import { useNavigate } from "react-router-dom";

const formula = [
  {
    breakpoint: 50,
    unitPrice: 1728,
  },
  {
    breakpoint: 100,
    unitPrice: 1786,
  },
  {
    breakpoint: 200,
    unitPrice: 2074,
  },
  {
    breakpoint: 300,
    unitPrice: 2612,
  },
  {
    breakpoint: 400,
    unitPrice: 2919,
  },
  {
    breakpoint: Infinity,
    unitPrice: 3015,
  },
];

export default function Payment() {
  const [meterInfo, setMeterInfo] = React.useState();
  const [disabled, setDisabled] = React.useState(false);
  const { username } = useSelector((state) => state.auth.accountInfo);
  const navigate = useNavigate();
  React.useEffect(() => {
    axios.get(`${baseUrl}/invoice/getAllByUsername`, { params: { username } }).then((res) => {
      const data = res.data.pop();
      setMeterInfo(data);
      const [dd, mm, yyyy] = data.lastTimePay.split("-");
      const lastTimePay = new Date(`${yyyy}-${mm}-${dd}`);
      setDisabled(data.status !== "UNPAID" && lastTimePay < new Date());
      if (data.status =="PAID"){alert("Bạn đã hoản thành thanh toán hoá đơn tiền điện kì này");
  return ;}
    });

  }, []);

  

  const priceBoard = React.useMemo(() => {
    if (!meterInfo) return [];
    let res = [],
      accumulate = 0;
    const { electricNumber: totalNumber } = meterInfo;
    for (const point of formula) {
      if (accumulate >= totalNumber) break;
      if (totalNumber >= point.breakpoint) {
        res.push({ unitPrice: point.unitPrice, amount: point.breakpoint - accumulate });
        accumulate = point.breakpoint;
      } else {
        res.push({ unitPrice: point.unitPrice, amount: totalNumber - accumulate });
        break;
      }
    }
    return res;
  }, [meterInfo]);
  const customerDetails = [
    { fieldName: "Mã khách hàng", value: username },
    { fieldName: "Tên khách hàng", value: meterInfo?.customerName },
    { fieldName: "Địa chỉ", value: meterInfo?.address },
    // { fieldName: "Kì hoá đơn", value: "Từ ngày dd/mm/yyyy đến ngày dd/mm/yyyy" },
    { fieldName: "Hạn thanh toán", value: meterInfo?.lastTimePay },

  ];
  const getPaymentDetails = () => {
    const tax = 0.1,
      pretaxPrice = Math.round(meterInfo?.totalPayment / (1 + tax));
    return [
      { name: "Tổng điện năng tiêu thụ (kWh)", value: meterInfo?.electricNumber },
      { name: "Tiền điện chưa tính thuế (đồng)", value: pretaxPrice },
      { name: "Thuế suất GTGT", value: `${tax * 100}%` },
      { name: "Thuế GTGT (đồng)", value: (meterInfo?.totalPayment - pretaxPrice).toFixed(0) },
      { name: "Tổng tiền điện thanh toán (đồng)", value: meterInfo?.totalPayment },
    ];
  };
  const pay = (withCash) => {
    if (withCash) {
      axios.post(`${baseUrl}/payWithCash`, undefined, { params: { id: meterInfo?.id } }).then((res) => {
        alert(res.data);
      });
    } else {
      axios.post(`${baseUrl}/pay`, undefined, { params: { id: meterInfo?.id } }).then((res) => {
        window.open(res.data, "_blank", "noreferrer");
      });
    }
  };
  return (
    <>
      <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Thanh toán tiền điện sinh hoạt của hộ cá nhân
          </Typography>
          <Grid container spacing={2}>
            <Grid item container direction="column" xs={12}>
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Thông tin khách hàng
              </Typography>
              <Grid container>
                {customerDetails.map((detail) => {
                  if (!detail.value) return <React.Fragment key={detail.fieldName}></React.Fragment>;
                  return (
                    <React.Fragment key={detail.fieldName}>
                      <Grid item xs={6}>
                        <Typography gutterBottom sx={{ fontWeight: 700 }}>
                          {detail.fieldName}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography gutterBottom>{detail.value}</Typography>
                      </Grid>
                    </React.Fragment>
                  );
                })}
              </Grid>
            </Grid>
          </Grid>
          <hr />
          <Typography variant="h6" gutterBottom>
            Bảng giá điện
          </Typography>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell align="right">Đơn giá (đồng/kWh)</TableCell>
                <TableCell align="right">Sản lượng (kWh)</TableCell>
                <TableCell align="right">Thành tiền (đồng)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {priceBoard.map((product, index) => (
                <TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {`Bậc ${index + 1}`}
                  </TableCell>
                  <TableCell align="right">{product.unitPrice}</TableCell>
                  <TableCell align="right">{product.amount}</TableCell>
                  <TableCell align="right">{product.unitPrice * product.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <List disablePadding>
            {getPaymentDetails().map(({ name, value }, index) => (
              <ListItem key={name} sx={{ py: 1, px: 0 }}>
                <ListItemText primary={name} />
                <Typography
                  variant={index < getPaymentDetails().length - 1 ? "body2" : "subtitle1"}
                  sx={index < getPaymentDetails().length - 1 ? undefined : { fontWeight: 700 }}
                >
                  {value}
                </Typography>
              </ListItem>
            ))}
          </List>

          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button variant="outlined" sx={{ mt: 3, ml: 1 }} onClick={() => navigate("/")}>
              Quay lại
            </Button>
            <Button variant="contained" disabled={disabled} sx={{ mt: 3, ml: 1 }} onClick={() => pay(false)}>
              Thanh toán PayPal
            </Button>
            <Button variant="contained" disabled={disabled} sx={{ mt: 3, ml: 1 }} onClick={() => pay(true)}>
              Thanh toán tiền mặt
            </Button>
          </Box>
        </Paper>
      </Container>
    </>
  );
}
